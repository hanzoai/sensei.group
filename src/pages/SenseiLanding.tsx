import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Briefcase, Globe, Clock, Award, Handshake, Sparkles } from "lucide-react";
import { Button } from "@hanzo/ui";

const categories = [
  { icon: "💻", name: "Engineering", count: "500+" },
  { icon: "🎨", name: "Design", count: "200+" },
  { icon: "📊", name: "Product", count: "150+" },
  { icon: "📈", name: "Marketing", count: "180+" },
  { icon: "🔬", name: "AI/ML", count: "300+" },
  { icon: "🏗️", name: "Architecture", count: "100+" },
];

const SenseiLanding = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      {/* Hero */}
      <section className="hz-rel hz-min-h-screen hz-row hz-ai-center hz-jc-center hz-clip">
        <div className="hz-abs hz-inset" />
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg" />
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg" />

        <div className="hz-rel hz-z-raised hz-container hz-mx-auto hz-px-5 hz-align-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hz-btn hz-gap-2 hz-fg-muted hz-mb-6">
              <Users className="hz-sq-2" />
              Fractional Talent Network
            </div>

            <h1 className="hz-t-5xl hz-w-bold hz-mb-5 hz-chrome">
              World-Class Talent.
              <br />
              On Demand.
            </h1>

            <p className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-muted hz-mb-6 hz-leading-relaxed">
              Connect with elite fractional executives, engineers, and creators.
              Scale your team with the best, exactly when you need them.
            </p>

            <div className="hz-col-row hz-gap-4 hz-jc-center hz-mb-7">
              <Button size="lg" className="hz-fg-inverse hz-w-semibold hz-px-6">
                Hire Talent
                <ArrowRight className="hz-sq-2 hz-ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="hz-hoverable">
                Apply as Talent
              </Button>
            </div>

            {/* Stats */}
            <div className="hz-grid hz-grid-3 hz-container-narrow hz-mw-md hz-gap-6">
              <div>
                <div className="hz-t-3xl hz-w-bold hz-fg-muted">1,500+</div>
                <div className="hz-t-sm hz-fg-muted">Elite Professionals</div>
              </div>
              <div>
                <div className="hz-t-3xl hz-w-bold hz-fg-muted">48hrs</div>
                <div className="hz-t-sm hz-fg-muted">Avg. Match Time</div>
              </div>
              <div>
                <div className="hz-t-3xl hz-w-bold hz-fg-muted">95%</div>
                <div className="hz-t-sm hz-fg-muted">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="hz-py-7 hz-bg-surface">
        <div className="hz-container hz-mx-auto hz-px-5">
          <div className="hz-align-center hz-mb-7">
            <h2 className="hz-t-4xl hz-w-bold hz-mb-4">Find Your Expert</h2>
            <p className="hz-fg-muted">Pre-vetted professionals across every discipline</p>
          </div>

          <div className="hz-grid hz-grid-6 hz-gap-4">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="hz-card hz-transition hz-align-center hz-pointer hz-card-interactive"
              >
                <div className="hz-t-3xl hz-mb-2">{cat.icon}</div>
                <div className="hz-w-semibold hz-mb-1 hz-transition hz-hoverable">{cat.name}</div>
                <div className="hz-t-xs hz-fg-muted">{cat.count} experts</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="hz-py-7">
        <div className="hz-container hz-mx-auto hz-px-5">
          <div className="hz-align-center hz-mb-7">
            <h2 className="hz-t-4xl hz-w-bold hz-mb-4">How Sensei Works</h2>
            <p className="hz-fg-muted">From request to results in days, not months</p>
          </div>

          <div className="hz-grid hz-grid-4 hz-container-wide hz-gap-6">
            {[
              { icon: Briefcase, title: "Share Your Needs", description: "Tell us what you're looking for" },
              { icon: Sparkles, title: "AI Matching", description: "Our AI finds perfect matches" },
              { icon: Handshake, title: "Meet & Interview", description: "Connect with vetted candidates" },
              { icon: Award, title: "Start Working", description: "Onboard and scale your team" },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hz-align-center"
              >
                <div className="hz-rel">
                  <div className="hz-sq-8 hz-r-full hz-row hz-ai-center hz-jc-center hz-mx-auto hz-mb-4">
                    <step.icon className="hz-sq-5 hz-fg-muted" />
                  </div>
                  {index < 3 && (
                    <div className="hz-desktop-only hz-abs hz-w-full" />
                  )}
                </div>
                <h3 className="hz-w-semibold hz-mb-2">{step.title}</h3>
                <p className="hz-t-sm hz-fg-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hz-py-7">
        <div className="hz-container hz-mx-auto hz-px-5 hz-align-center">
          <h2 className="hz-t-4xl hz-w-bold hz-mb-4">Ready to Level Up?</h2>
          <p className="hz-container-narrow hz-mw-md hz-fg-muted hz-mb-6">
            Whether you need talent or want to join our network, we're here to help.
          </p>
          <div className="hz-col-row hz-gap-4 hz-jc-center">
            <Button size="lg" className="hz-fg-inverse hz-w-semibold hz-px-6">
              Find Talent
            </Button>
            <Button size="lg" variant="outline" className="hz-hoverable">
              Join the Network
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SenseiLanding;
