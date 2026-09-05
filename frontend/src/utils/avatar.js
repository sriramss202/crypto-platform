// =====================================================
// AVATAR UTILITIES
// =====================================================
// Reusable helpers for avatar URL generation and initials.
// No external dependencies — uses DiceBear HTTP API directly.
// =====================================================

/**
 * Generate a deterministic DiceBear avatar URL using the Firebase UID as seed.
 *
 * Uses the "lorelei" style via the DiceBear HTTP API.
 * The same UID always produces the same avatar.
 *
 * @param {string} uid - Firebase user UID
 * @returns {string} DiceBear avatar URL
 */
export const generateDiceBearAvatar = (uid) => {
  if (!uid) return "";
  return `https://api.dicebear.com/10.x/lorelei/svg?seed=${encodeURIComponent(uid)}`;
};

/**
 * Generate 1–2 character initials from a display name or email.
 *
 * Priority:
 *   1. First letter of first word + first letter of second word (e.g. "Sri Ram" → "SR")
 *   2. First letter of a single-word name
 *   3. First letter of the email username
 *   4. Fallback: "U"
 *
 * @param {string} [displayName=""]
 * @param {string} [email=""]
 * @returns {string} Uppercase initials (1–2 chars)
 */
export const generateInitials = (displayName = "", email = "") => {
  // Try display name first
  const name = (displayName || "").trim();

  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);

    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    return parts[0][0].toUpperCase();
  }

  // Try email username
  const emailStr = (email || "").trim();

  if (emailStr) {
    const username = emailStr.split("@")[0] || "";

    if (username.length === 1) {
      return username[0].toUpperCase();
    }

    if (username.length >= 2) {
      return username[0].toUpperCase();
    }
  }

  // Final fallback
  return "U";
};
