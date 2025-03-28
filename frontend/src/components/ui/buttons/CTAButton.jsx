import { motion } from "framer-motion";

function CTAButton({ buttonText }) {
  return (
    <motion.button
      className="p-2 text-sm sm:text-base bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold  rounded-lg shadow-sm hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
    >
      {buttonText}
    </motion.button>
  );
}

export default CTAButton;
