import React from "react";
import Hero from "../components/home/Hero";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

function HomePage() {
  return (
    <section>
      {/* Only show in small screens */}
      <motion.div
        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center p-1 lg:hidden"
        initial={{ opacity: 1 }}
        animate={{
          // opacity: [0.6, 0.8, 0.9, 0.85, 1], // Flickering effect
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        <h3 className="text-base font-normal">
          <TypeAnimation
            sequence={[
              "Call 0810XXXXXX to ORDER",
              4000,
              "🚚 We Deliver Nationwide",
              4000,
              "Get food products delivered to you",
              4000,
            ]}
            wrapper="span"
            speed={150}
            repeat={Infinity}
          />
        </h3>
      </motion.div>
      <Hero />
    </section>
  );
}

export default HomePage;
