function FeatureCard({ icon, title, description }) {
  return (
    <div
      className="
      group
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-8
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-cyan-400/50
      hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]
      "
    >
      {/* Icon */}

      <div
        className="
        w-16
        h-16
        rounded-2xl
        bg-cyan-500/10
        flex
        items-center
        justify-center
        text-cyan-400
        text-3xl
        group-hover:scale-110
        transition-all
        "
      >
        {icon}
      </div>

      {/* Title */  }

      <h2 className="mt-6 text-2xl font-bold text-white">
        {title}
      </h2>

      {/* Description */}

      <p className="mt-4 text-gray-400 leading-7">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;