import test from "node:test";
import assert from "node:assert/strict";
import {
  ECOSYSTEM_PRACTITIONERS,
  HANZO_NETWORK_CHAIN_ID,
  HIRE_SENSEI_MCP_TOOL,
  SENSEI_MIN_LEVEL,
  SenseiGateError,
  filterVerifiedSenseis,
  isVerifiedL3PlusSensei,
  validateHireSenseiRequest,
} from "../src/services/senseiProtocol.ts";

const VALID_ATTEMPT = "0x4f91a2c80e7b3d1652a09c44e8b71f3390d2c5a1847e6b2039f1c8d4e5a6b701";

test("L3+ gate filters out L1 and L2 practitioners and keeps only verified L3-L9 Senseis on chain 36963", () => {
  const gated = filterVerifiedSenseis(ECOSYSTEM_PRACTITIONERS);
  assert.ok(gated.length >= 7, "Expected all L3-L9 practitioners to pass");
  for (const sensei of gated) {
    assert.ok(sensei.level >= SENSEI_MIN_LEVEL, `Expected level >= 3, got ${sensei.level}`);
    assert.equal(sensei.attestation.chainId, HANZO_NETWORK_CHAIN_ID);
    assert.equal(sensei.attestation.revoked, false);
  }
  const levels = new Set(gated.map((s) => s.level));
  assert.equal(levels.has(1), false);
  assert.equal(levels.has(2), false);
  for (const lvl of [3, 4, 5, 6, 7, 8, 9] as const) {
    assert.equal(levels.has(lvl), true, `Expected L${lvl} Sensei in verified roster`);
  }
});

test("filterVerifiedSenseis rejects minLevel < 3 with sensei_level_below_gate", () => {
  for (const invalid of [0, 1, 2, -1, 10]) {
    assert.throws(
      () => filterVerifiedSenseis(ECOSYSTEM_PRACTITIONERS, { minLevel: invalid }),
      (err: unknown) =>
        err instanceof SenseiGateError && err.code === "sensei_level_below_gate" && err.status === 422
    );
  }
});

test("isVerifiedL3PlusSensei rejects revoked or wrong-chain credentials", () => {
  const base = ECOSYSTEM_PRACTITIONERS[0];
  assert.equal(isVerifiedL3PlusSensei(base), true);
  assert.equal(
    isVerifiedL3PlusSensei({
      ...base,
      attestation: { ...base.attestation, revoked: true },
    }),
    false
  );
  assert.equal(
    isVerifiedL3PlusSensei({
      ...base,
      attestation: { ...base.attestation, chainId: 1 },
    }),
    false
  );
});

test("validateHireSenseiRequest enforces L3+ gate and idempotent attempt token for Agent-Hires-Human", () => {
  const valid = validateHireSenseiRequest({
    attempt: VALID_ATTEMPT,
    minLevel: 5,
    domain: "confidential-compute",
    title: "Audit SEV-SNP KMS key-release policy before production cutover",
    acceptanceCriteria: ["Verify PCR/RTMR policy rejects unsigned initramfs digests"],
    maxBudgetUsdc: "600.00",
    deadlineSeconds: 86400,
    escalationReason: {
      kaiConfidence: 0.61,
      threshold: 0.9,
      trigger: "security_boundary_signoff",
    },
  });
  assert.equal(valid.minLevel, 5);

  assert.throws(
    () =>
      validateHireSenseiRequest({
        attempt: VALID_ATTEMPT,
        minLevel: 2,
        domain: "engineering",
        title: "Attempt to hire below L3 gate",
        acceptanceCriteria: ["npm test"],
        maxBudgetUsdc: "100.00",
      }),
    (err: unknown) => err instanceof SenseiGateError && err.code === "sensei_level_below_gate"
  );
});

test("HIRE_SENSEI_MCP_TOOL schema locks minLevel minimum to 3 and maximum to 9", () => {
  assert.equal(HIRE_SENSEI_MCP_TOOL.name, "hire_sensei");
  assert.equal(HIRE_SENSEI_MCP_TOOL.inputSchema.properties.minLevel.minimum, 3);
  assert.equal(HIRE_SENSEI_MCP_TOOL.inputSchema.properties.minLevel.maximum, 9);
});


test("Journeys #98-#100: onboarding handoff, L1-L9 unlock states, and bounty eligibility gate", async () => {
  const mod = await import("../src/services/senseiProtocol.ts");
  assert.equal(mod.HANZO_SH_TO_UNIVERSITY_FLOW.length, 3);
  assert.equal(mod.HANZO_SH_TO_UNIVERSITY_FLOW[0].surface, "hanzo.sh");
  assert.equal(mod.HANZO_SH_TO_UNIVERSITY_FLOW[1].surface, "hanzo.university");

  const l2 = mod.LEARNER_PROGRESS_PROFILES.find((p) => p.id === "learner-l2");
  const l3 = mod.LEARNER_PROGRESS_PROFILES.find((p) => p.id === "learner-l3");
  assert.ok(l2 && l3);

  const l3Bounty = mod.OPEN_SENSEI_BOUNTIES[0]; // minLevel 3
  const l5Bounty = mod.OPEN_SENSEI_BOUNTIES[1]; // minLevel 5

  // L2 blocked by L3 gate with clear next action to hanzo.university/l3
  const resL2 = mod.evaluateBountyEligibility(2, l3Bounty, true);
  assert.equal(resL2.eligible, false);
  assert.ok(resL2.nextActionHref.includes("/docs/university/l3"));

  // L3 eligible for L3 bounty, blocked on L5 bounty with clear L5 exam handoff
  const resL3Pass = mod.evaluateBountyEligibility(3, l3Bounty, true);
  assert.equal(resL3Pass.eligible, true);

  const resL3Under = mod.evaluateBountyEligibility(3, l5Bounty, true);
  assert.equal(resL3Under.eligible, false);
  assert.ok(resL3Under.nextActionHref.includes("/docs/university/l5"));

  // Uncleared seller routed to hanzo.market/sell
  const resUncleared = mod.evaluateBountyEligibility(5, l5Bounty, false);
  assert.equal(resUncleared.eligible, false);
  assert.equal(resUncleared.nextActionHref, "https://hanzo.market/sell");
});
