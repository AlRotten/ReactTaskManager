import { useState } from 'react';
import './App.css'

function App() {
  const [textList, setTextList] = useState<string[]>();
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>();

  const selectListItem = (index: number) => {
    if (!textList) return;

    const currentList = [...textList];
    currentList[index] = `Selected: ${currentList[index]}`;

    setTextList(currentList);
  }

  const deleteListItem = (index: number) => {
    if (!textList) return;

    const deletedText = textList[index];
    const newList = textList.filter((_, i) => i !== index);

    setTextList(newList);
    return deletedText;
  };

  const handlePopupCancelClick = () => {
    setIsPopupVisible(false);
  }

  return (
    <div className="container">
      <h1>Text List Manager</h1>
      <button onClick={() => setIsPopupVisible(true)}>Add Text</button>
      <ul>
        {textList && textList.map((text, index) => (
          <li 
            key={index} 
            onClick={() => selectListItem(index)} 
            onDoubleClick={() => deleteListItem(index)}
          >
            {text}
          </li>
        ))}
      </ul>
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add a todo</h2>
            <button onClick={handlePopupCancelClick}>Cancel</button>
            {/* <button onClick={handlePopupAcceptClick}>Accept</button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App
