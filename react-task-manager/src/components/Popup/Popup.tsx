import style from "./PopUp.module.scss";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
  className: string | undefined;
  closeButtonLabel: string | undefined;
}

function PopUp(props: PopUpProps) {
  const { isOpen, onClose, children, className, closeButtonLabel } = props;
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
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
        <button type="button" className={`${style.StandardButton} ${style.CloseButton}`} onClick={onClose}>
          {closeButtonLabel || "CANCEL"}
        </button>
      </div>
    </div>
  );
}

export default PopUp;
