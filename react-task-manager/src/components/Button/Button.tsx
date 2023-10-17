import { ReactNode } from 'react';
import { ButtonTypes } from '../../constants';
import style from './Button.module.scss';

type ButtonProps = {
    onClick: () => void;
    type?: ButtonTypes;
    children?: ReactNode; 
    disabled?: boolean;
}

const Button = ({ children, onClick, type = ButtonTypes.NONE, disabled = false }: ButtonProps) => {
    const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.target !== event.currentTarget) return;
        
        onClick();
    };
    
    return (
        <button 
          className={`
            ${style.StandardButton} 
            ${type === ButtonTypes.ADD ? style.AddButton : ''} 
            ${disabled ? style.Disabled : ''}
          `} 
          onClick={handleClickButton}
        >
            {children}
        </button>
    );
};

export default Button;