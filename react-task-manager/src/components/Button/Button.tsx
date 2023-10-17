import { ButtonTypes } from '../../types';
import style from './Button.module.scss';

type ButtonProps = {
    onClick: () => void;
    label: string;
    type?: ButtonTypes;
}

const Button = ({ onClick, label, type = ButtonTypes.NONE }: ButtonProps) => {
    const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.target !== event.currentTarget) return;
        
        onClick();
    };
    
    return (
        <button 
          className={`${style.StandardButton} ${type === ButtonTypes.ADD ? style.AddButton : ''}`} 
          onClick={handleClickButton}
        >
            {label}
        </button>
    );
};

export default Button;