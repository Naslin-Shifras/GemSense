import React from 'react';
import { motion } from 'framer-motion';
import {
  Gem,
  BrainCircuit,
  ChartColumnIncreasing,
  MessageCircleMore
} from 'lucide-react';

const steps = [
  {
    num: "1",
    title: "Enter Gem Details",
    desc: "Provide details like Type, Color, Clarity, Carat, Cut and Treatment.",
    icon: Gem,
  },
  {
    num: "2",
    title: "AI Analyzes Data",
    desc: "Our AI analyzes 500+ real market data points and expert knowledge.",
    icon: BrainCircuit,
  },
  {
    num: "3",
    title: "Get Price Prediction",
    desc: "Receive a fair price range with insights on market trends.",
    icon: ChartColumnIncreasing,
  },
  {
    num: "4",
    title: "Ask AI Advisor",
    desc: "Chat with our AI expert for personalized advice anytime.",
    icon: MessageCircleMore,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold mb-3 text-white">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-purple">
              Gem Sense AI
            </span>{" "}
            Works
          </h2>

          <p className="text-brand-muted text-sm md:text-base">
            Simple steps to get AI-powered gem price prediction and expert advice.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-10 md:gap-4 lg:gap-6 w-full">

          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <React.Fragment key={i}>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative w-[220px] sm:w-[230px] md:w-auto md:flex-1"
                >
                  {/* Number */}
                  <div className="absolute -top-4 -left-3 z-20 w-9 h-9 rounded-full bg-brand-purple flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {step.num}
                  </div>

                  <div
                    className="
                      min-h-[200px]
                      rounded-2xl
                      border
                      border-brand-border
                      bg-brand-bg-card/80
                      backdrop-blur-sm
                      px-5
                      py-6
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-center
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-brand-purple/50
                      hover:shadow-[0_0_30px_rgba(124,58,237,0.12)]
                    "
                  >
                    {/* Icon */}
                    <Icon
                      className="w-14 h-14 text-brand-purple mb-5"
                      strokeWidth={1.5}
                    />

                    <h3 className="text-white font-semibold text-base mb-2">
                      {step.title}
                    </h3>

                    <p className="text-brand-muted text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Mobile arrow - Top to Bottom */}
                {i < steps.length - 1 && (
                  <div className="flex md:hidden flex-col items-center -my-1">
                    <div className="h-8 border-l-2 border-dotted border-brand-purple/50" />
                    <div
                      className="
                        w-0
                        h-0
                        border-l-[5px]
                        border-l-transparent
                        border-r-[5px]
                        border-r-transparent
                        border-t-[7px]
                        border-t-brand-purple
                      "
                    />
                  </div>
                )}

                {/* Desktop arrow - Left to Right */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center w-10 lg:w-14 flex-shrink-0">
                    <div className="flex-1 border-t-2 border-dotted border-brand-purple/50" />
                    <div
                      className="
                        w-0
                        h-0
                        border-t-[5px]
                        border-t-transparent
                        border-b-[5px]
                        border-b-transparent
                        border-l-[7px]
                        border-l-brand-purple
                      "
                    />
                  </div>
                )}

              </React.Fragment>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;