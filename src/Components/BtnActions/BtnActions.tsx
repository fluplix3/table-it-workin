import { useState } from 'react';
import { Actions, Info, Pencil } from '../Svg';
import styles from './btnActions.module.css';
import Delete from '../Svg/Components/Delete';

interface IBtnActions {
    className?: string;
}

export const BtnActions = ({ className, ...props }: IBtnActions) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpenClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <button
                className={`${styles.btnActions} ${className}`}
                onClick={handleOpenClick}
                {...props}
            >
                <Actions />
            </button>
            {isOpen
                ? <ul className={styles.listActions}>
                    <li>
                        <button className={styles.btnAction}>
                            <span className={`${styles.items} ${styles.itemViewEdit}`}>
                                View
                            </span>
                            <Info />
                        </button>
                    </li>
                    <li>
                        <button className={styles.btnAction}>
                            <span className={`${styles.items} ${styles.itemViewEdit}`}>
                                Edit
                            </span>
                            <Pencil />
                        </button>
                    </li>
                    <li>
                        <button className={styles.btnAction}>
                            <span className={`${styles.items} ${styles.itemDelete}`}>
                                Delete
                            </span>
                            <Delete />
                        </button>
                    </li>
                </ul>
                : ''
            }
        </>
    );
}

export default BtnActions;