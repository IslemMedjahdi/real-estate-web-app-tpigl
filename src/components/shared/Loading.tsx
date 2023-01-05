import { RotatingSquare } from "react-loader-spinner";

const Loading = () => {
  return (
    <RotatingSquare
      height="100"
      width="100"
      color="#1C3988"
      ariaLabel="rotating-square-loading"
      strokeWidth="4"
      visible={true}
    />
  );
};

export default Loading;
