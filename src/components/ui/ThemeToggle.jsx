import { useTheme } from "../../context/Theme.context";

function ThemeToggle({className}) {
    const { theme, toggleTheme } = useTheme();

    return (<button className={className ?? "btn border-0"}  onClick={toggleTheme}>
        <i className={`fa-solid fa-${theme === "light" ? "moon" : "sun"} fa-lg`}></i>{" "}
        {/* {theme === "light" ? "Dark Mode" : "Light Mode"} */}
    </button>);
}

export default ThemeToggle;