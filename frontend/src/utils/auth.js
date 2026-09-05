import { adminCredentials } from "../config/adminConfig";

const SESSION_KEY = "loggedUser";

// =====================================================
// SAVE USER SESSION (localStorage is only for session copy)
// =====================================================

export const setUserSession = (user) => {
  if (!user) return;

  const sessionUser = {
    uid: user.uid || "",
    displayName: user.displayName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    avatarUrl: user.avatarUrl || user.photoURL || "",
    avatarType: user.avatarType || "",
    photoURL: user.photoURL || "",
    provider: user.provider || "",
    role: user.role || "user",
    isEmailVerified: user.isEmailVerified || false,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
};

// =====================================================
// GET CURRENT SESSION
// =====================================================

export const getCurrentUser = () => {
  const storedUser = localStorage.getItem(SESSION_KEY);
  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

// =====================================================
// CHECK AUTHENTICATION
// =====================================================

export const isAuthenticated = () => {
  return !!localStorage.getItem(SESSION_KEY);
};

// =====================================================
// CLEAR SESSION
// =====================================================

export const clearUserSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

// =====================================================
// LOGOUT SESSION
// =====================================================

export const logout = () => {
  clearUserSession();
};

// =====================================================
// UPDATE SESSION
// =====================================================

export const updateUserSession = (updates) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const updatedUser = {
    ...currentUser,
    ...updates,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
};

// =====================================================
// LOGIN ADMIN (Prototype flow using adminCredentials)
// =====================================================

export const loginAdmin = (email, password) => {
  if (
    email.toLowerCase() === adminCredentials.email.toLowerCase() &&
    password === adminCredentials.password
  ) {
    const adminUser = {
      uid: "admin",
      email: adminCredentials.email,
      role: "admin",
      provider: "admin",
      isEmailVerified: true,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(adminUser));

    return {
      success: true,
      user: adminUser,
      message: "Admin login successful.",
    };
  }

  return {
    success: false,
    user: null,
    message: "Invalid admin email or password.",
  };
};