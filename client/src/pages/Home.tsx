import React, { ReactElement } from 'react';
import NavBar from '../features/navbar/components/NavBar';
import global from '../assets/styles/global.css';
import styles from '../assets/styles/Home.module.css';

const Home = (props: any): ReactElement => {
    return (
        <>
            <NavBar />
            <div className={styles.section}>
                <h1 className={styles.sectionTitle}>Your Lists</h1>
                <div className={styles.lists}>
                    hi
                </div>
            </div>
        </>
    )
};

export default Home;