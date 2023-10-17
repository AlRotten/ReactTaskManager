import style from './Icon.module.scss';

const RefreshIcon = () => {
  return (
    <svg
        enableBackground="new 0 0 50 50"  
        className={style.StandardIcon}
        viewBox="0 0 50 50"
        color='currentColor'
    >
        <polyline 
          fill="currentColor" 
          points="40,7 40,16   31,15.999 " 
          stroke="currentColor"  
          strokeWidth="3"
        />
        <path 
          d="M41.999,25  c0,9.39-7.61,17-17,17s-17-7.61-17-17s7.61-17,17-17c5.011,0,9.516,2.167,12.627,5.616c0.618,0.686,1.182,1.423,1.683,2.203" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3"
        />
    </svg>
  );
};

export default RefreshIcon;