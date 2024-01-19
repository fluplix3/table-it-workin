import { useState } from 'react';
import { Filter, Plus } from '../Svg/index';
import styles from './header.module.css';

interface IHeader {
    onSearch: (searchTerm: string) => void;
    handleApiChange: (selectedValue: string) => void;
    selectedApi: string;
    selectedKey: (key: string) => void;
    keys: string[];
}

export const Header = ({ onSearch, handleApiChange, selectedApi, selectedKey, keys }: IHeader) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openSelect, setOpenSelect] = useState<boolean>(false);
    const [saveKeys] = useState<string[]>(keys);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        onSearch(newSearchTerm)
        setSearchTerm(newSearchTerm);
    };

    //Выбор api
    const handleSelectApiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        handleApiChange(selectedValue);
    };

    const handleOptionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        selectedKey(event.target.value);
        setOpenSelect(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.leftMenu}>
                <button className={styles.btnFilter}>
                    <Filter />
                </button>
                <input
                    type="search"
                    className={styles.input}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setOpenSelect(true)}
                    placeholder="Search..."
                />
                {openSelect && (
                    <select className="options" onChange={handleOptionSelect}>
                        {saveKeys.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div className={styles.rightMenu}>
                <select value={selectedApi} onChange={handleSelectApiChange}>
                    <option value="location">1. location</option>
                    <option value="character">2. character</option>
                </select>
                <button className={styles.btnAdd}>
                    <Plus />
                    <span>Add customer</span>
                </button>
            </div>
        </header>
    );
}

export default Header;