import style from './Input.module.scss';

type InputProps = {
    onChange: (value: string) => void;
    value: string; 
};

const Input = ({ onChange, value }: InputProps) => {
    return (
        <input 
          type='text'
          className={style.StandardInput} 
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
    );
};

export default Input;