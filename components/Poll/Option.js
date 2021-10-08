import { useEffect, useRef } from "react";

const Option = ({ options, handleOption, index, addOption }) => {
  const focusRef = useRef();

  useEffect(() => {
    focusRef.current?.focus();
  }, []);
  
  return (
    <div>
      <input
        type="text"
        ref={
          index === options.length - 1 && options.length > 1 ? focusRef : null
        }
        value={options[index].option}
        onChange={(e) => handleOption(e.target.value, index)}
        placeholder="Enter option..."
        className="bg-transparent p-2 w-full outline-none border-b border-gray-500"
        onKeyDown={(e) => {
          if (
            (e.code === "Enter" || e.code === "Tab" || e.keyCode === 13) &&
            index === options.length - 1 &&
            options[index].option
          ) {
            addOption();
          }
        }}
      />
    </div>
  );
};

export default Option;
