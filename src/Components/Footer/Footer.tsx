import { useEffect, useState } from 'react';
import { Arrow } from '../Svg';
import { CustomSelect } from '../index';
import { Option } from '../index';
import styles from './footer.module.css';

interface IFooter {
    totalItems: number;
    rowsPerPageOptions: Option[];
    rowsPerPage: number;
    onRowsPerPageChange: (selectedValue: number) => void;
    handleChangePage: (page: number) => void;
}

export const Footer = ({
    totalItems,
    rowsPerPageOptions,
    rowsPerPage,
    onRowsPerPageChange,
    handleChangePage,
}: IFooter) => {

    const totalElements = totalItems > 0 ? totalItems : 1;

    const totalPages = Math.ceil(totalElements / rowsPerPage);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage: number) => prevPage - 1);
            handleChangePage(currentPage);
        }
    };

    useEffect(() => {
        handleChangePage(currentPage);
      }, [currentPage, handleChangePage]);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage: number) => prevPage + 1);
            handleChangePage(currentPage);
        }
    };

    return (
        <footer className={styles.footer}>
            <span className={styles.quanityOfPage}>{`${currentPage}-${totalPages} of ${totalElements}`}</span>
            <div className={styles.blockWithRowsPage}>
                <div className={styles.blockWithSelect}>
                    <span className={styles.quanityOfPage}>Rows per page:</span>
                    <CustomSelect
                        options={rowsPerPageOptions}
                        value={rowsPerPage}
                        onChange={onRowsPerPageChange}
                    />
                </div>
                <div className={styles.blockWithPageSwitches}>
                    <button
                        className={`${styles.btnChangePage} ${styles.btnPrev} ${currentPage === 1 ? styles.btnDisabled : ''}`}
                        onClick={goToPreviousPage}
                    >
                        <Arrow />
                    </button>
                    <span className={`${styles.quanityOfPage} ${styles.totalPages}`}>
                        <span className={styles.currentPage}>{currentPage}</span>/{totalPages}
                    </span>
                    <button
                        className={`${styles.btnChangePage} ${styles.btnNext} ${currentPage === totalPages ? styles.btnDisabled : ''}`}
                        onClick={goToNextPage}
                    >
                        <Arrow />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;