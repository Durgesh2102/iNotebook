import React, { useState, useEffect, useRef } from 'react';
import { ChromePicker } from 'react-color';

function ColorPicker({ getColour }) {
  const [color, setColor] = useState('#ffffff');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown button

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    getColour(newColor.hex);
  };

  const handleToggleColorPicker = () => {
    setColorPickerOpen(!colorPickerOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setColorPickerOpen(false);
      }
    };

    if (colorPickerOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [colorPickerOpen]);

  return (
    <div>
      <div className="dropdown">
        <button
          ref={dropdownRef} // Attach the ref to the button
          type="button"
          className="btn "
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={handleToggleColorPicker}
        >
          <i className="fa-solid fa-palette"></i>
        </button>
        <div className={`dropdown-menu${colorPickerOpen ? ' show' : ''}`}>
          {colorPickerOpen && (
            <ChromePicker color={color} onChange={handleColorChange} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
