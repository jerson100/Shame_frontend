import Logo from "../../../assets/logo.png";

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-orange-100 flex items-center justify-center">
      <img src={Logo} alt="Logo de la aplicación" className="w-28" />
    </div>
  );
};

export default Loading;
