import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Search,
  Zap,
  MessageSquare,
  Database,
  Cloud,
  Users,
  ShoppingCart,
  BarChart3,
  Mail,
  Calendar,
  FileText,
  Code,
  Bot,
  Palette,
  Share2,
  CreditCard,
  Phone,
  Video,
  Globe,
  ExternalLink,
} from "lucide-react";

const BRAND_COLOR = "#fd4444";

// Integration categories
const categories = [
  { id: "all", name: "All", icon: Zap },
  { id: "ai", name: "AI & LLMs", icon: Bot },
  { id: "communication", name: "Communication", icon: MessageSquare },
  { id: "productivity", name: "Productivity", icon: FileText },
  { id: "data", name: "Data & Storage", icon: Database },
  { id: "crm", name: "CRM & Sales", icon: Users },
  { id: "commerce", name: "Commerce", icon: ShoppingCart },
  { id: "marketing", name: "Marketing", icon: Mail },
  { id: "developer", name: "Developer Tools", icon: Code },
  { id: "social", name: "Social Media", icon: Share2 },
];

// Featured integrations with icons and colors
const integrations = [
  // AI & LLMs
  { name: "OpenAI", category: "ai", icon: "🤖", color: "#10a37f", popular: true },
  { name: "Anthropic Claude", category: "ai", icon: "🧠", color: "#cc785c", popular: true },
  { name: "Google Gemini", category: "ai", icon: "✨", color: "#4285f4", popular: true },
  { name: "Azure OpenAI", category: "ai", icon: "☁️", color: "#0078d4" },
  { name: "Hugging Face", category: "ai", icon: "🤗", color: "#ff9d00" },
  { name: "Replicate", category: "ai", icon: "🔄", color: "#000000" },
  { name: "Stability AI", category: "ai", icon: "🎨", color: "#9333ea" },
  { name: "ElevenLabs", category: "ai", icon: "🔊", color: "#000000" },
  { name: "Deepgram", category: "ai", icon: "🎙️", color: "#13ef93" },

  // Communication
  { name: "Slack", category: "communication", icon: "💬", color: "#4A154B", popular: true },
  { name: "Discord", category: "communication", icon: "🎮", color: "#5865F2", popular: true },
  { name: "Telegram", category: "communication", icon: "✈️", color: "#0088cc" },
  { name: "WhatsApp", category: "communication", icon: "📱", color: "#25D366", popular: true },
  { name: "Microsoft Teams", category: "communication", icon: "👥", color: "#6264A7" },
  { name: "Twilio", category: "communication", icon: "📞", color: "#F22F46" },
  { name: "Zoom", category: "communication", icon: "📹", color: "#2D8CFF" },
  { name: "Google Chat", category: "communication", icon: "💭", color: "#00AC47" },

  // Productivity
  { name: "Notion", category: "productivity", icon: "📝", color: "#000000", popular: true },
  { name: "Airtable", category: "productivity", icon: "📊", color: "#18BFFF", popular: true },
  { name: "Google Sheets", category: "productivity", icon: "📗", color: "#34A853", popular: true },
  { name: "Google Docs", category: "productivity", icon: "📄", color: "#4285F4" },
  { name: "Google Drive", category: "productivity", icon: "📁", color: "#4285F4", popular: true },
  { name: "Dropbox", category: "productivity", icon: "📦", color: "#0061FF" },
  { name: "Calendly", category: "productivity", icon: "📅", color: "#006BFF" },
  { name: "Google Calendar", category: "productivity", icon: "🗓️", color: "#4285F4" },
  { name: "Trello", category: "productivity", icon: "📋", color: "#0079BF" },
  { name: "Asana", category: "productivity", icon: "✅", color: "#F06A6A" },
  { name: "ClickUp", category: "productivity", icon: "🎯", color: "#7B68EE" },
  { name: "Linear", category: "productivity", icon: "📐", color: "#5E6AD2", popular: true },
  { name: "Jira", category: "productivity", icon: "🔷", color: "#0052CC" },

  // Data & Storage
  { name: "PostgreSQL", category: "data", icon: "🐘", color: "#336791" },
  { name: "MySQL", category: "data", icon: "🐬", color: "#4479A1" },
  { name: "MongoDB", category: "data", icon: "🍃", color: "#47A248" },
  { name: "Redis", category: "data", icon: "🔴", color: "#DC382D" },
  { name: "Supabase", category: "data", icon: "⚡", color: "#3ECF8E" },
  { name: "Firebase", category: "data", icon: "🔥", color: "#FFCA28" },
  { name: "AWS S3", category: "data", icon: "☁️", color: "#FF9900" },
  { name: "Google Cloud Storage", category: "data", icon: "☁️", color: "#4285F4" },
  { name: "Snowflake", category: "data", icon: "❄️", color: "#29B5E8" },
  { name: "BigQuery", category: "data", icon: "📊", color: "#4285F4" },

  // CRM & Sales
  { name: "Salesforce", category: "crm", icon: "☁️", color: "#00A1E0", popular: true },
  { name: "HubSpot", category: "crm", icon: "🧡", color: "#FF7A59", popular: true },
  { name: "Pipedrive", category: "crm", icon: "📈", color: "#1A1B1D" },
  { name: "Close", category: "crm", icon: "📞", color: "#252A3D" },
  { name: "Intercom", category: "crm", icon: "💬", color: "#1F8DED" },
  { name: "Zendesk", category: "crm", icon: "🎧", color: "#03363D" },
  { name: "Freshdesk", category: "crm", icon: "🎫", color: "#2C9F5B" },
  { name: "Apollo", category: "crm", icon: "🚀", color: "#5C5CFF" },

  // Commerce
  { name: "Square", category: "commerce", icon: "💳", color: "#635BFF", popular: true },
  { name: "Shopify", category: "commerce", icon: "🛒", color: "#96BF48", popular: true },
  { name: "WooCommerce", category: "commerce", icon: "🛍️", color: "#96588A" },
  { name: "Square", category: "commerce", icon: "⬜", color: "#3E4348" },
  { name: "PayPal", category: "commerce", icon: "💰", color: "#003087" },
  { name: "Chargebee", category: "commerce", icon: "💵", color: "#FF6B35" },
  { name: "Paddle", category: "commerce", icon: "🏓", color: "#3F3F46" },
  { name: "LemonSqueezy", category: "commerce", icon: "🍋", color: "#FFC107" },

  // Marketing
  { name: "Mailchimp", category: "marketing", icon: "🐵", color: "#FFE01B", popular: true },
  { name: "SendGrid", category: "marketing", icon: "📧", color: "#1A82E2" },
  { name: "Resend", category: "marketing", icon: "✉️", color: "#000000" },
  { name: "ConvertKit", category: "marketing", icon: "📬", color: "#FB6970" },
  { name: "ActiveCampaign", category: "marketing", icon: "📊", color: "#356AE6" },
  { name: "Brevo", category: "marketing", icon: "📨", color: "#0092FF" },
  { name: "Customer.io", category: "marketing", icon: "👤", color: "#4EC4FA" },
  { name: "Postmark", category: "marketing", icon: "📮", color: "#FFDE00" },

  // Developer Tools
  { name: "GitHub", category: "developer", icon: "🐙", color: "#181717", popular: true },
  { name: "GitLab", category: "developer", icon: "🦊", color: "#FC6D26" },
  { name: "Vercel", category: "developer", icon: "▲", color: "#000000" },
  { name: "Netlify", category: "developer", icon: "🌐", color: "#00C7B7" },
  { name: "Railway", category: "developer", icon: "🚂", color: "#0B0D0E" },
  { name: "Render", category: "developer", icon: "🎨", color: "#46E3B7" },
  { name: "Sentry", category: "developer", icon: "🐛", color: "#362D59" },
  { name: "PagerDuty", category: "developer", icon: "🚨", color: "#06AC38" },
  { name: "Datadog", category: "developer", icon: "🐕", color: "#632CA6" },

  // Social Media
  { name: "Twitter / X", category: "social", icon: "𝕏", color: "#000000" },
  { name: "LinkedIn", category: "social", icon: "🔗", color: "#0A66C2", popular: true },
  { name: "Instagram", category: "social", icon: "📸", color: "#E4405F" },
  { name: "Facebook", category: "social", icon: "📘", color: "#1877F2" },
  { name: "TikTok", category: "social", icon: "🎵", color: "#000000" },
  { name: "YouTube", category: "social", icon: "▶️", color: "#FF0000" },
  { name: "Pinterest", category: "social", icon: "📌", color: "#E60023" },
  { name: "Bluesky", category: "social", icon: "🦋", color: "#0085FF" },
];

const Automations = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory = activeCategory === "all" || integration.category === activeCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularIntegrations = integrations.filter((i) => i.popular);

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="hz-rel hz-pt-8 hz-pb-8 hz-px-4 hz-clip">
          {/* Background glow */}
          <div className="hz-abs hz-inset hz-clip">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 1.5 }}
              className="hz-center-xy hz-abs hz-r-full"
              style={{
                background: `radial-gradient(circle, ${BRAND_COLOR} 0%, transparent 70%)`,
                filter: "blur(100px)",
              }}
            />
          </div>

          <div className="hz-container-wide hz-rel hz-z-raised">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hz-align-center hz-mb-7"
            >
              <p
                className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-mb-5"
                style={{ color: BRAND_COLOR, borderColor: `${BRAND_COLOR}4d` }}
              >
                Integrations & Automation
              </p>
              <h1 className="hz-t-4xl hz-w-medium hz-mb-5">
                <span className="hz-fg">Connect with</span>{" "}
                <span style={{ color: BRAND_COLOR }}>500+ apps</span>
              </h1>
              <p className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-muted hz-mb-6">
                Hanzo Automations connects your AI agents to the tools you use every day. Build powerful workflows without code.
              </p>

              {/* Search */}
              <div className="hz-container-narrow hz-mw-sm hz-rel">
                <Search className="hz-center-y hz-sq-3 hz-abs hz-fg-muted" />
                <input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="hz-w-full hz-px-6 hz-px-4 hz-py-3 hz-r-full hz-bg-surface hz-bordered hz-fg hz-transition"
                />
              </div>
            </motion.div>

            {/* Popular Integrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hz-mb-7"
            >
              <h2 className="hz-t-sm hz-w-medium hz-fg-muted hz-upper hz-tracking-wide hz-mb-4 hz-align-center">
                Popular Integrations
              </h2>
              <div className="hz-row hz-wrap hz-jc-center hz-gap-3">
                {popularIntegrations.slice(0, 12).map((integration) => (
                  <motion.a
                    key={integration.name}
                    href={`#${integration.name.toLowerCase().replace(/\s+/g, "-")}`}
                    whileHover={{ scale: 1.05 }}
                    className="hz-btn hz-gap-2 hz-transition"
                  >
                    <span className="hz-t-lg">{integration.icon}</span>
                    <span className="hz-t-sm hz-fg">{integration.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="hz-py-6 hz-px-4 hz-bordered hz-bg-surface hz-sticky hz-z-raised">
          <div className="hz-container-wide">
            <div className="hz-row hz-gap-2 hz-scroll-x hz-pb-4">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`hz-btn hz-btn-ghost hz-gap-2 hz-transition ${
                      isActive
                        ? "hz-bg-surface hz-fg"
                        : "hz-bg-surface hz-fg-muted hz-link"
                    }`}
                  >
                    <Icon className="hz-sq-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Integrations Grid */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <div className="hz-row hz-ai-center hz-jc-between hz-mb-6">
              <h2 className="hz-t-2xl hz-w-medium hz-fg">
                {activeCategory === "all"
                  ? "All Integrations"
                  : categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <span className="hz-t-sm hz-fg-muted">
                {filteredIntegrations.length} integrations
              </span>
            </div>

            <div className="hz-grid hz-grid-5 hz-gap-4">
              {filteredIntegrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="hz-card hz-transition hz-pointer hz-card-interactive"
                >
                  <div
                    className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-t-2xl hz-mb-3"
                    style={{ backgroundColor: integration.color + "20" }}
                  >
                    {integration.icon}
                  </div>
                  <h3 className="hz-t-sm hz-w-medium hz-fg hz-transition hz-hoverable">
                    {integration.name}
                  </h3>
                  {integration.popular && (
                    <span className="hz-t-xs hz-fg-soft hz-w-medium">Popular</span>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredIntegrations.length === 0 && (
              <div className="hz-align-center hz-py-7">
                <p className="hz-fg-muted">No integrations found matching your search.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="hz-py-7 hz-px-4 hz-border-t">
          <div className="hz-container-narrow hz-align-center">
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              Don't see your app?
            </h2>
            <p className="hz-t-lg hz-fg-muted hz-mb-6">
              We add new integrations every week. Request an integration or build your own with our SDK.
            </p>
            <div className="hz-col-row hz-ai-center hz-jc-center hz-gap-4">
              <Link
                to="/contact"
                className="hz-btn hz-btn-ghost hz-transition"
                style={{ backgroundColor: BRAND_COLOR, color: "#ffffff" }}
              >
                Request Integration
                <ArrowRight className="hz-sq-2 hz-ml-2" />
              </Link>
              <a
                href="https://docs.hanzo.ai/automations/sdk"
                target="_blank"
                rel="noreferrer noopener"
                className="hz-btn hz-btn-ghost hz-transition hz-fg"
              >
                Build Custom Integration
                <ExternalLink className="hz-sq-2 hz-ml-2" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Automations;
