type Props = {
  numberPages: number;
  selectedPage: number;
  onPageClick: (page: number) => void;
};
const Pagination: React.FC<Props> = ({
  numberPages,
  selectedPage,
  onPageClick,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {Array.from(Array(numberPages).keys()).map((num) => (
        <button
          key={num}
          onClick={() => onPageClick(num + 1)}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center ${
            selectedPage !== num + 1 ? "bg-blue-primary" : "bg-blue-hover"
          }  text-sm text-white shadow transition duration-200 hover:bg-blue-hover`}
        >
          {num + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
