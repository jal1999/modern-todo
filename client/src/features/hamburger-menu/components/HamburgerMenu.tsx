import { ReactElement } from 'react';
import styles from '../../../assets/styles/HamburgerMenu.module.css';
import Menu from './Menu';
import "../../../assets/styles/global.css"
import { burgerClickHandler } from '../services';
import { useDispatch, useSelector } from "react-redux";

const HamburgerMenu = (props: any): ReactElement => {
    const dispatch = useDispatch();
    const toggled = useSelector((state: any) => state.menuOpen);

    return (
        <div className={styles.container}>
            {toggled && <Menu onMouseLeave={() => burgerClickHandler(dispatch, toggled)} />}
            {!toggled &&
                <div className={styles.burger} onClick={() => burgerClickHandler(dispatch, toggled)}>
                    <div className={styles.burgerLayer}></div>
                    <div className={`${styles.burgerLayer} ${styles.contents}`}></div>
                    <div className={`${styles.burgerLayer} ${styles.contents}`}></div>
                </div>}
        </div>
    )
};

export default HamburgerMenu;