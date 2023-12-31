import { useMemo, useState } from 'react';
import style from './App.module.scss';
import PopUp from './components/Popup/Popup';
import Button from './components/Button/Button';
import { ButtonTypes } from './constants';
import { Actions } from './constants';
import Input from './components/Input/Input';
import RefreshIcon from './components/Icon/Icon';

function App() {
  const [textList, setTextList] = useState<string[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [popupInputValue, setPopupInputValue] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [actionHistory, setActionHistory] = useState<{
    action: Actions;
    text: string[] | string;
  }[]>([]);

  const selectListItem = (index: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((selectedItem) => selectedItem !== index)
        : [...prevSelected, index]
    );
  };

  const deleteListItem = (index: number) => {
    if (!textList) return;

    const newActionHistory = [
      ...actionHistory,
      { 
        action: Actions.DELETE, 
        text: textList[index],
      },
    ];

    const newList = textList.filter((_, i) => i !== index);
    setTextList(newList);
    setSelectedItems((prevSelected) =>
      prevSelected.map((selectedItem) =>
        selectedItem > index ? selectedItem - 1 : selectedItem
      )
    );

    setActionHistory(newActionHistory);
  };

  const deleteSelectedListItems = () => {
    if (!textList || !selectedItems.length) return;

    const newList = textList.filter((_, index) => !selectedItems.includes(index));
    setTextList(newList);
    setSelectedItems([]);
    setActionHistory([...actionHistory, { action: Actions.MULTIPLE_DELETE, text: textList }]);
  };

  const addListItem = (text: string) => {
    setTextList([...textList, text]);
    setActionHistory([...actionHistory, { action: Actions.ADD, text }]);
    setIsPopupVisible(false);
    setPopupInputValue('');
  };

  const undo = () => {
    if (!actionHistory.length) return;
  
    const lastAction = actionHistory[actionHistory.length - 1];
    const ActionMapper: { [key in Actions]?: () => void } = {
      [Actions.ADD]: () => {
        if (!textList) return;
  
        const updatedList = textList.slice(0, -1);
        setTextList(updatedList);
        setActionHistory(actionHistory.slice(0, -1));
      },
      [Actions.DELETE]: () => {
        if (!textList) return;
        
        setTextList([...textList, lastAction.text as string]);
        setActionHistory(actionHistory.slice(0, -1));
      },
      [Actions.MULTIPLE_DELETE]: () => {
        setTextList(lastAction.text as string[]);
        setActionHistory(actionHistory.slice(0, -1));
      }
    };
  
    const triggerLastActionUndo = ActionMapper[lastAction.action];
    if (!triggerLastActionUndo) return;

    triggerLastActionUndo();
  };

  const handleAcceptClick = () => {
    if (!popupInputValue.trim()) return;

    addListItem(popupInputValue.trim());
  };

  const handleCancelClick = () => {
    setIsPopupVisible(false);
    setPopupInputValue('');
  };

  const mapListItemsToElements = (text: string, index: number) => {
    const isCurrentItemSelected = selectedItems.includes(index);

    return (
      <li
        className={`${style.ListItem} ${isCurrentItemSelected ? style.SelectedItem : ''}`}
        key={index}
        onClick={() => selectListItem(index)}
        onDoubleClick={() => deleteListItem(index)}
      >
        {text}
      </li>
    );
  };

  const isActionHistoryEmpty = useMemo(() => !actionHistory || actionHistory.length === 0, [actionHistory]);
  
  return (
    <div className={style.App}>
      <div className={style.Card}>
        <h1>Text List Manager</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Non hic incidunt neque deserunt. 
          Illum distinctio in quos sapiente ipsa minus.
        </p>
        <ul className={style.ListContainer}>
          {textList && textList.map(mapListItemsToElements)}
        </ul>
        <div className={style.CardActionsContainer}>
          <div className={style.InnerCardActionsContainer}>
            <Button onClick={undo} disabled={isActionHistoryEmpty}>
              <RefreshIcon disabled={isActionHistoryEmpty} />
            </Button>
            <Button 
              onClick={deleteSelectedListItems} 
              disabled={!selectedItems || selectedItems.length === 0}
            >
              {Actions.DELETE}
            </Button>
          </div>
          <Button onClick={() => setIsPopupVisible(true)} type={ButtonTypes.ADD}>
            {Actions.ADD}
          </Button>
        </div>
      </div>
      <PopUp
        isOpen={isPopupVisible}
        className={style.Card}
        onClose={handleCancelClick}
        onConfirm={handleAcceptClick}
      >
        <h3>Add a todo</h3>
        <Input onChange={setPopupInputValue} value={popupInputValue} />
      </PopUp>
    </div>
  );
}

export default App;