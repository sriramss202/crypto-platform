import { useState } from "react";
import { generateInitials } from "../../utils/avatar";

// =====================================================
// AVATAR COMPONENT
// =====================================================
// Reusable circular avatar with image → initials fallback.
//
// Usage:
//   <Avatar user={user} />
//   <Avatar avatarUrl={user.avatarUrl} displayName={user.displayName} email={user.email} />
//   <Avatar user={user} size="sm" />
//   <Avatar user={user} size="lg" />
//
// Priority:
//   1. user.avatarUrl  → render <img>
//   2. Image load error → initials fallback
//   3. No avatarUrl    → initials fallback
//   4. Initials from displayName → email → "U"
// =====================================================

const SIZE_MAP = {
  xs: { container: "h-7 w-7", text: "text-[10px]" },
  sm: { container: "h-9 w-9", text: "text-xs" },
  md: { container: "h-12 w-12", text: "text-sm" },
  lg: { container: "h-16 w-16", text: "text-lg" },
  xl: { container: "h-20 w-20", text: "text-xl" },
};

function Avatar({ user, avatarUrl, displayName, email, size = "md", className = "" }) {
  const [imgError, setImgError] = useState(false);

  const sizeStyles = SIZE_MAP[size] || SIZE_MAP.md;

  const resolvedAvatarUrl = avatarUrl || user?.avatarUrl || user?.photoURL || "";
  const resolvedDisplayName = displayName || user?.displayName || "";
  const resolvedEmail = email || user?.email || "";

  const initials = generateInitials(resolvedDisplayName, resolvedEmail);
  const showImage = resolvedAvatarUrl && !imgError;

  if (showImage) {
    return (
      <img
        src={resolvedAvatarUrl}
        alt="Profile avatar"
        onError={() => setImgError(true)}
        className={`${sizeStyles.container} rounded-full object-cover ring-2 ring-cyan-400/30 ${className}`}
      />
    );
  }

  // Initials fallback
  return (
    <div
      className={`${sizeStyles.container} flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/30 ring-2 ring-cyan-400/30 ${sizeStyles.text} font-bold text-cyan-300 select-none ${className}`}
      aria-label="Profile avatar"
    >
      {initials}
    </div>
  );
}

export default Avatar;
