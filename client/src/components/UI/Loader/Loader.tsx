import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
    const loaderClasses = `${styles.loader} ${className || ''}`;

    return <div className={loaderClasses} id={'loader'}></div>;
};

export default Loader;
