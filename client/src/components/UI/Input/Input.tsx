import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: (value: string) => void;
    type?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    onBlur,
    type = 'text',
    placeholder,
    className,
    disabled,
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) => onBlur?.(e.target.value)}
            placeholder={placeholder}
            className={`${styles.input} ${className || ''}`}
            disabled={disabled}
        />
    );
};

export default Input;
