
function CTAButton({ buttonText }) {
  return (
    <button className="bg-orange-400 text-gray-900 font-medium text-xl rounded-md shadow px-4 py-3 hover:bg-transparent border hover:border-green-600 duration-300">
     {buttonText}
    </button>
  );
}

export default CTAButton;
