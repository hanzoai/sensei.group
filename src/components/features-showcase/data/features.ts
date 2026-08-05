
import { LucideIcon, Brain, Database, FileCode, Server, Eye, Shield, Activity, BarChart, Monitor, Cloud, ArrowRight, Code2, Bot, MessageSquare, Cpu, Zap, HardDrive, Box, ExternalLink, Workflow, Terminal } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  link: string;
  category?: 'ai-cloud' | 'dx-platform';
}

// AI Cloud features
const aiCloudFeatures: Feature[] = [
  {
    title: "Inference API",
    description: "High-performance API for frontier AI models, optimized for production workloads with millisecond latency.",
    icon: Brain,
    color: "",
    link: "/ai",
    category: "ai-cloud"
  },
  {
    title: "Vector Engine",
    description: "High-performance vector database for semantic search, RAG applications, and AI-powered information retrieval.",
    icon: Database,
    color: "",
    link: "/vector",
    category: "ai-cloud"
  },
  {
    title: "Chat",
    description: "Build custom AI assistants with personalized knowledge and capabilities for your users and teams.",
    icon: MessageSquare,
    color: "",
    link: "/teamchat",
    category: "ai-cloud"
  },
  {
    title: "Datastore",
    description: "Scalable data storage with built-in AI capabilities for intelligent data analysis and management.",
    icon: HardDrive,
    color: "",
    link: "/datastore",
    category: "ai-cloud"
  },
  {
    title: "Edge Functions",
    description: "Run AI-powered code at the edge, closer to your users for faster response times and better experiences.",
    icon: Zap,
    color: "",
    link: "/edge",
    category: "ai-cloud"
  },
  {
    title: "Observability",
    description: "Full visibility into your AI systems with comprehensive logging, monitoring, and analytics tools.",
    icon: Eye,
    color: "",
    link: "/observability",
    category: "ai-cloud"
  }
];

// DX Platform features
const dxPlatformFeatures: Feature[] = [
  {
    title: "Code",
    description: "AI-powered code editor with pair programming capabilities that understands your codebase and helps you write better code.",
    icon: Code2,
    color: "",
    link: "/hanzocode",
    category: "dx-platform"
  },
  {
    title: "App",
    description: "Visual AI application builder with drag-and-drop workflows to create sophisticated AI experiences without code.",
    icon: Monitor,
    color: "",
    link: "/app",
    category: "dx-platform"
  },
  {
    title: "Dev",
    description: "Your AI engineer for complex development tasks, capable of understanding requirements and implementing solutions.",
    icon: Terminal,
    color: "",
    link: "/dev",
    category: "dx-platform"
  },
  {
    title: "Bot",
    description: "Build autonomous AI agents that can reason about problems and take actions on your behalf with human-like intelligence.",
    icon: Bot,
    color: "",
    link: "/bot",
    category: "dx-platform"
  },
  {
    title: "Operative",
    description: "Framework for AI to operate computers like humans, enabling automation of complex workflows and tasks.",
    icon: Workflow,
    color: "",
    link: "/operative",
    category: "dx-platform"
  },
  {
    title: "Extension",
    description: "AI-powered browser and editor extensions that enhance your development workflow and productivity.",
    icon: ExternalLink,
    color: "",
    link: "/extension",
    category: "dx-platform"
  }
];

// Explore Platform feature
const explorePlatform: Feature = {
  title: "Explore Platform",
  description: "Discover the full potential of the Hanzo AI platform and how it can transform your development workflow.",
  icon: ArrowRight,
  color: "",
  link: "/platform"
};

// Export features and categories
export const features: Feature[] = [
  ...aiCloudFeatures,
  ...dxPlatformFeatures,
  explorePlatform
];

export const aiCloudFeatures_export = aiCloudFeatures;
export const dxPlatformFeatures_export = dxPlatformFeatures;
