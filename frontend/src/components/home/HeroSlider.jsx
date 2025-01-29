import { Link } from "react-router";
import CTAButton from "../ui/buttons/CTAButton";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState } from "react";

const HeroSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className={`absolute left-2 sm:left-5 top-1/2 transform -translate-y-1/2 z-20 
  bg-white text-gray-800 p-2 sm:p-3 md:p-4 px-4 sm:px-5 text-lg sm:text-xl md:text-2xl 
  rounded-full shadow-md hover:bg-orange-400 hover:text-white transition-opacity duration-300 
  ${isHovered ? "opacity-100" : "opacity-10"} 
  sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center`}
      >
        ❮
      </button>
      <button
        ref={nextRef}
        className={`absolute right-2 sm:right-5 top-1/2 transform -translate-y-1/2 z-20 
  bg-white text-gray-800 p-2 sm:p-3 md:p-4 px-4 sm:px-5 text-lg sm:text-xl md:text-2xl 
  rounded-full shadow-md hover:bg-orange-400 hover:text-white transition-opacity duration-300 
  ${isHovered ? "opacity-100" : "opacity-10"} 
  sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center`}
      >
        ❯
      </button>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        className="relative mySwiper"
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        onSwiper={(swiper) => {
          setTimeout(() => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="flex items-center justify-center w-full h-[70vh] bg-cover bg-center relative"
            style={{ backgroundImage: "url('/images/slider-home-01.jpg')" }}
          >
            <section className="container mx-auto">
              <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>
              <div className="w-[90%] sm:w-[80%] md:w-[50%] lg:w-[40%] z-10 px-4 sm:px-8">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-normal mb-6">
                  Shop{" "}
                  <span className="text-green-600 font-semibold">
                    Fresh Fruits & Vegetables
                  </span>{" "}
                  Today
                </h1>
                <p className="text-lg lg:text-xl font-normal mb-8 leading-6">
                  Explore the best of local, organic farm produce, delivered
                  with care to your doorstep.
                </p>
                <Link to="/products">
                  <CTAButton buttonText="Shop Now" />
                </Link>
              </div>
            </section>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="relative flex items-center justify-center w-full h-[70vh] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/slider-home-02.jpg')" }}
          >
            <section className="container mx-auto">
              <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>
              <div className="w-[90%] sm:w-[80%] md:w-[50%] lg:w-[40%] z-10 px-4 sm:px-8">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-normal mb-6">
                  Shop{" "}
                  <span className="text-green-600 font-semibold">
                    Fresh Meats & Sea Foods
                  </span>{" "}
                  Today
                </h1>
                <p className="text-lg lg:text-xl font-normal mb-8">
                  Taste the quality of organic produce delivered straight from
                  the farm to your doorstep.
                </p>
                <Link to="/products">
                  <CTAButton buttonText="Shop Now" />
                </Link>
              </div>
            </section>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="relative flex items-center justify-center w-full h-[70vh] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/slider-home-03.jpg')" }}
          >
            <section className="container mx-auto">
              <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>
              <div className="absolute top-20 right-5 sm:right-10 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] z-10 px-4 sm:px-8">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-normal mb-6 leading-8">
                  Shop{" "}
                  <span className="text-green-600 font-semibold">
                    Fresh Vegetables & Food Sales
                  </span>{" "}
                  30% Off
                </h1>
                <p className="text-lg lg:text-xl font-normal mb-8">
                  Taste the quality of organic produce delivered straight from
                  the farm to your doorstep.
                </p>
                <Link to="/products">
                  <CTAButton buttonText="Shop Now" />
                </Link>
              </div>
            </section>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
