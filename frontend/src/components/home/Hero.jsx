import React from "react";
import HeroSlider from "./HeroSlider";

function Hero() {
  return (
    <section className="container mx-auto md:px-2 md:mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Slider on the Left - Always Visible */}
        <div className="md:col-span-2">
          <HeroSlider />
        </div>

        {/* Right Section: Two Stacked Grid Containers (Hidden on Small Screens) */}
        <div className="hidden md:grid grid-rows-2 gap-4">
          <div className="bg-gray-100 p-4">Grid Box 1</div>
          <div className="bg-gray-200 p-4">Grid Box 2</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
