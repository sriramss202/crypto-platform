import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";

import { auth, db } from "./firebase";
import { generateDiceBearAvatar } from "../utils/avatar";

// =====================================================
// GOOGLE PROVIDER
// =====================================================

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// =====================================================
// CREATE OR GET USER PROFILE (Firestore & Avatar)
// =====================================================

export const createOrGetUserProfile = async (firebaseUser, extraData = {}) => {
  if (!firebaseUser) return null;

  const uid = firebaseUser.uid;
  const userRef = doc(db, "users", uid);

  let existingProfile = null;
  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      existingProfile = userSnap.data();
    }    
  } catch (error) {
    console.warn("Firestore read warning:", error);
  }

  if (existingProfile) {
    const isLegacyGooglePhoto =
      existingProfile.avatarType === "google_photo" ||
      existingProfile.avatarType === "google" ||
      (existingProfile.photoURL &&
        existingProfile.avatarUrl === existingProfile.photoURL);
    let avatarUrl = isLegacyGooglePhoto ? "" : existingProfile.avatarUrl || "";
    let avatarType = isLegacyGooglePhoto
      ? ""
      : existingProfile.avatarType || "";

    if (!avatarUrl) {
      avatarUrl = generateDiceBearAvatar(uid);
      avatarType = "dicebear";

      try {
        await setDoc(userRef, { avatarUrl, avatarType }, { merge: true });
      } catch (err) {
        console.warn("Failed to update avatar in Firestore:", err);
      }
    }

    try {
      await setDoc(
        userRef,
        {
          lastLogin: serverTimestamp(),
          loginCount: increment(1),
        },
        { merge: true }
      );
    } catch (err) {
      console.warn("Failed to update login stats in Firestore:", err);
    }

    return {
      uid: uid,
      displayName:
        existingProfile.displayName ||
        firebaseUser.displayName ||
        firebaseUser.email?.split("@")[0] ||
        "User",
      email: existingProfile.email || firebaseUser.email || "",
      phoneNumber: existingProfile.phoneNumber || firebaseUser.phoneNumber || extraData.phoneNumber || "",
      avatarUrl: avatarUrl,
      avatarType: avatarType,
      provider: existingProfile.provider || extraData.provider || "email",
      role: existingProfile.role || "user",
      isEmailVerified: firebaseUser.emailVerified || false,
    };
  }

  // Profile does not exist - Create profile
  let avatarUrl = "";
  let avatarType = "";

  avatarUrl = generateDiceBearAvatar(uid);
  avatarType = "dicebear";

  const displayName =
    firebaseUser.displayName ||
    (firebaseUser.email ? firebaseUser.email.split("@")[0] : "User");

  const provider =
    extraData.provider ||
    (firebaseUser.providerData?.[0]?.providerId === "google.com" ? "google" : "email");

  const newProfile = {
    uid: uid,
    displayName: displayName,
    email: firebaseUser.email || "",
    phoneNumber: extraData.phoneNumber || firebaseUser.phoneNumber || "",
    photoURL: firebaseUser.photoURL || "",
    avatarUrl: avatarUrl,
    avatarType: avatarType,
    provider: provider,
    role: "user",
    isEmailVerified: firebaseUser.emailVerified || false,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
    loginCount: 1,
  };

  try {
    await setDoc(userRef, newProfile, { merge: true });
  } catch (error) {
    console.warn("Firestore profile creation warning:", error);
  }

  return {
    uid: uid,
    displayName: displayName,
    email: firebaseUser.email || "",
    phoneNumber: newProfile.phoneNumber,
    avatarUrl: avatarUrl,
    avatarType: avatarType,
    provider: provider,
    role: "user",
    isEmailVerified: firebaseUser.emailVerified || false,
  };
};

// =====================================================
// GOOGLE LOGIN
// =====================================================

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    console.log("Google login successful:", firebaseUser);

    const sessionUser = await createOrGetUserProfile(firebaseUser, {
      provider: "google",
    });

    return {
      success: true,
      user: sessionUser,
      message: "Google login successful.",
    };
  } catch (error) {
    console.error("Google login error:", error);

    let message = "Unable to connect your Google account.";

    switch (error.code) {
      case "auth/popup-closed-by-user":
        message = "Google login was cancelled.";
        break;

      case "auth/cancelled-popup-request":
        message = "Google login request was cancelled.";
        break;

      case "auth/popup-blocked":
        message = "Please allow popups for this website.";
        break;

      case "auth/unauthorized-domain":
        message =
          "This domain is not authorized in Firebase Authentication.";
        break;

      case "auth/operation-not-allowed":
        message = "Google Sign-In is not enabled in Firebase.";
        break;

      case "auth/network-request-failed":
        message =
          "Network error while connecting to Google. Check Firebase configuration and your internet connection.";
        break;

      default:
        message = error.message || message;
    }

    return {
      success: false,
      user: null,
      message,
    };
  }
};

// =====================================================
// EMAIL REGISTER
// =====================================================

export const registerWithEmailPassword = async (
  email,
  password,
  phone
) => {
  try {
    email = email.trim().toLowerCase();
    phone = phone.trim();

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return {
        success: false,
        user: null,
        message: "Please enter a valid email address.",
      };
    }

    // Phone validation
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
      return {
        success: false,
        user: null,
        message: "Phone number must contain exactly 10 digits.",
      };
    }

    // Password validation
    if (password.length < 6) {
      return {
        success: false,
        user: null,
        message: "Password must be at least 6 characters.",
      };
    }

    // Firebase registration
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = result.user;

    const sessionUser = await createOrGetUserProfile(firebaseUser, {
      phoneNumber: phone,
      provider: "email",
    });

    return {
      success: true,
      user: sessionUser,
      message: "Registration successful.",
    };
  } catch (error) {
    console.error("Registration error:", error);

    let message = "Registration failed. Please try again.";

    switch (error.code) {
      case "auth/email-already-in-use":
        message = "This email is already registered.";
        break;

      case "auth/invalid-email":
        message = "Invalid email address.";
        break;

      case "auth/weak-password":
        message = "Password must be at least 6 characters.";
        break;

      default:
        message = error.message || message;
    }

    return {
      success: false,
      user: null,
      message,
    };
  }
};

// =====================================================
// EMAIL LOGIN
// =====================================================

export const loginWithEmailPassword = async (
  email,
  password
) => {
  try {
    email = email.trim().toLowerCase();

    // Firebase login
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = result.user;

    const sessionUser = await createOrGetUserProfile(firebaseUser, {
      provider: "email",
    });

    return {
      success: true,
      user: sessionUser,
      message: "Login successful.",
    };
  } catch (error) {
    console.error("Email login error:", error);

    let message = "Login failed. Please try again.";

    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
        message = "Invalid email or password.";
        break;

      case "auth/user-not-found":
        message = "User not found.";
        break;

      case "auth/invalid-email":
        message = "Invalid email address.";
        break;

      case "auth/user-disabled":
        message = "This account has been disabled.";
        break;

      default:
        message = error.message || message;
    }

    return {
      success: false,
      user: null,
      message,
    };
  }
};

// =====================================================
// LOGOUT
// =====================================================

export const logoutFirebase = async () => {
  try {
    await signOut(auth);

    return {
      success: true,
      user: null,
      message: "Logged out successfully.",
    };
  } catch (error) {
    console.error("Logout error:", error);

    return {
      success: false,
      user: null,
      message: "Logout failed.",
    };
  }
};

// =====================================================
// AUTH STATE LISTENER
// =====================================================

export const subscribeToAuthState = (callback) => {
  if (typeof callback !== "function") {
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
};

// =====================================================
// GET USER PROFILE
// =====================================================

export const getUserProfile = async (uid) => {
  try {
    if (!uid) {
      return null;
    }

    const userRef = doc(db, "users", uid);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return null;
    }

    return userSnap.data();
  } catch (error) {
    console.error("Get profile error:", error);

    return null;
  }
};