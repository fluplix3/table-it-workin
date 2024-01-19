import { useEffect, useState } from 'react';
import styles from './main.module.css';
import Thead from './Thead/Thead';
import Tbody from './Tbody/Tbody';

interface IMainProps {
    data: string[];
    rowsPerPage: number;
    currentPage: number;
}

export const Main = ({ data, rowsPerPage, currentPage }: IMainProps) => {
    const [filteredData, setFilteredData] = useState<string[]>(data);
    const [_sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);


    //Функция сортировки по клику
    const handleColumnSort = (key: string) => {
        setSortOrder((prevSortOrder) => {
            const newSortOrder = prevSortOrder === 'desc' ? 'asc' : 'desc';
            const sortedArray = [...data].sort((a: any, b: any) => {
                const valueA = a[key];
                const valueB = b[key];

                // Проверка на то, массив ли это
                if (Array.isArray(valueA) && Array.isArray(valueB)) {
                    const comparison = valueA.length - valueB.length;
                    return newSortOrder === 'desc' ? comparison * -1 : comparison;
                }

                // Проверка на то, объект ли это
                if (typeof valueA === 'object' || typeof valueB === 'object') {
                    const comparison = valueA.name.localeCompare(valueB.name);
                    return newSortOrder === 'desc' ? comparison * -1 : comparison;
                }

                // Стандартная сортировка
                let comparison = 0;
                if (valueA > valueB) {
                    comparison = 1;
                } else if (valueA < valueB) {
                    comparison = -1;
                }

                return newSortOrder === 'desc' ? comparison * -1 : comparison;
            });

            setFilteredData(sortedArray);
            setSortOrder(newSortOrder);
            return newSortOrder;
        });
    };

    return (
        <main className={styles.main}>
            <section>
                <table className={styles.table}>
                    <Thead
                        data={data}
                        handleSort={handleColumnSort}
                    />
                    <Tbody
                        filteredData={filteredData}
                        rowsPerPage={rowsPerPage}
                        currentPage={currentPage}
                    />
                </table>
            </section>
        </main>
    );
};

export default Main;