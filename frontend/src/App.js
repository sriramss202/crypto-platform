import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { subscribeToAuthState } from "./firebase/auth";

function App() {
  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      console.log("Firebase auth state:", user);
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  return <AppRoutes />;
}

export default App;