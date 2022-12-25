import { RotatingSquare } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <RotatingSquare
        height="100"
        width="100"
        color="#1C3988"
        ariaLabel="rotating-square-loading"
        strokeWidth="4"
        visible={true}
      />
    </div>
  );
};

export default Loading;
