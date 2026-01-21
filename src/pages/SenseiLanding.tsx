import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Briefcase, Star, Globe, Clock, Award, Handshake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { icon: "💻", name: "Engineering", count: "500+" },
  { icon: "🎨", name: "Design", count: "200+" },
  { icon: "📊", name: "Product", count: "150+" },
  { icon: "📈", name: "Marketing", count: "180+" },
  { icon: "🔬", name: "AI/ML", count: "300+" },
  { icon: "🏗️", name: "Architecture", count: "100+" },
];

const testimonials = [
  {
    quote: "Found our CTO through Sensei. Best decision we made.",
    author: "Sarah Chen",
    role: "CEO, TechStartup",
  },
  {
    quote: "The quality of talent is exceptional. Game changer for our team.",
    author: "Marcus Rodriguez",
    role: "VP Engineering, ScaleUp",
  },
];

const SenseiLanding = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-orange-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-8">
              <Users className="w-4 h-4" />
              Fractional Talent Network
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
              World-Class Talent.
              <br />
              On Demand.
            </h1>

            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Connect with elite fractional executives, engineers, and creators.
              Scale your team with the best, exactly when you need them.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold px-8">
                Hire Talent
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-neutral-700 hover:bg-neutral-800">
                Apply as Talent
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-amber-400">1,500+</div>
                <div className="text-sm text-neutral-500">Elite Professionals</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">48hrs</div>
                <div className="text-sm text-neutral-500">Avg. Match Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">95%</div>
                <div className="text-sm text-neutral-500">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Find Your Expert</h2>
            <p className="text-neutral-400">Pre-vetted professionals across every discipline</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-amber-500/50 transition-colors text-center cursor-pointer group"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-semibold mb-1 group-hover:text-amber-400 transition-colors">{cat.name}</div>
                <div className="text-xs text-neutral-500">{cat.count} experts</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Sensei Works</h2>
            <p className="text-neutral-400">From request to results in days, not months</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
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
                className="text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-amber-400" />
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-amber-500/50 to-transparent" />
                  )}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-4 italic">"{t.quote}"</p>
                <div>
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-sm text-neutral-400">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-8">
            Whether you need talent or want to join our network, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold px-8">
              Find Talent
            </Button>
            <Button size="lg" variant="outline" className="border-neutral-700 hover:bg-neutral-800">
              Join the Network
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SenseiLanding;
