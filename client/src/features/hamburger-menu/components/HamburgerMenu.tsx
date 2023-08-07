import { ReactElement, useState } from 'react';
import styles from '../../../assets/styles/HamburgerMenu.module.css';
import Menu from './Menu';
import "../../../assets/styles/global.css"
import { burgerClickHandler } from '../services';

const HamburgerMenu = (props: any): ReactElement => {
    const [toggled, setToggled] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            {toggled && <Menu onMouseLeave={() => burgerClickHandler(setToggled)} />}
            {!toggled &&
                <div className={styles.burger} onClick={() => burgerClickHandler(setToggled)}>
                    <div className={styles.burgerLayer}></div>
                    <div className={`${styles.burgerLayer} ${styles.contents}`}></div>
                    <div className={`${styles.burgerLayer} ${styles.contents}`}></div>
                </div>}
        </div>
    )
};

export default HamburgerMenu;