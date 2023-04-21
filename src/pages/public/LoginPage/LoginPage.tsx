import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import shareVideo from "../../../assets/share.mp4";
import logo from "../../../assets/logowhite.png";
import jwt_decode from "jwt-decode";
import useAuthContext from "../../../hooks/useAuthContext";

const LoginPage = () => {
  //   const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();

  const handleLogin = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const {
        picture,
        name: username,
        sub: id,
      } = jwt_decode(credentialResponse.credential) as {
        sub: string;
        name: string;
        email: string;
        picture: string;
      };
      const isLogued = await login(
        {
          _id: id,
          _type: "user",
          user: username,
          image: picture,
        },
        credentialResponse.credential
      );
      if (!isLogued) {
        console.log("Error al loguear");
      }
    }
  };
  return (
    <div className="min-h-screen w-full">
      <div className="relative w-full h-full min-h-screen">
        <video
          className="w-full h-full object-cover min-h-screen"
          autoPlay
          loop
          muted
          controls={false}
          src={shareVideo}
        />
      </div>
      <div className="absolute left-0 right-0 top-0 bottom-0 z-10 bg-blackOverlay flex justify-center items-center flex-col">
        <div className="p-5">
          <img src={logo} alt="Logo de la aplicación" width={130} />
        </div>
        <div className="shadow-2x1">
          <GoogleLogin
            width="250px"
            onSuccess={(credentialResponse) => {
              handleLogin(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            shape="rectangular"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
