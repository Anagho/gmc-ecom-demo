import "./CTAButton.css";

function CTAButton({ buttonText }) {
  return (
    <button>
      <div className="default-btn">
        <svg
          className="css-i6dzq1"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          strokeWidth="2"
          stroke="#FFF"
          height="20"
          width="20"
          viewBox="0 0 24 24"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle r="3" cy="12" cx="12"></circle>
        </svg>
        <span>{buttonText}</span>
      </div>
      <div className="hover-btn">
        <svg
          className="css-i6dzq1"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          strokeWidth="2"
          stroke="#ffd300"
          height="20"
          width="20"
          viewBox="0 0 24 24"
        >
          <circle r="1" cy="21" cx="9"></circle>
          <circle r="1" cy="21" cx="20"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span>Shop Now</span>
      </div>
    </button>
  );
}

export default CTAButton;
