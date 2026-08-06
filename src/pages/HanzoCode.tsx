
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HanzoCodeHero from "@/components/hanzocode/HanzoCodeHero";
import HanzoCodeFeatures from "@/components/hanzocode/HanzoCodeFeatures";
import HanzoCodeBenefits from "@/components/hanzocode/HanzoCodeBenefits";
import HanzoCodeFrontier from "@/components/hanzocode/HanzoCodeFrontier";
import HanzoCodeCTA from "@/components/hanzocode/HanzoCodeCTA";
import HanzoCodeCompatibility from "@/components/hanzocode/HanzoCodeCompatibility";
import HanzoCodeAgents from "@/components/hanzocode/HanzoCodeAgents";

const HanzoCode = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      <main>
        <HanzoCodeHero />
        <HanzoCodeBenefits />
        <HanzoCodeCompatibility />
        <HanzoCodeAgents />
        <HanzoCodeFeatures />
        <HanzoCodeFrontier />
        <HanzoCodeCTA />
      </main>
      <Footer />
    </div>
  );
};

export default HanzoCode;
