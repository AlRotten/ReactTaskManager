import { useCallback, useState } from 'react';
import style from './App.module.scss';
import PopUp from './components/Popup/Popup';
import Button from './components/Button/Button';
import { ButtonTypes } from './constants';
import { ActionsLabels } from './constants';
import Input from './components/Input/Input';

function App() {
  const [textList, setTextList] = useState<string[]>();
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [popupInputValue, setPopupInputValue] = useState<string>();
  const [selectedItems, setSelectedItems] = useState<number[]>();
  
  const selectListItem = useCallback((index: number) => {
    const isAlreadySelected = selectedItems?.includes(index);
    const newSelectedItemList = 
      isAlreadySelected ? 
        selectedItems?.filter(
          (selectedItemIndex) => 
            selectedItemIndex !== index) 
        : 
        [...(selectedItems || []), index];
    
    setSelectedItems(newSelectedItemList);
  }, [selectedItems]);

  const deleteListItem = useCallback((index: number) => {
    if (!textList) return;

    const deletedText = textList[index];
    const newList = textList.filter((_, i) => i !== index);
    const newSelectedIndexes = selectedItems?.map((selectedItemIndex) => selectedItemIndex - 1);

    setTextList(newList);
    setSelectedItems(newSelectedIndexes);

    return deletedText;
  }, [selectedItems, textList]);

  const deleteSelectedListItems = () => {
    const newList = textList?.filter((_, index) => !selectedItems?.includes(index));
    setTextList(newList);
    setSelectedItems([]);
  };

  const addListItem = (text: string) => {
    setTextList([...textList || [], text]);
    setIsPopupVisible(false);
    setPopupInputValue('');
  };

  const handleAcceptClick = () => {
    if (!popupInputValue || popupInputValue?.trim() === '') return;

    addListItem(popupInputValue.trim());
  };

  const handleCancelClick = () => {
    setIsPopupVisible(false);
    setPopupInputValue('');
  };

  const mapListItemsToElements = useCallback((text: string, index: number) => {
    const isCurrentItemSelected = selectedItems?.includes(index);

    return (
      <li
        className={`${style.ListItem} ${isCurrentItemSelected ? style.SelectedItem : ''}`}
        key={index} 
        onClick={() => selectListItem(index)} 
        onDoubleClick={() => deleteListItem(index)}
      >
        {text}
      </li>
    )
  }, [deleteListItem, selectListItem, selectedItems])

  return (
    <div className={style.App}>
      <div className={style.Card}>
        <h1>Text List Manager</h1>
        <ul className={style.ListContainer}>
          {textList && textList.map(mapListItemsToElements)}
        </ul>
        <div className={style.CardActionsContainer}>
          <div className={style.InnerCardActionsContainer}>
            <Button onClick={() => {}} >
              UNDO
            </Button>
            <Button onClick={deleteSelectedListItems}>
              {ActionsLabels.DELETE}
            </Button>
          </div>
          <Button onClick={() => setIsPopupVisible(true)} type={ButtonTypes.ADD} >
            {ActionsLabels.ADD}
          </Button>
        </div>
      </div>
      <PopUp
        isOpen={isPopupVisible}
        closeButtonLabel='CANCEL' 
        className={style.Card} 
        onClose={handleCancelClick}
        onConfirm={handleAcceptClick}
      >
        <h3>Add a todo</h3>
        <Input onChange={setPopupInputValue} value={popupInputValue}/>
      </PopUp>
    </div>
  );
}

export default App;
