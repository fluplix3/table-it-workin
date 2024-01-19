import { ReactElement } from 'react';
import styles from './container.module.css';

interface IContainerProps {
    children: ReactElement;
}

export const Container = ({ children }: IContainerProps) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}

export default Container;