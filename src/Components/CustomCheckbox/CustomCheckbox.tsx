import { useEffect, useState } from 'react';
import styles from './customCheckbox.module.css';

interface ICustomCheckbox {
    className?: string;
    onCheckedClick?: (checked: boolean) => void;
    checked?: boolean;
}

export const CustomCheckbox = ({ className, onCheckedClick, checked, ...props }: ICustomCheckbox) => {
    const [isChecked, setChecked] = useState<boolean>(checked || false);

    useEffect(() => {
        if (checked !== undefined) {
            setChecked(checked);
        }
    }, [checked]);

    const handleClick = () => {
        const updatedChecked = !isChecked;
        setChecked(updatedChecked);
        if (onCheckedClick) {
            onCheckedClick(updatedChecked);
        }
    };

    return (
        <label className={`${styles.checkbox} ${className}`} {...props}>
            <input
                type="checkbox"
                className={styles.input}
                checked={isChecked}
                onChange={handleClick}
            />
            <button className={styles.checkmark} onClick={handleClick} aria-pressed={isChecked}>
                {isChecked && <span className={styles.checkmarkIcon} />}
            </button>
        </label>
    );
};

export default CustomCheckbox;