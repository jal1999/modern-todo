import { ReactElement } from 'react';
import HamburgerMenu from './HamburgerMenu';
import styles from '../../styles/NavBar.module.css';
import '../../styles/global.css';

const NavBar = (props: any): ReactElement => {
    return (
            <div className={styles.container}>
                <HamburgerMenu />
            </div>
    )
};

export default NavBar;