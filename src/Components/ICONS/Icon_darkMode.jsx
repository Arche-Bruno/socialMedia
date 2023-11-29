import { useThemeContext } from "../../Context/ModeThemeContext";
import "./Icon_darkMode.css";
import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";
import { useContext } from "react";

function Icon_darkMode() {
  const { isDarkTheme, changeTheme } = useContext(useThemeContext);
  return (
    <div>
      <MoonIcon />
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isDarkTheme}
          onChange={() => {
            changeTheme({
              theme: isDarkTheme ? "light" : "dark",
              isDarkTheme: !isDarkTheme,
            });
          }}
        />
        <span className="switch" />
      </label>
      <SunIcon />
    </div>
  );
}
export default Icon_darkMode;
