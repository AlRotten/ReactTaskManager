import { ActionsLabels, ButtonTypes } from "../../constants";
import Button from "../Button/Button";
import style from "./PopUp.module.scss";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: JSX.Element | JSX.Element[];
  className?: string;
  closeButtonLabel?: string;
}

function PopUp(props: PopUpProps) {
  const { isOpen, onClose, onConfirm, children, className, closeButtonLabel } = props;
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };
  const handleConfirm = () => {
    if (!onConfirm) return;
    
    onConfirm();
  };

  return (
    <div
      className={`${style.PopUpOverlay} ${isOpen ? style.Open : ""} ${
        className || ""
      }`}
      onClick={handleOverlayClick}
      role="cell"
    >
      <div
        className={style.PopUpContent}
      >
        {children}
        <Button onClick={onClose} >
          {closeButtonLabel || ActionsLabels.CANCEL}
        </Button>
        <Button onClick={handleConfirm} type={ButtonTypes.ADD} >
          {ActionsLabels.ADD}
        </Button>
      </div>
    </div>
  );
}

export default PopUp;
