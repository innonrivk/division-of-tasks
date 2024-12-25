import React, { useState } from 'react';
import './App.css';

const initialItems = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

function ExeUploader() {
  const [items, setItems] = useState(initialItems);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItem = JSON.parse(e.dataTransfer.getData('text/plain'));
    const updatedItems = items.filter((item) => item.id !== droppedItem.id);
    setItems([...updatedItems, droppedItem]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <div
        className="drop-target"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        Drop items here:
        {items.map((item) => (
          <div
            key={item.id}
            className="draggable-item"
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExeUploader;

