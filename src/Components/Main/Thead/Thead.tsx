import { useState } from 'react';
import { CustomCheckbox } from '../../index';
import styles from './Thead.module.css';

interface ITheadProps {
    data: string[];
    handleSort: (key: string) => void;
}

export const Thead = ({ data, handleSort }: ITheadProps) => {
    const [keys] = useState<string[]>(Object.keys(data[0] || {}))
    const handleSortClick = (key: string) => {
        handleSort(key);
    }

    return (
        <thead className={styles.thead}>
            <tr>
                <th className={styles.blockWithCheckbox}>
                    <CustomCheckbox className={styles.headCheckbox} />
                </th>
                {keys.map((key) => (
                    <th key={key}>
                        <button
                            onClick={() => handleSortClick(key)}
                            className={styles.headlines}
                        >
                            {key}
                        </button>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default Thead;