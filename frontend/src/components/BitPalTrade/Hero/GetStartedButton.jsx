import { useNavigate } from "react-router-dom";

function GetStartedButton() {
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    if (e) e.preventDefault();
    navigate("/app/rewards");
  };

  return (
    <button
      type="button"
      onClick={handleGetStarted}
      className="rounded-xl bg-cyan-500 px-8 py-3.5 font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
    >
      Get Started
    </button>
  );
}

export default GetStartedButton;