import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRouter from "./components/routers/AppRouter";
import { UserAuthContextProvider } from "./contexts/authContext";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserAuthContextProvider>
        <AppRouter />
      </UserAuthContextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
