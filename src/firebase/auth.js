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

// =====================================================
// GOOGLE PROVIDER
// =====================================================

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// =====================================================
// GOOGLE LOGIN
// =====================================================

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const firebaseUser = result.user;

    console.log("Google login successful:", firebaseUser);

    // Firestore user document
    const userRef = doc(db, "users", firebaseUser.uid);

    let existingProfile = {};

    try {
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        existingProfile = userSnap.data();
      }
    } catch (error) {
      console.warn("Firestore read warning:", error);
    }

    const userData = {
      uid: firebaseUser.uid,
      displayName:
        firebaseUser.displayName ||
        firebaseUser.email?.split("@")[0] ||
        "Google User",
      email: firebaseUser.email || "",
      phoneNumber: firebaseUser.phoneNumber || "",
      photoURL: firebaseUser.photoURL || "",
      provider: "google",
      role: existingProfile.role || "user",
      isEmailVerified: firebaseUser.emailVerified,
      lastLogin: serverTimestamp(),
    };

    // Create/update Firestore profile
    try {
      if (existingProfile && Object.keys(existingProfile).length > 0) {
        await setDoc(userRef, userData, { merge: true });

        await setDoc(
          userRef,
          {
            loginCount: increment(1),
          },
          { merge: true }
        );
      } else {
        await setDoc(
          userRef,
          {
            ...userData,
            createdAt: serverTimestamp(),
            loginCount: 1,
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.warn("Firestore write warning:", error);
    }

    // Safe frontend session data
    const sessionUser = {
      uid: firebaseUser.uid,
      displayName:
        firebaseUser.displayName ||
        firebaseUser.email?.split("@")[0] ||
        "Google User",
      email: firebaseUser.email || "",
      phoneNumber: firebaseUser.phoneNumber || "",
      photoURL: firebaseUser.photoURL || "",
      provider: "google",
      role: existingProfile.role || "user",
      isEmailVerified: firebaseUser.emailVerified,
    };

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

    // Firestore reference
    const userRef = doc(db, "users", firebaseUser.uid);

    const userData = {
      uid: firebaseUser.uid,
      displayName: email.split("@")[0],
      email: firebaseUser.email || "",
      phoneNumber: phone,
      photoURL: "",
      provider: "email",
      role: "user",
      isEmailVerified: firebaseUser.emailVerified,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      loginCount: 1,
    };

    try {
      await setDoc(userRef, userData, { merge: true });
    } catch (error) {
      console.warn("Firestore save warning:", error);
    }

    // Safe session user
    const sessionUser = {
      uid: firebaseUser.uid,
      displayName: email.split("@")[0],
      email: firebaseUser.email || "",
      phoneNumber: phone,
      photoURL: "",
      provider: "email",
      role: "user",
      isEmailVerified: firebaseUser.emailVerified,
    };

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

    // Firestore profile
    const userRef = doc(db, "users", firebaseUser.uid);

    let profile = {};

    try {
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        profile = userSnap.data();
      }

      await setDoc(
        userRef,
        {
          lastLogin: serverTimestamp(),
          loginCount: increment(1),
        },
        { merge: true }
      );
    } catch (error) {
      console.warn("Firestore update warning:", error);
    }

    // Safe session user
    const sessionUser = {
      uid: firebaseUser.uid,
      displayName:
        profile.displayName ||
        firebaseUser.email?.split("@")[0] ||
        "User",
      email: firebaseUser.email || "",
      phoneNumber: profile.phoneNumber || "",
      photoURL: profile.photoURL || "",
      provider: profile.provider || "email",
      role: profile.role || "user",
      isEmailVerified: firebaseUser.emailVerified,
    };

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