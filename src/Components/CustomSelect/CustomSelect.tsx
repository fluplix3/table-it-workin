import { useState } from 'react';
import styles from './customSelect.module.css';

export interface Option {
    value: number;
    label: number;
}

interface ICustomSelect {
    options: Option[];
    value: number;
    onChange: (selectedValue: number) => void;
}

export const CustomSelect = ({ options, value, onChange, ...props }: ICustomSelect) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (optionValue: number) => {
        setIsOpen(false);
        onChange(optionValue);
    };

    return (
        <div
            className={styles.select}
            onClick={() => setIsOpen(!isOpen)}
            {...props}
        >
            <button
                className={styles.selectedOption}
            >
                {value}
            </button>
            {isOpen && (
                <ul className={styles.options}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`${option.value === value ? styles.selected : styles.option} ${styles.option}`}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;