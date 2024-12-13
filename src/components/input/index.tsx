import React from 'react';
import styles from './input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={props.id} className={styles.label}>{label}</label>}
      <input {...props} className={styles.input} />
    </div>
  );
};

export default Input;
