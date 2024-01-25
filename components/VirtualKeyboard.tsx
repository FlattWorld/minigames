const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"],
];

const VirtualKeyboard = ({ onClickChar }: any) => {
  return (
    <div className=" max-w-3xl rounded-xl w-full mt-8 bg-gray-200 p-8 flex flex-col font-bold text-2xl gap-2 dark:bg-[#DADCE0] dark:bg-opacity-5">
      <div className="flex gap-2 ml-8">
        {keys[0].map((key) => (
          <button
            onClick={() => onClickChar({ key })}
            className="w-14 h-16 bg-gray-300 dark:bg-[#565F7E] dark:hover:bg-opacity-50 hover:bg-opacity-50 rounded-lg shadow"
            key={key}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex gap-2 ml-12">
        {keys[1].map((key) => (
          <button
            onClick={() => onClickChar({ key })}
            className="w-14 h-16 bg-gray-300 dark:bg-[#565F7E] dark:hover:bg-opacity-50 hover:bg-opacity-50 rounded-lg shadow"
            key={key}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {keys[2].map((key) => (
          <button
            onClick={
              key === "Delete"
                ? () => onClickChar({ key: "Backspace" })
                : () => onClickChar({ key })
            }
            className="min-w-14 h-16 px-2 bg-gray-300 dark:hover:bg-opacity-50 hover:bg-opacity-50 dark:bg-[#565F7E] rounded-lg shadow"
            key={key}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
