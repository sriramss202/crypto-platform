import avatar1 from "../../../assert/avatar1.jpg";
import avatar2 from "../../../assert/avatar2.jpg";
import avatar3 from "../../../assert/avatar3.jpg";

function TrustedUsers() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3">
      <div className="flex -space-x-2">
        <img
          src={avatar1}
          alt="Investor 1"
          className="w-10 h-10 rounded-full object-cover border-2 border-[#050816]"
        />
        <img
          src={avatar2}
          alt="Investor 2"
          className="w-10 h-10 rounded-full object-cover border-2 border-[#050816]"
        />
        <img
          src={avatar3}
          alt="Investor 3"
          className="w-10 h-10 rounded-full object-cover border-2 border-[#050816]"
        />
      </div>

      <span className="text-white">
        Trusted by <strong>120,000+</strong> Investors
      </span>
    </div>
  );
}

export default TrustedUsers;