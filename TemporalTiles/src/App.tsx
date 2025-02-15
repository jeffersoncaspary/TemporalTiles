import React, { useState } from 'react';
import './App.css';

const GRID_SIZE = 100;

interface Cell {
  color: string;
}

function App() {
  // Initialize a 100×100 grid with white cells
  const [grid, setGrid] = useState<Cell[][]>(() =>
    Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => ({ color: '#FFFFFF' }))
    )
  );

  // Currently selected color
  const [selectedColor, setSelectedColor] = useState<string>('#000000');

  // Update the clicked cell with the selected color
  const handleCellClick = (row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((rowData) => rowData.slice());
      newGrid[row][col] = { color: selectedColor };
      return newGrid;
    });
  };

  // ---------------------
  // Title Glow & Recolor
  // ---------------------
  const titleString = 'TemporalTiles'; // 13 characters

  // Keep a color for each letter (default #00FF00, or pick any color)
  const [titleColors, setTitleColors] = useState<string[]>(
    () => new Array(titleString.length).fill('#00FF00')
  );

  // When a letter is clicked, set that letter's color to the currently selected color
  const handleTitleLetterClick = (index: number) => {
    setTitleColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = selectedColor;
      return newColors;
    });
  };

  return (
    <div className="App">
      {/* Full-width banner */}
      <header className="banner">
        <h1>
          {titleString.split('').map((char, i) => (
            <span
              key={i}
              style={{
                /* Use the stored color for each letter + add a glow using text-shadow */
                color: titleColors[i],
                textShadow: `0 0 5px ${titleColors[i]}, 0 0 10px ${titleColors[i]}, 0 0 15px ${titleColors[i]}`,
                cursor: 'pointer',
                /* Slight margin so letters don't overlap glow */
                marginRight: '2px',
              }}
              onClick={() => handleTitleLetterClick(i)}
            >
              {char}
            </span>
          ))}
        </h1>
      </header>

      {/* Main content area for grid and controls */}
      <div className="main-content">
        {/* Grid container centers the square grid and lets it scale */}
        <div className="grid-container">
          <div className="grid">
            {grid.map((rowData, rowIndex) =>
              rowData.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="cell"
                  style={{ backgroundColor: cell.color }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
        </div>

        {/* Controls area */}
        <div className="controls">
          {/* White text with black outline */}
          <h2 className="outline-text">Pick a color:</h2>
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
          <div style={{ marginTop: '16px' }}>
            <span className="outline-text">Current color:</span>{' '}
            <span
              style={{
                display: 'inline-block',
                width: '1.5rem',
                height: '1.5rem',
                marginLeft: '8px',
                backgroundColor: selectedColor,
                border: '1px solid #000',
                verticalAlign: 'middle',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;










