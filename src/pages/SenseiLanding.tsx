import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Bot,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Lock,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";
import { Button } from "@hanzo/ui";
import {
  AllCurriculumLevel,
  BountyLifecycleStage,
  CertifiedSenseiLevel,
  ECOSYSTEM_PRACTITIONERS,
  HANZO_NETWORK_CAIP2,
  HANZO_NETWORK_CHAIN_ID,
  HANZO_SH_TO_UNIVERSITY_FLOW,
  HIRE_SENSEI_MCP_TOOL,
  LEARNER_PROGRESS_PROFILES,
  LEVEL_METADATA,
  OPEN_SENSEI_BOUNTIES,
  SENSEI_MIN_LEVEL,
  SenseiDomain,
  evaluateBountyEligibility,
  filterVerifiedSenseis,
  validateHireSenseiRequest,
} from "../services/senseiProtocol";

const DOMAIN_FILTERS: Array<{ id: SenseiDomain | "all"; label: string }> = [
  { id: "all", label: "All Domains" },
  { id: "ai-ml", label: "AI / ML & Zen" },
  { id: "distributed-systems", label: "Distributed & ZAP" },
  { id: "confidential-compute", label: "Sovereign & TEE" },
  { id: "architecture", label: "Swarm & Architecture" },
  { id: "engineering", label: "Full-Stack Engineering" },
  { id: "security", label: "Security & PQ-PKI" },
];

const CERTIFIED_LEVELS: CertifiedSenseiLevel[] = [3, 4, 5, 6, 7, 8, 9];
const ALL_LEVELS: AllCurriculumLevel[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const BOUNTY_STAGES: Array<{
  id: BountyLifecycleStage;
  step: string;
  escrowState: string;
  summary: string;
  nextAction: string;
}> = [
  {
    id: "discover",
    step: "1. Discover",
    escrowState: "status: open",
    summary: "Browse open enterprise bounties and autonomous hire_sensei escalations filtered by L3–L9 badge and domain.",
    nextAction: "Select a bounty card below to run deterministic L3+ & principal eligibility preflight.",
  },
  {
    id: "eligibility",
    step: "2. Eligibility",
    escrowState: "gate: minLevel >= 3 · principal",
    summary: "Verifies Chain 36963 Sensei VC >= bounty minLevel, org KYC + W-9/W-8 tax clearance, and Hanzo L1 payout wallet.",
    nextAction: "If eligible, proceed to Claim; otherwise follow direct handoff to hanzo.university or hanzo.market/sell.",
  },
  {
    id: "apply",
    step: "3. Apply / Claim",
    escrowState: "status: quoted -> accepted",
    summary: "Lock assignment with a 32-byte idempotent attempt nonce while buyer/agent USDC or AI funds lock in escrow.",
    nextAction: "Pull reproducible contextUri repository/workspace and execute implementation.",
  },
  {
    id: "submit",
    step: "4. Submit",
    escrowState: "status: delivered",
    summary: "Push signed PR/commit and reproducible verification log satisfying every falsifiable acceptance check.",
    nextAction: "Automated CI + Kai rubric verifier (or buyer principal) audits the deliverable.",
  },
  {
    id: "outcome",
    step: "5. Track Outcome",
    escrowState: "status: released",
    summary: "Escrow settles directly to your did:hanzo: wallet on Chain 36963 and increments your verified Sensei record.",
    nextAction: "Inspect payout ledger & 1099 receipts at hanzo.market/sell/earnings.",
  },
];

const monoTabClass = (active: boolean) => (active ? "tab-button mono-tab-active hz-mono" : "tab-button hz-mono");
const sansTabClass = (active: boolean) => (active ? "tab-button mono-tab-active" : "tab-button");

const SenseiLanding: React.FC = () => {
  const [minLevel, setMinLevel] = useState<CertifiedSenseiLevel>(SENSEI_MIN_LEVEL);
  const [selectedDomain, setSelectedDomain] = useState<SenseiDomain | "all">("all");
  const [protocolTab, setProtocolTab] = useState<"mcp" | "http" | "schema">("mcp");
  const [selectedLearnerId, setSelectedLearnerId] = useState<string>("learner-l3");
  const [selectedBountyId, setSelectedBountyId] = useState<string>("bnty-301");
  const [activeBountyStage, setActiveBountyStage] = useState<BountyLifecycleStage>("eligibility");
  const [sellerCleared, setSellerCleared] = useState<boolean>(true);

  const verifiedSenseis = useMemo(
    () => filterVerifiedSenseis(ECOSYSTEM_PRACTITIONERS, { minLevel, domain: selectedDomain }),
    [minLevel, selectedDomain]
  );

  const gatedOutCount = useMemo(
    () => ECOSYSTEM_PRACTITIONERS.filter((c) => c.level < SENSEI_MIN_LEVEL).length,
    []
  );

  const activeLearner = useMemo(
    () => LEARNER_PROGRESS_PROFILES.find((p) => p.id === selectedLearnerId) ?? LEARNER_PROGRESS_PROFILES[1],
    [selectedLearnerId]
  );

  const highestLearnerLevel = useMemo(
    () => (Math.max(...activeLearner.completedLevels) as AllCurriculumLevel),
    [activeLearner]
  );

  const selectedBounty = useMemo(
    () => OPEN_SENSEI_BOUNTIES.find((b) => b.id === selectedBountyId) ?? OPEN_SENSEI_BOUNTIES[0],
    [selectedBountyId]
  );

  const eligibility = useMemo(
    () => evaluateBountyEligibility(highestLearnerLevel, selectedBounty, sellerCleared),
    [highestLearnerLevel, selectedBounty, sellerCleared]
  );

  const activeStageDetail = useMemo(
    () => BOUNTY_STAGES.find((s) => s.id === activeBountyStage) ?? BOUNTY_STAGES[1],
    [activeBountyStage]
  );

  const sampleHirePayload = useMemo(() => {
    return validateHireSenseiRequest({
      attempt: "0x4f91a2c80e7b3d1652a09c44e8b71f3390d2c5a1847e6b2039f1c8d4e5a6b701",
      minLevel,
      domain: selectedDomain === "all" ? "confidential-compute" : selectedDomain,
      title: `Escalate production architecture & verification review (L${minLevel}+ required)`,
      contextUri: "https://git.hanzo.ai/acme/sovereign-stack/pulls/108",
      acceptanceCriteria: [
        "Pass deterministic verification suite with zero regressions",
        "Sign principal attestation receipt on Hanzo Network (eip155:36963)",
      ],
      maxBudgetUsdc: String(minLevel * 120) + ".00",
      deadlineSeconds: 86400,
      escalationReason: {
        kaiConfidence: 0.62,
        threshold: 0.9,
        trigger: "security_boundary_signoff",
      },
    });
  }, [minLevel, selectedDomain]);

  const codeBlockText = useMemo(() => {
    if (protocolTab === "mcp") {
      return JSON.stringify(
        {
          jsonrpc: "2.0",
          id: 1,
          method: "tools/call",
          params: {
            name: "hire_sensei",
            arguments: {
              minLevel: sampleHirePayload.minLevel,
              domain: sampleHirePayload.domain,
              title: sampleHirePayload.title,
              contextUri: sampleHirePayload.contextUri,
              acceptanceCriteria: sampleHirePayload.acceptanceCriteria,
              maxBudgetUsdc: sampleHirePayload.maxBudgetUsdc,
              escalationReason: sampleHirePayload.escalationReason,
            },
          },
        },
        null,
        2
      );
    }
    if (protocolTab === "http") {
      return [
        "curl -X POST https://api.hanzo.ai/v1/sensei/hire \\",
        '  -H "Authorization: Bearer $HANZO_API_KEY" \\',
        '  -H "Content-Type: application/json" \\',
        `  -d '${JSON.stringify(sampleHirePayload, null, 2)}'`,
      ].join("\n");
    }
    return JSON.stringify(HIRE_SENSEI_MCP_TOOL, null, 2);
  }, [protocolTab, sampleHirePayload]);

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      {/* Hero — Curated L3+ Certified Human Lens on hanzo.market */}
      <section className="hz-rel hz-min-h-screen hz-row hz-ai-center hz-jc-center hz-clip hz-py-7">
        <div className="hz-abs hz-inset" />
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg" />

        <div className="hz-rel hz-z-raised hz-container hz-mx-auto hz-px-5 hz-align-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hz-row hz-jc-center hz-gap-2 hz-mb-5">
              <span className="hz-pill">
                <ShieldCheck className="hz-sq-2" />
                L3–L9 Certified Human Lens on hanzo.market
              </span>
              <span className="hz-pill hz-mono">
                <Lock className="hz-sq-2" />
                {HANZO_NETWORK_CAIP2} · HIP-1349
              </span>
            </div>

            <h1 className="hz-t-5xl hz-w-bold hz-mb-5 hz-chrome">
              Verified L3–L9 Senseis.
              <br />
              Hired by Teams &amp; AI Agents.
            </h1>

            <p className="hz-container-narrow hz-mw-xl hz-t-xl hz-fg-muted hz-mb-6 hz-leading-relaxed">
              Sensei Group is the cryptographically gated human specialist lens on{" "}
              <strong className="hz-fg">hanzo.market</strong>. Every practitioner holds an on-chain{" "}
              <strong className="hz-fg">L3–L9 Sensei Credential</strong> on Hanzo Network (Chain ID{" "}
              <span className="hz-mono">{HANZO_NETWORK_CHAIN_ID}</span>) — callable on demand by enterprise leaders
              and autonomous AI swarms via <span className="hz-mono">hire_sensei</span>.
            </p>

            <div className="hz-col-row hz-gap-4 hz-jc-center hz-mb-7">
              <a href="#verified-roster" className="hz-btn hz-btn-primary hz-px-6">
                Browse L3–L9 Roster
                <ArrowRight className="hz-sq-2" />
              </a>
              <a href="#certification-progress" className="hz-btn hz-px-6">
                <Award className="hz-sq-2" />
                L1–L9 Progress &amp; Unlocks
              </a>
              <a href="#bounty-journey" className="hz-btn hz-px-6">
                <Bot className="hz-sq-2" />
                Bounty &amp; Agent Escrow
              </a>
            </div>

            {/* Key Invariants */}
            <div className="hz-grid hz-grid-4 hz-container-wide hz-gap-4">
              <div className="hz-card hz-card-tight hz-align-left">
                <div className="hz-eyebrow hz-mb-1">Exclusive Gate</div>
                <div className="hz-t-2xl hz-w-bold hz-mono">minLevel &gt;= 3</div>
                <div className="hz-t-xs hz-fg-muted hz-mt-2">
                  Unverified, L1 &amp; L2 profiles are strictly excluded from sensei.group
                </div>
              </div>
              <div className="hz-card hz-card-tight hz-align-left">
                <div className="hz-eyebrow hz-mb-1">Foundation Path</div>
                <div className="hz-t-2xl hz-w-bold">L1–L3 Free</div>
                <div className="hz-t-xs hz-fg-muted hz-mt-2">
                  Free forever on hanzo.university; passing L3 unlocks sensei.group
                </div>
              </div>
              <div className="hz-card hz-card-tight hz-align-left">
                <div className="hz-eyebrow hz-mb-1">Elite Tiers</div>
                <div className="hz-t-2xl hz-w-bold">L4–L9 ($100)</div>
                <div className="hz-t-xs hz-fg-muted hz-mt-2">
                  Proctored ZAP, TEE, Swarm, BitDelta, GRPO &amp; Zen/qwen3+ exams
                </div>
              </div>
              <div className="hz-card hz-card-tight hz-align-left">
                <div className="hz-eyebrow hz-mb-1">Agent Escalation</div>
                <div className="hz-t-2xl hz-w-bold hz-mono">hire_sensei</div>
                <div className="hz-t-xs hz-fg-muted hz-mt-2">
                  Native MCP tool &amp; /v1/sensei/hire escrow on Chain 36963
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive L3–L9 Verified Roster */}
      <section id="verified-roster" className="hz-py-7 hz-bg-surface hz-border-t">
        <div className="hz-container hz-mx-auto hz-px-5">
          <div className="hz-col-row hz-jc-between hz-ai-start hz-gap-4 hz-mb-6">
            <div>
              <div className="hz-eyebrow hz-mb-2">hanzo.market Curated Lens · Chain {HANZO_NETWORK_CHAIN_ID}</div>
              <h2 className="hz-t-4xl hz-w-bold hz-mb-2">Verified L3–L9 Human Senseis</h2>
              <p className="hz-fg-muted">
                Showing {verifiedSenseis.length} active practitioners with on-chain{" "}
                <span className="hz-mono">did:hanzo:</span> credentials ({gatedOutCount} L1–L2 foundation accounts
                automatically filtered out by <span className="hz-mono">minLevel &gt;= 3</span>).
              </p>
            </div>

            <a href="https://hanzo.market" target="_blank" rel="noreferrer" className="hz-btn">
              Open Full hanzo.market
              <ExternalLink className="hz-sq-2" />
            </a>
          </div>

          {/* Gate Controls: minLevel >= 3 + Domain */}
          <div className="hz-card hz-card-tight hz-mb-6">
            <div className="hz-col-row hz-jc-between hz-ai-start hz-gap-4">
              <div>
                <div className="hz-t-xs hz-fg-muted hz-mb-2 hz-mono">
                  ENFORCED CREDENTIAL GATE (minLevel: {minLevel} · L1 &amp; L2 LOCKED OUT)
                </div>
                <div className="hz-row hz-gap-2">
                  {CERTIFIED_LEVELS.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setMinLevel(lvl)}
                      className={monoTabClass(minLevel === lvl)}
                    >
                      L{lvl}+
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="hz-t-xs hz-fg-muted hz-mb-2 hz-mono">SPECIALIZATION DOMAIN</div>
                <div className="hz-row hz-gap-2">
                  {DOMAIN_FILTERS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDomain(d.id)}
                      className={sansTabClass(selectedDomain === d.id)}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Roster Cards */}
          <div className="hz-grid hz-grid-3 hz-gap-4">
            {verifiedSenseis.map((sensei) => (
              <div key={sensei.id} className="hz-card hz-card-interactive hz-col hz-jc-between">
                <div>
                  <div className="hz-row hz-jc-between hz-ai-center hz-mb-3">
                    <span className="hz-badge hz-bg-inverse hz-mono">
                      <Award className="hz-sq-1" />
                      {sensei.badge} · {sensei.designation}
                    </span>
                    <span className="hz-t-sm hz-mono hz-fg-soft">${sensei.hourlyUsdc}/hr</span>
                  </div>

                  <h3 className="hz-t-xl hz-w-bold hz-mb-1">{sensei.name}</h3>
                  <div className="hz-t-sm hz-fg-muted hz-mb-3">{sensei.role}</div>

                  <div className="hz-row hz-gap-2 hz-wrap hz-mb-4">
                    {sensei.specialties.map((spec) => (
                      <span key={spec} className="hz-pill">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hz-border-t hz-pt-4 hz-mt-2">
                  <div className="hz-row hz-jc-between hz-ai-center hz-t-xs hz-fg-muted hz-mono hz-mb-3">
                    <span className="hz-truncate">{sensei.attestation.did}</span>
                    <span>{sensei.completedBounties} verified jobs</span>
                  </div>
                  <div className="hz-row hz-jc-between hz-ai-center hz-t-xs hz-fg-faint hz-mono">
                    <span>
                      <CheckCircle2 className="hz-sq-1" /> {sensei.attestation.chain}
                    </span>
                    <span>tx {sensei.attestation.txDigest.slice(0, 10)}…</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* #98 & #99: hanzo.sh -> hanzo.university Handoff + L1–L9 Progress, Credentials & Unlocks */}
      <section id="certification-progress" className="hz-py-7 hz-border-t">
        <div className="hz-container hz-mx-auto hz-px-5">
          <div className="hz-mb-6">
            <div className="hz-eyebrow hz-mb-2">hanzo.sh → hanzo.university → sensei.group</div>
            <h2 className="hz-t-4xl hz-w-bold hz-mb-3">
              Seamless CLI Handoff, L1–L9 Progress &amp; Credential Unlocks
            </h2>
            <p className="hz-fg-muted hz-mw-xl">
              One <span className="hz-mono">did:hanzo:</span> identity carries across CLI installation (
              <span className="hz-mono">hanzo.sh</span>), interactive coursework (
              <span className="hz-mono">hanzo.university</span>), and verified marketplace eligibility (
              <span className="hz-mono">sensei.group</span>).
            </p>
          </div>

          {/* #98: 3-Step hanzo.sh -> hanzo.university Handoff */}
          <div className="hz-grid hz-grid-3 hz-gap-4 hz-mb-6">
            {HANZO_SH_TO_UNIVERSITY_FLOW.map((item) => (
              <div key={item.step} className="hz-card hz-card-tight">
                <div className="hz-row hz-jc-between hz-ai-center hz-mb-2">
                  <span className="hz-pill hz-mono">Step {item.step} · {item.surface}</span>
                </div>
                <h3 className="hz-t-lg hz-w-semibold hz-mb-2">{item.title}</h3>
                <div className="hz-bg-quiet hz-bordered hz-r-md hz-p-2 hz-mb-3 hz-scroll-x">
                  <code className="hz-mono hz-t-xs hz-fg-soft">{item.commandOrUrl}</code>
                </div>
                <div className="hz-t-xs hz-fg-muted hz-mb-1">
                  <strong className="hz-fg">Saved Progress:</strong> {item.savedState}
                </div>
                <div className="hz-t-xs hz-fg-muted">
                  <strong className="hz-fg">Handoff:</strong> {item.nextHandoff}
                </div>
              </div>
            ))}
          </div>

          {/* #99: Interactive L1–L9 Progress, Outstanding Requirements, Issued Credentials & Unlocks */}
          <div className="hz-card">
            <div className="hz-col-row hz-jc-between hz-ai-start hz-gap-4 hz-mb-5">
              <div>
                <div className="hz-t-xs hz-fg-muted hz-mono hz-mb-2">
                  INSPECT CANDIDATE PROGRESS &amp; MARKETPLACE UNLOCKS
                </div>
                <div className="hz-row hz-gap-2">
                  {LEARNER_PROGRESS_PROFILES.map((prof) => (
                    <button
                      key={prof.id}
                      type="button"
                      onClick={() => setSelectedLearnerId(prof.id)}
                      className={sansTabClass(selectedLearnerId === prof.id)}
                    >
                      {prof.label}
                    </button>
                  ))}
                </div>
              </div>
              <span className="hz-pill hz-mono">{activeLearner.did}</span>
            </div>

            {/* L1..L9 Step Track */}
            <div className="hz-row hz-gap-2 hz-mb-5">
              {ALL_LEVELS.map((lvl) => {
                const done = activeLearner.completedLevels.includes(lvl);
                return (
                  <span
                    key={lvl}
                    className={done ? "hz-badge hz-bg-inverse hz-mono" : "hz-pill hz-mono"}
                  >
                    L{lvl} {done ? "✓" : lvl === activeLearner.targetLevel ? "Next" : "Locked"}
                  </span>
                );
              })}
            </div>

            <div className="hz-grid hz-grid-3 hz-gap-4">
              <div className="hz-bg-quiet hz-bordered hz-r-md hz-p-4">
                <div className="hz-eyebrow hz-mb-2">Outstanding Requirements (Target L{activeLearner.targetLevel})</div>
                <div className="hz-stack-2">
                  {activeLearner.outstandingRequirements.map((req) => (
                    <div key={req} className="hz-t-sm hz-fg-muted">
                      • {req}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hz-bg-quiet hz-bordered hz-r-md hz-p-4">
                <div className="hz-eyebrow hz-mb-2">Issued Chain 36963 Credentials</div>
                <div className="hz-stack-2">
                  {activeLearner.issuedCredentials.map((cred) => (
                    <div key={cred.badge} className="hz-row hz-jc-between hz-ai-center hz-t-xs hz-mono">
                      <span className="hz-fg hz-w-semibold">{cred.badge} Verified</span>
                      <span className="hz-fg-muted">{cred.chain} · {cred.txDigest.slice(0, 10)}…</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hz-bg-quiet hz-bordered hz-r-md hz-p-4 hz-col hz-jc-between">
                <div>
                  <div className="hz-eyebrow hz-mb-2">What Your Credential Unlocks</div>
                  <div className="hz-stack-2 hz-mb-4">
                    {activeLearner.unlockedCapabilities.map((cap) => (
                      <div key={cap} className="hz-t-sm hz-fg-muted">
                        • {cap}
                      </div>
                    ))}
                  </div>
                </div>
                <a href={activeLearner.nextActionHref} className="hz-btn hz-btn-primary">
                  {activeLearner.nextActionLabel}
                  <ArrowRight className="hz-sq-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* #100: Marketplace & Bounty Journey (Discover -> Eligibility -> Apply -> Submit -> Outcome) */}
      <section id="bounty-journey" className="hz-py-7 hz-bg-surface hz-border-t">
        <div className="hz-container hz-mx-auto hz-px-5">
          <div className="hz-mb-6">
            <div className="hz-eyebrow hz-mb-2">sensei.group ↔ hanzo.market Escrow Lifecycle</div>
            <h2 className="hz-t-4xl hz-w-bold hz-mb-3">
              Marketplace &amp; Bounty Journey: Discover to Settlement
            </h2>
            <p className="hz-fg-muted hz-mw-xl">
              Walk every stage from discovering open bounties and checking <span className="hz-mono">minLevel &gt;= 3</span>{" "}
              eligibility through escrow lock, signed delivery, and on-chain USDC/AI release.
            </p>
          </div>

          {/* 5-Stage Interactive Stepper */}
          <div className="hz-row hz-gap-2 hz-mb-5">
            {BOUNTY_STAGES.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setActiveBountyStage(st.id)}
                className={sansTabClass(activeBountyStage === st.id)}
              >
                {st.step}
              </button>
            ))}
          </div>

          <div className="hz-card hz-card-tight hz-mb-6">
            <div className="hz-col-row hz-jc-between hz-ai-center hz-gap-4">
              <div>
                <div className="hz-row hz-ai-center hz-gap-3 hz-mb-2">
                  <span className="hz-t-lg hz-w-bold">{activeStageDetail.step}</span>
                  <span className="hz-pill hz-mono">{activeStageDetail.escrowState}</span>
                </div>
                <p className="hz-t-sm hz-fg-muted hz-mb-1">{activeStageDetail.summary}</p>
                <p className="hz-t-xs hz-fg">
                  <strong>Next Action:</strong> {activeStageDetail.nextAction}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSellerCleared((prev) => !prev)}
                className="hz-btn hz-mono"
              >
                Seller Principal: {sellerCleared ? "Cleared ✓" : "Incomplete (Test Handoff)"}
              </button>
            </div>
          </div>

          {/* Selectable Open Bounties + Live Eligibility Verdict */}
          <div className="hz-grid hz-grid-3 hz-gap-4 hz-mb-5">
            {OPEN_SENSEI_BOUNTIES.map((bounty) => {
              const selected = bounty.id === selectedBounty.id;
              return (
                <div
                  key={bounty.id}
                  className={
                    selected
                      ? "hz-card hz-border-strong hz-col hz-jc-between"
                      : "hz-card hz-card-interactive hz-col hz-jc-between"
                  }
                >
                  <div>
                    <div className="hz-row hz-jc-between hz-ai-center hz-mb-3">
                      <span className="hz-badge hz-bg-inverse hz-mono">Requires L{bounty.minLevel}+</span>
                      <span className="hz-t-base hz-w-bold hz-mono">${bounty.rewardUsdc} USDC</span>
                    </div>
                    <h3 className="hz-t-base hz-w-semibold hz-mb-2">{bounty.title}</h3>
                    <div className="hz-t-xs hz-fg-muted hz-mono hz-mb-2">Source: {bounty.source}</div>
                    <div className="hz-t-xs hz-fg-faint hz-mono hz-mb-4">Verify: {bounty.acceptanceCheck}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedBountyId(bounty.id)}
                    className={selected ? "hz-btn hz-btn-primary hz-w-full" : "hz-btn hz-w-full"}
                  >
                    {selected ? "Selected for Eligibility Check ✓" : "Check Eligibility"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="hz-card hz-card-tight">
            <div className="hz-col-row hz-jc-between hz-ai-center hz-gap-4">
              <div>
                <div className="hz-eyebrow hz-mb-1">
                  Live Eligibility Check ({activeLearner.did} · Highest Badge L{highestLearnerLevel} vs{" "}
                  {selectedBounty.id.toUpperCase()} L{selectedBounty.minLevel}+)
                </div>
                <div className="hz-t-base hz-w-semibold hz-mb-1">
                  {eligibility.eligible ? "Status: ELIGIBLE TO CLAIM & LOCK ESCROW" : "Status: ACTION REQUIRED BEFORE CLAIM"}
                </div>
                <div className="hz-t-sm hz-fg-muted">{eligibility.reason}</div>
              </div>
              <a
                href={eligibility.nextActionHref}
                target="_blank"
                rel="noreferrer"
                className="hz-btn hz-btn-primary"
              >
                {eligibility.nextActionLabel}
                <ExternalLink className="hz-sq-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Agent-Hires-Human Protocol Section (hire_sensei MCP & POST /v1/sensei/hire) */}
      <section id="agent-protocol" className="hz-py-7 hz-border-t">
        <div className="hz-container hz-mx-auto hz-px-5">
          <div className="hz-grid hz-grid-2 hz-gap-6 hz-ai-start">
            <div>
              <div className="hz-eyebrow hz-mb-2">Agent-to-Human Escalation · HIP-1349</div>
              <h2 className="hz-t-4xl hz-w-bold hz-mb-4">
                When Autonomous Agents Hit Uncertainty, They Hire a Sensei.
              </h2>
              <p className="hz-fg-muted hz-leading-relaxed hz-mb-5">
                Autonomous loops (<span className="hz-mono">hanzo dev</span>,{" "}
                <span className="hz-mono">hanzo team</span>, and custom MCP agents) monitor calibrated{" "}
                <strong className="hz-fg">Kai</strong> decision scores and security boundaries. Whenever confidence
                drops below threshold or a production boundary requires certified human sign-off, the agent invokes{" "}
                <span className="hz-mono">hire_sensei</span> directly.
              </p>

              <div className="hz-stack-3 hz-mb-6">
                <div className="hz-card hz-card-tight">
                  <div className="hz-row hz-ai-center hz-gap-3 hz-mb-1">
                    <Terminal className="hz-sq-3 hz-fg-muted" />
                    <span className="hz-w-semibold">1. Typed Escalation &amp; Gate Check</span>
                  </div>
                  <p className="hz-t-sm hz-fg-muted">
                    Agent calls <span className="hz-mono">hire_sensei</span> (MCP) or{" "}
                    <span className="hz-mono">POST /v1/sensei/hire</span> with{" "}
                    <span className="hz-mono">minLevel &gt;= 3</span>, reproducible git URI, and falsifiable
                    acceptance criteria. Any request with <span className="hz-mono">minLevel &lt; 3</span> is
                    deterministically refused (<span className="hz-mono">422 sensei_level_below_gate</span>).
                  </p>
                </div>

                <div className="hz-card hz-card-tight">
                  <div className="hz-row hz-ai-center hz-gap-3 hz-mb-1">
                    <ShieldCheck className="hz-sq-3 hz-fg-muted" />
                    <span className="hz-w-semibold">2. Allowance &amp; Principal Escrow on Chain 36963</span>
                  </div>
                  <p className="hz-t-sm hz-fg-muted">
                    Spend is bounded by the agent key&apos;s <span className="hz-mono">/v1/allowance</span> ceiling,
                    cleared via <span className="hz-mono">/v1/principal/clearance</span> (HIP-1340), and locked into{" "}
                    <span className="hz-mono">hanzo.market</span> escrow on Hanzo Network.
                  </p>
                </div>

                <div className="hz-card hz-card-tight">
                  <div className="hz-row hz-ai-center hz-gap-3 hz-mb-1">
                    <Cpu className="hz-sq-3 hz-fg-muted" />
                    <span className="hz-w-semibold">3. Verified Resolution Resumes the Agent DAG</span>
                  </div>
                  <p className="hz-t-sm hz-fg-muted">
                    Matched L{minLevel}–L9 Sensei submits a signed patch or attestation; once{" "}
                    <span className="hz-mono">acceptanceCriteria</span> pass, escrow settles and the waiting agent
                    continues execution automatically.
                  </p>
                </div>
              </div>

              <div className="hz-row hz-gap-3">
                <a href="/.well-known/mcp.json" target="_blank" rel="noreferrer" className="hz-btn hz-mono">
                  <Code2 className="hz-sq-2" />
                  /.well-known/mcp.json
                </a>
                <a href="/llms.txt" target="_blank" rel="noreferrer" className="hz-btn hz-mono">
                  /llms.txt
                </a>
              </div>
            </div>

            {/* Live Protocol Inspector */}
            <div className="hz-card">
              <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
                <div className="hz-row hz-gap-2">
                  <button
                    type="button"
                    onClick={() => setProtocolTab("mcp")}
                    className={monoTabClass(protocolTab === "mcp")}
                  >
                    MCP Call (hire_sensei)
                  </button>
                  <button
                    type="button"
                    onClick={() => setProtocolTab("http")}
                    className={monoTabClass(protocolTab === "http")}
                  >
                    POST /v1/sensei/hire
                  </button>
                  <button
                    type="button"
                    onClick={() => setProtocolTab("schema")}
                    className={monoTabClass(protocolTab === "schema")}
                  >
                    Tool Schema
                  </button>
                </div>
              </div>

              <div className="hz-bg-quiet hz-bordered hz-r-md hz-p-4 hz-scroll-x">
                <pre className="hz-mono hz-t-xs hz-fg-soft hz-m-0">{codeBlockText}</pre>
              </div>

              <div className="hz-row hz-jc-between hz-ai-center hz-mt-4 hz-t-xs hz-fg-muted hz-mono">
                <span>Active filter reflected: minLevel={minLevel}</span>
                <span>Idempotent 32B attempt nonce</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* L1–L9 Hanzo University Certification Ladder */}
      <section className="hz-py-7 hz-bg-surface hz-border-t">
        <div className="hz-container hz-mx-auto hz-px-5">
          <div className="hz-align-center hz-mb-6">
            <div className="hz-eyebrow hz-mb-2">Hanzo University · hanzo.university</div>
            <h2 className="hz-t-4xl hz-w-bold hz-mb-3">The L1–L9 Sensei Certification Ladder</h2>
            <p className="hz-container-narrow hz-mx-auto hz-fg-muted">
              L1–L3 are <strong className="hz-fg">Free Forever</strong> so every engineer can qualify for{" "}
              <span className="hz-mono">sensei.group</span> at L3. L4–L9 proctored practical exams are{" "}
              <strong className="hz-fg">$100 per attempt</strong> with an optional monthly subscription unlocking
              all interactive GPU &amp; microVM compute sandboxes.
            </p>
          </div>

          <div className="hz-card hz-card-flush hz-clip">
            <div className="hz-table-wrap">
              <table className="hz-table">
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Curriculum Competency</th>
                    <th>Exam &amp; Courseware Pricing</th>
                    <th>sensei.group Access</th>
                  </tr>
                </thead>
                <tbody>
                  {ALL_LEVELS.map((lvl) => {
                    const info = LEVEL_METADATA[lvl];
                    return (
                      <tr key={lvl}>
                        <td className="hz-mono hz-w-bold">{info.badge}</td>
                        <td>
                          <a
                            href={`https://docs.hanzo.ai/docs/university/l${lvl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hz-link hz-fg"
                          >
                            {info.title}
                          </a>
                        </td>
                        <td className="hz-fg-muted">{info.pricing}</td>
                        <td className="hz-mono">
                          {info.eligibleForSenseiGroup ? (
                            <span className="hz-fg">Eligible ({info.badge} Verified)</span>
                          ) : (
                            <span className="hz-fg-faint">Locked (Requires L3+)</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="hz-align-center hz-mt-6">
            <div className="hz-col-row hz-gap-4 hz-jc-center">
              <Button size="lg" className="hz-fg-inverse hz-w-semibold hz-px-6" asChild>
                <a href="https://docs.hanzo.ai/docs/university" target="_blank" rel="noreferrer">
                  <Sparkles className="hz-sq-2 hz-mr-2" />
                  Start Free L1–L3 Curriculum
                </a>
              </Button>
              <Button size="lg" variant="outline" className="hz-hoverable" asChild>
                <a href="https://hanzo.market" target="_blank" rel="noreferrer">
                  <Users className="hz-sq-2 hz-mr-2" />
                  Explore hanzo.market Escrow
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SenseiLanding;
