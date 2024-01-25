import { useEffect, useState } from "react";
import { CloudIcon, StarIcon } from "@heroicons/react/16/solid";

const ThemeSelector = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (theme) localStorage.setItem("theme", theme);
    const htmlElement = document.getElementsByTagName("html")[0];
    if (theme === "dark") htmlElement?.classList.add("dark");
    if (theme === "light") htmlElement?.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme && localTheme !== theme) setTheme(localTheme);
    else setTheme("light");
  }, []);

  return (
    <div className="flex items-center shadow rounded-full">
      <button
        aria-label="Theme Selector"
        type="button"
        className={`w-16 h-8 rounded-full border-vina-blue-dark dark:border-vina-yellow-medium relative bg-gradient-to-t ${theme === "light" ? "from-[#FFEEB2] to-[#66FFED]" : "from-[#AFCAFF] to-[#2B4485]"}`}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <>
            <CloudIcon className="absolute w-3 bg-clip-text text-white left-1 top-2" />
            <CloudIcon className="absolute w-2 bg-clip-text text-white left-4 top-3" />
          </>
        ) : (
          <>
            <StarIcon className="absolute w-3 bg-clip-text text-yellow-400 right-5 top-3" />
            <StarIcon className="absolute w-2 bg-clip-text text-yellow-400 right-3 top-2" />
          </>
        )}
        <div
          className={`w-6 h-6 transition-transform transform rounded-full border-black bg-gradient-to-t ${
            theme === "light"
              ? " from-yellow-400 to-orange-400 translate-x-[34px] "
              : " translate-x-1 from-[#d4d3d9] to-[#DDEDFF]  "
          }`}
        ></div>
      </button>
    </div>
  );
};

export default ThemeSelector;
