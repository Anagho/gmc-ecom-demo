import React from "react";
import HeroSlider from "./HeroSlider";

function Hero() {
  return (
    <section className="xl:container xl:mx-auto lg:mt-6 lg:mx-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        <div className="hidden lg:grid bg-gray-100 p-4 rounded-sm">
          Category Box
        </div>

        {/* Slider on the Center - Always Visible */}
        <div className="lg:col-span-3 rounded-md">
          <HeroSlider />
        </div>

        {/* Right Section: Two Stacked Grid Containers (Hidden on Small Screens) */}
        <div className="hidden lg:grid grid-rows-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-sm shadow">Grid Box 1</div>
          <div className="bg-gray-200 p-4 rounded-sm shadow">Grid Box 2</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
