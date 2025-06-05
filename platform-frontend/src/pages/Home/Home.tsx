import React from "react";
import Navbar from "./elements/Navbar";
import Hero from "./elements/Hero";
import Features from "./elements/Features";
import Preview from "./elements/Preview";
import CTA from "./elements/CTA";
import Footer from "./elements/Footer";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Preview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
