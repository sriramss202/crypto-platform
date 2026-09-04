function RewardButton({ text, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-xl px-6 py-3 font-semibold transition-all duration-300
        ${
          disabled
            ? "cursor-not-allowed bg-gray-700 text-gray-400"
            : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95"
        }
      `}
    >
      {text}
    </button>
  );
}

export default RewardButton;