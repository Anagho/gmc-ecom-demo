import { Link } from "react-router";
import CTAButton from "../ui/buttons/CTAButton";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const HeroSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        ref={prevRef}
        className={`absolute left-2 sm:left-5 top-1/2 transform -translate-y-1/2 z-10 
        bg-white/80 text-gray-800 p-2 sm:p-3 md:p-4 text-lg sm:text-xl md:text-2xl 
        rounded-full shadow-md hover:bg-green-600 hover:text-white transition-opacity duration-300 
        ${
          isHovered ? "opacity-100" : "opacity-10"
        } w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center`}
      >
        ❮
      </button>
      <button
        ref={nextRef}
        className={`absolute right-2 sm:right-5 top-1/2 transform -translate-y-1/2 z-10 
        bg-white/80 text-gray-800 p-2 sm:p-3 md:p-4 text-lg sm:text-xl md:text-2xl 
        rounded-full shadow-md hover:bg-green-600 hover:text-white transition-opacity duration-300 
        ${
          isHovered ? "opacity-100" : "opacity-10"
        } w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center`}
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
        speed={1500}
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
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
      >
        {[
          {
            id: 1,
            image: "/images/slider-home-01.jpg",
            title: "Fruits & Vegetables",
            preText: "Shop",
            postText: "Now",
          },
          {
            id: 2,
            image: "/images/slider-home-02.jpg",
            title: "Fresh Eggs & Fishes",
            preText: "Shop",
            postText: "Today",
          },
          {
            id: 3,
            image: "/images/slider-home-03.jpg",
            title: "Food Sales 30% Off",
            preText: "Get",
            postText: "Today",
          },
        ].map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[55vh] xl:h-[60vh] rounded-md bg-no-repeat bg-cover bg-center z-0 tablet-slider-height max-w-[320px]:h-[60vh]"
              style={{ backgroundImage: `url('${slide.image}')` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60 rounded-sm"></div>

              <div className="flex flex-col md:gap-4 items-center justify-center h-full text-center p-4 sm:p-6 md:p-8 lg:p-12 ">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: activeSlide === slide.id - 1 ? 1 : 0,
                    x: activeSlide === slide.id - 1 ? 0 : -50,
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                  className="text-white/80 font-semibold leading-6 md:leading-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl  mb-4 max-w-[90%] text-shadow z-10"
                >
                  {slide.preText}{" "}
                  <span className="text-green-400 px-1">{slide.title}</span>{" "}
                  {slide.postText}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: activeSlide === slide.id - 1 ? 1 : 0,
                    x: activeSlide === slide.id - 1 ? 0 : 50,
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                  className="text-white/90 text-base md:text-lg lg:text-xl font-light leading-6 sm:leading-7 md:leading-10 mb-6 text-shadow max-w-[90%] sm:max-w-[70%] z-10"
                >
                  Taste the quality of organic produce delivered straight from
                  the farm to your doorstep.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: activeSlide === slide.id - 1 ? 1 : 0,
                    y: activeSlide === slide.id - 1 ? 0 : 50,
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                  className="z-10"
                >
                  <Link to="/products">
                    <CTAButton buttonText="Shop Now" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
