/**
 * Hanzo Sensei Certification & Agent-to-Human Hiring Protocol (HIP-1349)
 *
 * sensei.group operates as the curated L3+ human specialist lens over hanzo.market,
 * anchored by Verifiable Credentials on Hanzo Network (EVM Chain ID 36963).
 */

export const SENSEI_MIN_LEVEL = 3 as const;
export const SENSEI_MAX_LEVEL = 9 as const;
export const HANZO_NETWORK_CHAIN_ID = 36963 as const;
export const HANZO_NETWORK_CAIP2 = "eip155:36963" as const;

export type AllCurriculumLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type CertifiedSenseiLevel = 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SenseiDomain =
  | "engineering"
  | "ai-ml"
  | "architecture"
  | "distributed-systems"
  | "confidential-compute"
  | "security"
  | "design"
  | "product";

export interface SenseiAttestation {
  did: `did:hanzo:${string}`;
  chain: string;
  chainId: number;
  txDigest: `0x${string}`;
  revoked: boolean;
}

export interface SenseiCandidate {
  id: string;
  name: string;
  handle: string;
  role: string;
  level: AllCurriculumLevel;
  badge: `L${AllCurriculumLevel}`;
  designation: string;
  domains: SenseiDomain[];
  specialties: string[];
  hourlyUsdc: number;
  completedBounties: number;
  availability: "available" | "engaged";
  attestation: SenseiAttestation;
}

export interface EscalationReason {
  kaiConfidence: number;
  threshold: number;
  trigger:
    | "sub_threshold_confidence"
    | "security_boundary_signoff"
    | "legal_privilege_gate"
    | "architecture_arbitration"
    | "hardware_verification";
}

export interface HireSenseiRequest {
  attempt: string;
  minLevel: number;
  domain: SenseiDomain;
  title: string;
  contextUri?: string;
  acceptanceCriteria: string[];
  maxBudgetUsdc: string;
  deadlineSeconds?: number;
  escalationReason?: EscalationReason;
}

export class SenseiGateError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(code: string, message: string, status = 422) {
    super(message);
    this.name = "SenseiGateError";
    this.code = code;
    this.status = status;
  }
}

export const LEVEL_METADATA: Record<
  AllCurriculumLevel,
  { badge: `L${AllCurriculumLevel}`; title: string; pricing: string; eligibleForSenseiGroup: boolean }
> = {
  1: {
    badge: "L1",
    title: "AI & Prompt Engineering Foundations (Enso, Kai, Zen 6)",
    pricing: "Free Forever",
    eligibleForSenseiGroup: false,
  },
  2: {
    badge: "L2",
    title: "Agentic Coding & MCP Workflows (hanzo dev, hanzod)",
    pricing: "Free Forever",
    eligibleForSenseiGroup: false,
  },
  3: {
    badge: "L3",
    title: "Full-Stack Hanzo Apps, Bots & Domain Templates",
    pricing: "Free Forever — Unlocks sensei.group",
    eligibleForSenseiGroup: true,
  },
  4: {
    badge: "L4",
    title: "Distributed Systems & ZAP Zero-Copy Protocol",
    pricing: "$100 / exam + optional monthly lab sub",
    eligibleForSenseiGroup: true,
  },
  5: {
    badge: "L5",
    title: "Sovereign Cloud, hanzo up MicroVMs & Confidential Compute",
    pricing: "$100 / exam + optional monthly lab sub",
    eligibleForSenseiGroup: true,
  },
  6: {
    badge: "L6",
    title: "Autonomous Multi-Agent Swarms & Team Consensus",
    pricing: "$100 / exam + optional monthly lab sub",
    eligibleForSenseiGroup: true,
  },
  7: {
    badge: "L7",
    title: "Dataset Curation, Synthetic Data & PEFT (LoRA / QLoRA / BitDelta)",
    pricing: "$100 / exam + optional monthly lab sub",
    eligibleForSenseiGroup: true,
  },
  8: {
    badge: "L8",
    title: "Post-Training Alignment, RLHF, DPO & GRPO Reasoning Loops",
    pricing: "$100 / exam + optional monthly lab sub",
    eligibleForSenseiGroup: true,
  },
  9: {
    badge: "L9",
    title: "Frontier Architecture, 4D Pre-Training, Model Soups & Quantization (Zen 6 / qwen3+)",
    pricing: "$100 / exam + optional monthly lab sub",
    eligibleForSenseiGroup: true,
  },
};

/**
 * Raw ecosystem pool (includes L1/L2 learners from hanzo.university to prove
 * that sensei.group's L3+ gate deterministically filters them out).
 */
export const ECOSYSTEM_PRACTITIONERS: SenseiCandidate[] = [
  {
    id: "sn-l9-kenji",
    name: "Dr. Kenji Takahashi",
    handle: "@kenji",
    role: "Principal Frontier Architect",
    level: 9,
    badge: "L9",
    designation: "Principal Fellow",
    domains: ["ai-ml", "architecture"],
    specialties: ["Zen 6 / qwen3+ MoE", "4D Pre-Training", "DARE-TIES Soups", "FP8 / AWQ"],
    hourlyUsdc: 450,
    completedBounties: 64,
    availability: "available",
    attestation: {
      did: "did:hanzo:kenji",
      chain: HANZO_NETWORK_CAIP2,
      chainId: HANZO_NETWORK_CHAIN_ID,
      txDigest: "0x91e4a7c2b08d3f6512c9e840a3b7d6f15284c90ae7b31d426f80c519a2d4e7b3",
      revoked: false,
    },
  },
  {
    id: "sn-l8-amara",
    name: "Amara Okafor",
    handle: "@amara",
    role: "Post-Training & RLVR Lead",
    level: 8,
    badge: "L8",
    designation: "Alignment Sensei",
    domains: ["ai-ml", "engineering"],
    specialties: ["hanzo-ml GRPO", "Online DPO", "Sandbox Reward Verifiers", "Kai Calibration"],
    hourlyUsdc: 380,
    completedBounties: 51,
    availability: "available",
    attestation: {
      did: "did:hanzo:amara",
      chain: HANZO_NETWORK_CAIP2,
      chainId: HANZO_NETWORK_CHAIN_ID,
      txDigest: "0x7c3b20f9e41d8a650b92c7e134f8a6d2095e1b7c84d32a60f19e8c7b45d2a109",
      revoked: false,
    },
  },
  {
    id: "sn-l7-elena",
    name: "Elena Rostova",
    handle: "@elena",
    role: "Staff Fine-Tuning Engineer",
    level: 7,
    badge: "L7",
    designation: "Fine-Tuning Sensei",
    domains: ["ai-ml", "engineering"],
    specialties: ["1-Bit BitDelta", "QLoRA NF4", "Synthetic Trajectories", "Decontamination"],
    hourlyUsdc: 320,
    completedBounties: 78,
    availability: "available",
    attestation: {
      did: "did:hanzo:elena",
      chain: HANZO_NETWORK_CAIP2,
      chainId: HANZO_NETWORK_CHAIN_ID,
      txDigest: "0x4a82d1f7c309e5b61824a9c0d7f3e6b58120c4d9e7a3b5f16082d4c9a1e7f3b8",
      revoked: false,
    },
  },
  {
    id: "sn-l6-marcus",
    name: "Marcus Vance",
    handle: "@mvance",
    role: "Principal Swarm Systems Architect",
    level: 6,
    badge: "L6",
    designation: "Swarm Sensei",
    domains: ["architecture", "engineering"],
    specialties: ["Multi-Agent DAGs", "Kai Consensus", "Worktree Isolation", "Allowance Guards"],
    hourlyUsdc: 290,
    completedBounties: 93,
    availability: "available",
    attestation: {
      did: "did:hanzo:mvance",
      chain: HANZO_NETWORK_CAIP2,
      chainId: HANZO_NETWORK_CHAIN_ID,
      txDigest: "0x2f60c9a8d417e3b59012f8c4a7d6e3b15908c2a4e7f1b3d68094c5e2a1b7d8f0",
      revoked: false,
    },
  },
  {
    id: "sn-l5-sophia",
    name: "Sophia Lindqvist",
    handle: "@slindqvist",
    role: "Sovereign Cloud & TEE Security Architect",
    level: 5,
    badge: "L5",
    designation: "Cloud Sensei",
    domains: ["confidential-compute", "security", "architecture"],
    specialties: ["hanzo up Clusters", "Kata / Firecracker", "SEV-SNP Attestation", "hanzo-ca PQ-PKI"],
    hourlyUsdc: 275,
    completedBounties: 67,
    availability: "available",
    attestation: {
      did: "did:hanzo:slindqvist",
      chain: HANZO_NETWORK_CAIP2,
      chainId: HANZO_NETWORK_CHAIN_ID,
      txDigest: "0x8d15e4b2a907c3f64182d9e0b7a5c3f16290e8d4b7c1a3f59028e6d1c4b7a9e2",
      revoked: false,
    },
  },
  {
    id: "sn-l4-mateo",
    name: "Mateo Alvarez",
    handle: "@malvarez",
    role: "Distributed Systems & ZAP Kernel Engineer",
    level: 4,
    badge: "L4",
    designation: "Systems Sensei",
    domains: ["distributed-systems", "engineering"],
    specialties: ["ZAP Zero-Copy", "Shared-Memory Arenas", "Rust / Go Bindings", "Sub-us IPC"],
    hourlyUsdc: 240,
    completedBounties: 84,
    availability: "available",
    attestation: {
      did: "did:hanzo:malvarez",
      chain: HANZO_NETWORK_CAIP2,
      chainId: HANZO_NETWORK_CHAIN_ID,
      txDigest: "0x5b93c1e8f204a7d63195b8c0e4f7a2d18306c9e4f1a7b2d59038c6e1b4d7f2a8",
      revoked: false,
    },
  },
  {
    id: "sn-l3-priya",
    name: "Priya Nair",
    handle: "@priya",
    role: "Full-Stack Hanzo OS & Domain CRM Lead",
    level: 3,
    badge: "L3",
    designation: "Certified Sensei",
    domains: ["engineering", "product", "design"],
    specialties: ["Hanzo Base /v1/schema", "Legal-Discovery CRM", "Multi-Channel Bots", "@hanzo/gui"],
    hourlyUsdc: 185,
    completedBounties: 112,
    availability: "available",
    attestation: {
      did: "did:hanzo:priya",
      chain: HANZO_NETWORK_CAIP2,
      chainId: HANZO_NETWORK_CHAIN_ID,
      txDigest: "0x6e24a8d1c903f7b52816e9a0d4c7f3b29105a8e4d7c1b3f68029a5d1e4c7b8f3",
      revoked: false,
    },
  },
  // L2 & L1 entries exist in the broader ecosystem but MUST NEVER pass the sensei.group L3+ gate:
  {
    id: "sn-l2-devon",
    name: "Devon Brooks",
    handle: "@devon",
    role: "MCP Tooling Developer",
    level: 2,
    badge: "L2",
    designation: "Practitioner",
    domains: ["engineering"],
    specialties: ["hanzo dev", "MCP Servers"],
    hourlyUsdc: 110,
    completedBounties: 9,
    availability: "available",
    attestation: {
      did: "did:hanzo:devon",
      chain: HANZO_NETWORK_CAIP2,
      chainId: HANZO_NETWORK_CHAIN_ID,
      txDigest: "0x1111111111111111111111111111111111111111111111111111111111111111",
      revoked: false,
    },
  },
  {
    id: "sn-l1-sam",
    name: "Samira Patel",
    handle: "@samira",
    role: "Prompt Operations Associate",
    level: 1,
    badge: "L1",
    designation: "Associate",
    domains: ["product"],
    specialties: ["Enso", "Kai Rubrics"],
    hourlyUsdc: 75,
    completedBounties: 2,
    availability: "available",
    attestation: {
      did: "did:hanzo:samira",
      chain: HANZO_NETWORK_CAIP2,
      chainId: HANZO_NETWORK_CHAIN_ID,
      txDigest: "0x2222222222222222222222222222222222222222222222222222222222222222",
      revoked: false,
    },
  },
];

const VALID_DOMAINS: ReadonlySet<string> = new Set<SenseiDomain>([
  "engineering",
  "ai-ml",
  "architecture",
  "distributed-systems",
  "confidential-compute",
  "security",
  "design",
  "product",
]);

/**
 * Checks whether a candidate holds an active, unrevoked L3+ attestation on Hanzo Network (36963).
 */
export function isVerifiedL3PlusSensei(candidate: SenseiCandidate): boolean {
  return (
    candidate.level >= SENSEI_MIN_LEVEL &&
    candidate.level <= SENSEI_MAX_LEVEL &&
    !candidate.attestation.revoked &&
    candidate.attestation.chainId === HANZO_NETWORK_CHAIN_ID &&
    candidate.attestation.chain === HANZO_NETWORK_CAIP2 &&
    candidate.attestation.did.startsWith("did:hanzo:")
  );
}

/**
 * Filters a candidate pool strictly through the sensei.group L3+ gate.
 * Throws SenseiGateError if a caller attempts to request minLevel < 3.
 */
export function filterVerifiedSenseis(
  candidates: readonly SenseiCandidate[],
  options: { minLevel?: number; domain?: SenseiDomain | "all" } = {}
): SenseiCandidate[] {
  const minLevel = options.minLevel ?? SENSEI_MIN_LEVEL;
  if (!Number.isInteger(minLevel) || minLevel < SENSEI_MIN_LEVEL || minLevel > SENSEI_MAX_LEVEL) {
    throw new SenseiGateError(
      "sensei_level_below_gate",
      `sensei.group requires minLevel in [${SENSEI_MIN_LEVEL}, ${SENSEI_MAX_LEVEL}] (received ${String(minLevel)})`
    );
  }

  return candidates
    .filter((c) => isVerifiedL3PlusSensei(c) && c.level >= minLevel)
    .filter((c) => !options.domain || options.domain === "all" || c.domains.includes(options.domain))
    .sort((a, b) => b.level - a.level || b.completedBounties - a.completedBounties);
}

/**
 * Validates an Agent-to-Human hiring request (`POST /v1/sensei/hire` / `hire_sensei`).
 */
export function validateHireSenseiRequest(req: HireSenseiRequest): HireSenseiRequest {
  if (!Number.isInteger(req.minLevel) || req.minLevel < SENSEI_MIN_LEVEL || req.minLevel > SENSEI_MAX_LEVEL) {
    throw new SenseiGateError(
      "sensei_level_below_gate",
      `Agent escalation rejected: minLevel must be an integer between ${SENSEI_MIN_LEVEL} (L3) and ${SENSEI_MAX_LEVEL} (L9).`
    );
  }
  if (!/^0x[0-9a-fA-F]{64}$/.test(req.attempt)) {
    throw new SenseiGateError(
      "invalid_attempt_nonce",
      "attempt must be a 32-byte hex idempotency token (0x + 64 hex characters)."
    );
  }
  if (!VALID_DOMAINS.has(req.domain)) {
    throw new SenseiGateError("invalid_domain", `Unsupported Sensei domain: ${String(req.domain)}`);
  }
  const title = req.title.trim();
  if (title.length < 10 || title.length > 200) {
    throw new SenseiGateError("invalid_title", "title must be between 10 and 200 characters.");
  }
  if (!Array.isArray(req.acceptanceCriteria) || req.acceptanceCriteria.length < 1 || req.acceptanceCriteria.length > 20) {
    throw new SenseiGateError(
      "invalid_acceptance_criteria",
      "acceptanceCriteria must include 1 to 20 falsifiable verification checks."
    );
  }
  const budget = Number(req.maxBudgetUsdc);
  if (!/^\d+(\.\d{1,6})?$/.test(req.maxBudgetUsdc) || !Number.isFinite(budget) || budget <= 0) {
    throw new SenseiGateError("invalid_budget", "maxBudgetUsdc must be a positive decimal string.");
  }
  if (
    req.deadlineSeconds !== undefined &&
    (!Number.isInteger(req.deadlineSeconds) || req.deadlineSeconds < 300 || req.deadlineSeconds > 2_592_000)
  ) {
    throw new SenseiGateError("invalid_deadline", "deadlineSeconds must be between 300 and 2592000.");
  }
  return { ...req, title };
}

/**
 * Canonical MCP Tool definition advertised by sensei.group (`/.well-known/mcp.json`)
 * and Hanzo MCP servers so autonomous AI agents can escalate tasks to L3–L9 humans.
 */
export const HIRE_SENSEI_MCP_TOOL = {
  name: "hire_sensei",
  description:
    "Escalate a task and hire a cryptographically verified L3–L9 human Sensei via sensei.group (curated lens on hanzo.market, settled via escrow on Hanzo Network chain 36963).",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["minLevel", "domain", "title", "acceptanceCriteria", "maxBudgetUsdc"],
    properties: {
      minLevel: {
        type: "integer",
        minimum: 3,
        maximum: 9,
        description: "Minimum required Sensei certification tier (L3–L9). Requests < 3 are rejected.",
      },
      domain: {
        type: "string",
        enum: [
          "engineering",
          "ai-ml",
          "architecture",
          "distributed-systems",
          "confidential-compute",
          "security",
          "design",
          "product",
        ],
        description: "Primary technical specialization required.",
      },
      title: {
        type: "string",
        minLength: 10,
        maxLength: 200,
        description: "Concise summary of the deliverable requested from the human Sensei.",
      },
      contextUri: {
        type: "string",
        format: "uri",
        description: "Optional pull request, Enso workspace, or repository URI with reproducible state.",
      },
      acceptanceCriteria: {
        type: "array",
        minItems: 1,
        maxItems: 20,
        items: { type: "string" },
        description: "Deterministic tests, commands, or sign-off checks required to release escrow.",
      },
      maxBudgetUsdc: {
        type: "string",
        pattern: "^\\d+(\\.\\d{1,6})?$",
        description: "Maximum USDC escrow ceiling bounded by the calling agent's /v1/allowance grant.",
      },
      deadlineSeconds: {
        type: "integer",
        minimum: 300,
        maximum: 2592000,
        default: 86400,
        description: "Time window in seconds before unclaimed escrow expires.",
      },
      escalationReason: {
        type: "object",
        properties: {
          kaiConfidence: { type: "number", minimum: 0, maximum: 1 },
          threshold: { type: "number", minimum: 0, maximum: 1 },
          trigger: { type: "string" },
        },
      },
    },
  },
} as const;


/**
 * End-to-End Journeys (#98 hanzo.sh -> hanzo.university,
 * #99 Certification Progress & Unlocks -> sensei.group,
 * #100 Marketplace & Bounty Lifecycle).
 */

export interface OnboardingStep {
  step: number;
  surface: string;
  title: string;
  commandOrUrl: string;
  savedState: string;
  nextHandoff: string;
}

export const HANZO_SH_TO_UNIVERSITY_FLOW: OnboardingStep[] = [
  {
    step: 1,
    surface: "hanzo.sh",
    title: "Install Native CLI & Authenticate",
    commandOrUrl: "curl -fsSL https://hanzo.sh | sh && hanzo auth login",
    savedState: "PKCE S256 session bound to did:hanzo:<user> via hanzo.ai/login",
    nextHandoff: "Automatic SSO handoff into hanzo.university (zero re-signup)",
  },
  {
    step: 2,
    surface: "hanzo.university",
    title: "Auto-Enroll in L1–L3 Free Forever Track",
    commandOrUrl: "https://docs.hanzo.ai/docs/university",
    savedState: "Enrolled in L1 Associate track ($0 Free Forever, no card required)",
    nextHandoff: "Launch L1 Module 1 (Enso, Kai /v1/decisions & Zen)",
  },
  {
    step: 3,
    surface: "CLI + Browser",
    title: "Complete First Lesson & Sync Progress",
    commandOrUrl: "hanzo run l1-decisions --verify",
    savedState: "Lesson score & lab hash persisted to did:hanzo:<user> across web + CLI",
    nextHandoff: "Advance L1 -> L2 -> L3 Capstone to unlock sensei.group",
  },
];

export interface LearnerProgressSnapshot {
  id: string;
  label: string;
  did: `did:hanzo:${string}`;
  completedLevels: AllCurriculumLevel[];
  targetLevel: AllCurriculumLevel;
  outstandingRequirements: string[];
  issuedCredentials: Array<{
    badge: `L${AllCurriculumLevel}`;
    chain: string;
    txDigest: `0x${string}`;
  }>;
  unlockedCapabilities: string[];
  nextActionLabel: string;
  nextActionHref: string;
}

export const LEARNER_PROGRESS_PROFILES: LearnerProgressSnapshot[] = [
  {
    id: "learner-l2",
    label: "L2 Practitioner -> Unlocking L3 Gate",
    did: "did:hanzo:devon",
    completedLevels: [1, 2],
    targetLevel: 3,
    outstandingRequirements: [
      "Deploy 1 full-stack domain template (job-crm or legal-discovery) with /v1/schema",
      "Pass `hanzo run legal-discovery --verify` ($0 Free Forever L3 Capstone)",
    ],
    issuedCredentials: [
      { badge: "L1", chain: HANZO_NETWORK_CAIP2, txDigest: "0xa101000000000000000000000000000000000000000000000000000000000101" },
      { badge: "L2", chain: HANZO_NETWORK_CAIP2, txDigest: "0xb202000000000000000000000000000000000000000000000000000000000202" },
    ],
    unlockedCapabilities: [
      "Verified L1 & L2 credentials on hanzo.id",
      "Publish MCP tools & skills on hanzo.market",
      "Locked on sensei.group until L3 Capstone completes (minLevel >= 3)",
    ],
    nextActionLabel: "Complete Free L3 Capstone on hanzo.university",
    nextActionHref: "https://docs.hanzo.ai/docs/university/l3",
  },
  {
    id: "learner-l3",
    label: "L3 Certified Sensei -> Eligible on sensei.group",
    did: "did:hanzo:priya",
    completedLevels: [1, 2, 3],
    targetLevel: 4,
    outstandingRequirements: [
      "Optional: Register for L4 ZAP Zero-Copy practical exam ($100 / attempt)",
      "Optional: Activate monthly courseware subscription for 16-vCPU ZAP benchmark sandbox",
    ],
    issuedCredentials: [
      { badge: "L1", chain: HANZO_NETWORK_CAIP2, txDigest: "0xc301000000000000000000000000000000000000000000000000000000000301" },
      { badge: "L2", chain: HANZO_NETWORK_CAIP2, txDigest: "0xc302000000000000000000000000000000000000000000000000000000000302" },
      { badge: "L3", chain: HANZO_NETWORK_CAIP2, txDigest: "0x6e24a8d1c903f7b52816e9a0d4c7f3b29105a8e4d7c1b3f68029a5d1e4c7b8f3" },
    ],
    unlockedCapabilities: [
      "sensei.group Verified Human Sensei profile UNLOCKED (minLevel >= 3)",
      "Eligible to claim L3 bounties & autonomous `hire_sensei` escalations",
      "Direct USDC/AI escrow settlement on Hanzo Network (Chain 36963)",
    ],
    nextActionLabel: "Claim Open L3+ Bounties Below",
    nextActionHref: "#bounty-journey",
  },
  {
    id: "learner-l9",
    label: "L9 Principal Fellow -> All Tiers Unlocked",
    did: "did:hanzo:kenji",
    completedLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    targetLevel: 9,
    outstandingRequirements: [
      "All L1–L9 Sensei certifications completed and active on Chain 36963",
    ],
    issuedCredentials: [
      { badge: "L3", chain: HANZO_NETWORK_CAIP2, txDigest: "0xd903000000000000000000000000000000000000000000000000000000000903" },
      { badge: "L6", chain: HANZO_NETWORK_CAIP2, txDigest: "0xd906000000000000000000000000000000000000000000000000000000000906" },
      { badge: "L9", chain: HANZO_NETWORK_CAIP2, txDigest: "0x91e4a7c2b08d3f6512c9e840a3b7d6f15284c90ae7b31d426f80c519a2d4e7b3" },
    ],
    unlockedCapabilities: [
      "Full L3–L9 sensei.group Fellow standing & research governance",
      "Eligible for every enterprise & agent escalation up to L9 (Zen / qwen3+ Frontier)",
      "Priority dispatch on high-value confidential compute & pre-training bounties",
    ],
    nextActionLabel: "Review L9 Principal Bounties on hanzo.market",
    nextActionHref: "https://hanzo.market",
  },
];

export type BountyLifecycleStage = "discover" | "eligibility" | "apply" | "submit" | "outcome";

export interface SenseiBounty {
  id: string;
  title: string;
  source: "agent:hire_sensei" | "enterprise:hanzo.market";
  minLevel: CertifiedSenseiLevel;
  domain: SenseiDomain;
  rewardUsdc: number;
  escrowStatus: "open" | "accepted" | "delivered" | "released";
  acceptanceCheck: string;
}

export const OPEN_SENSEI_BOUNTIES: SenseiBounty[] = [
  {
    id: "bnty-301",
    title: "Verify Legal-Discovery CRM privilege rubric & /v1/schema migration",
    source: "agent:hire_sensei",
    minLevel: 3,
    domain: "engineering",
    rewardUsdc: 450,
    escrowStatus: "open",
    acceptanceCheck: "hanzo run legal-discovery --verify",
  },
  {
    id: "bnty-504",
    title: "Audit SEV-SNP KMS key-release policy before production cutover",
    source: "agent:hire_sensei",
    minLevel: 5,
    domain: "confidential-compute",
    rewardUsdc: 900,
    escrowStatus: "open",
    acceptanceCheck: "hanzo kms verify-policy --tee sev-snp",
  },
  {
    id: "bnty-902",
    title: "Calibrate DARE-TIES Model Soup & AWQ 4-bit export on Zen qwen3+ 32B",
    source: "enterprise:hanzo.market",
    minLevel: 9,
    domain: "ai-ml",
    rewardUsdc: 2400,
    escrowStatus: "open",
    acceptanceCheck: "uv run hanzo-ml eval --kl-max 0.015",
  },
];

export interface BountyEligibilityResult {
  eligible: boolean;
  reason: string;
  nextActionLabel: string;
  nextActionHref: string;
}

export function evaluateBountyEligibility(
  candidateHighestLevel: AllCurriculumLevel,
  bounty: SenseiBounty,
  sellerPrincipalCleared = true
): BountyEligibilityResult {
  if (candidateHighestLevel < SENSEI_MIN_LEVEL) {
    return {
      eligible: false,
      reason: `Candidate holds L${candidateHighestLevel}; sensei.group enforces minLevel >= 3.`,
      nextActionLabel: "Earn Free L3 Sensei Credential on hanzo.university",
      nextActionHref: "https://docs.hanzo.ai/docs/university/l3",
    };
  }
  if (candidateHighestLevel < bounty.minLevel) {
    return {
      eligible: false,
      reason: `Bounty requires L${bounty.minLevel}+ attestation; candidate currently holds L${candidateHighestLevel}.`,
      nextActionLabel: `View L${bounty.minLevel} Exam Syllabus ($100 / attempt)`,
      nextActionHref: `https://docs.hanzo.ai/docs/university/l${bounty.minLevel}`,
    };
  }
  if (!sellerPrincipalCleared) {
    return {
      eligible: false,
      reason: "Organization KYC, W-9/W-8 tax profile, or Chain 36963 wallet binding incomplete.",
      nextActionLabel: "Complete Seller Clearance at hanzo.market/sell",
      nextActionHref: "https://hanzo.market/sell",
    };
  }
  return {
    eligible: true,
    reason: `Cleared: L${candidateHighestLevel} credential >= L${bounty.minLevel} & principal cleared on ${HANZO_NETWORK_CAIP2}.`,
    nextActionLabel: "Claim Bounty & Lock Escrow",
    nextActionHref: `https://hanzo.market/jobs`,
  };
}
