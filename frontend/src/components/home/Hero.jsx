import { Link } from "react-router";
import CTAButton from "../ui/buttons/CTAButton";

function Hero() {
  return (
    <section className="container mx-auto flex flex-col lg:flex-row items-center justify-center py-24 lg:py-15 gap-8 p-4">
      <div className="max-w-[500px]">
        <h1 className="text-3xl lg:6xl text-slate-800 font-semibold mb-4">
          Fresh From the Farm to Your Doorstep
        </h1>
        <p className="text-lg font-light text-gray-500 mb-5">
          Explore the best of local, organic farm   produce, delivered with care to your doorstep
        </p>
        <Link to={"/products"}>
          <CTAButton buttonText="Quick View" />
        </Link>
      </div>
      <div>
        <img className="w-[800px]" src="/images/hero.png" alt="hero-banner" />
      </div>
    </section>
  );
}

export default Hero;
