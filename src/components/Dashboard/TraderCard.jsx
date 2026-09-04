function TraderCard({ rank, name, points }) {
  return (
    <div className="flex justify-between items-center rounded-2xl bg-[#0B1220] p-5">

      <div>

        <h3 className="text-white font-semibold">
          #{rank} {name}
        </h3>

      </div>

      <span className="text-cyan-400 font-semibold">
        {points}
      </span>

    </div>
  );
}

export default TraderCard;