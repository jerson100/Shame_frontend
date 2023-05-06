import { Circles } from "react-loader-spinner";

function Spinner({ message }: { message: string }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full flex-grow">
      <Circles color="#00BFFF" height={50} width={200} />
      <p className="text-lg text-center mt-5">{message}</p>
    </div>
  );
}

export default Spinner;
