import { ReactElement } from 'react';
import NavBar from '../features/navbar/components/NavBar';
import global from '../assets/styles/global.css';
import styles from '../assets/styles/Home.module.css';
import List from '../features/todolist-list/components/List';
import { useParams } from 'react-router-dom';

const Home = (props: any): ReactElement => {
    const params = useParams();
    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.section}>
                <h1 className={styles.sectionTitle}>Your Lists</h1>
                <List />
            </div>
        </div>
    )
};

export default Home;