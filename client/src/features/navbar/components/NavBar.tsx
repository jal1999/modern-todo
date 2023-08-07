import { ReactElement } from 'react';
import HamburgerMenu from '../../hamburger-menu/components/HamburgerMenu';
import styles from '../../../assets/styles/NavBar.module.css';
import '../../../assets/styles/global.css';

const NavBar = (props: any): ReactElement => {
    return (
            <div className={styles.container}>
                <HamburgerMenu />
             </div>
    )
};

export default NavBar;