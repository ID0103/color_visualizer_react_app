import { useState } from "react";
import { keyword } from "color-convert";

function App() {
  const [color, setColor] = useState("");
  const [isLight, setIsLight] = useState(true);

  const handleColorMode = (rgbArr) => {
    rgbArr ? setIsLight(isColorLight(rgbArr)) : setIsLight(true);
  };

  const isColorLight = ([r, g, b]) => {
    // Counting the perceptive luminance
    // human eye favors green color...
    const color = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return color < 0.5;
  };

  const name2rgbArr = (colorName) => {
    const rgbArr = keyword.rgb(colorName);
    return rgbArr || null;
  };
  const hex2rgbArr = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    return (r && g && b) || r === 0 || g === 0 || b === 0 ? [r, g, b] : null;
  };
  const convert2rgbArr = (color) => {
    return !name2rgbArr(color)
      ? !hex2rgbArr(color)
        ? null
        : hex2rgbArr(color)
      : name2rgbArr(color);
  };

  const handleColorInput = (input) => {
    const rgbArr = convert2rgbArr(input);
    if (rgbArr) {
      handleColorMode(rgbArr);
      setColor(input);
    } else {
      setColor("");
    }
  };

  return (
    <>
      <main>
        <div className="view-port" style={{ backgroundColor: color }}>
          <p
            style={
              isLight || color === "" ? { color: "black" } : { color: "white" }
            }
          >
            {color !== "" ? color : "Empty Value"}
          </p>
        </div>
        <form className="searchForm">
          <label htmlFor="search">Search</label>
          <input
            autoFocus
            required
            type="text"
            id="search"
            placeholder="Type color name or hex code"
            onChange={(e) => {
              handleColorInput(e.target.value);
            }}
          />
        </form>
      </main>
    </>
  );
}

export default App;
