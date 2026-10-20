import React from 'react';
import PageTransition from '../components/common/PageTransition';
import Hero from '../components/home/Hero';
import ProblemSection from '../components/home/ProblemSection';
import HowItWorks from '../components/home/HowItWorks';
import Features from '../components/home/Features';
import AdvisorPreview from '../components/home/AdvisorPreview';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
  return (
    <PageTransition>
      <div>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <Features />
        <AdvisorPreview />
        <Testimonials />
      </div>
    </PageTransition>
  );
};

export default Home;
