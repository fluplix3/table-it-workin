import { useState } from 'react';
import { CustomCheckbox, BtnActions } from '../../index';
import styles from './tbody.module.css';

interface ITbodyProps {
    filteredData: string[];
    rowsPerPage: number;
    currentPage: number;
}

export const Tbody = ({ filteredData, rowsPerPage, currentPage }: ITbodyProps) => {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return filteredData.slice(startIndex, endIndex);
    };

    const handleCheckedClick = (item: string) => {
        const updatedCheckedItems = [...checkedItems];
        const itemIndex = updatedCheckedItems.indexOf(item);

        if (itemIndex === -1) {
            updatedCheckedItems.push(item);
        } else {
            updatedCheckedItems.splice(itemIndex, 1);
        }

        setCheckedItems(updatedCheckedItems);
    };

    return (
        <tbody className={styles.tbody}>
            {getPaginatedData().map((item, index) => {
                const isChecked = checkedItems.includes(item);
                const checkedClassname = isChecked ? styles.activeRow : '';

                return (
                    <tr className={`${styles.mainLineTbody} ${checkedClassname}`} key={index}>
                        <th className={styles.blockWithCheckbox}>
                            <CustomCheckbox
                                className={styles.bodyCheckbox}
                                onCheckedClick={() => handleCheckedClick(item)}
                                checked={isChecked}
                            />
                        </th>
                        {Object.values(item).map((value, index) => {
                            if (typeof value === 'object' && value !== null) {
                                return (
                                    <td key={index}>
                                        {(Object.values(value) as string[]).map((nestedValue, nestedIndex) => (
                                            <span key={nestedIndex}>{nestedValue}</span>
                                        ))}
                                    </td>
                                )
                            } else {
                                return <td key={index}>{value}</td>;
                            }
                        })}
                        <td className={styles.blockWithBtnActions}>
                            <BtnActions className={styles.btnActions} />
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
}

export default Tbody;