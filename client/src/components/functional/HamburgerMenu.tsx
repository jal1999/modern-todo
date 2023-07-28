import { ReactElement, useState } from 'react';
import styles from '../../styles/HamburgerMenu.module.css';
import Menu from './Menu';
import '../../styles/global.css';

const HamburgerMenu = (props: any): ReactElement => {
    const [toggled, setToggled] = useState<boolean>(false);

    const burgerClickHandler = (): void => {
        setToggled((prevState) => !prevState);
    };

    return (
        <div className={styles.container}>
            {toggled && <Menu onMouseLeave={burgerClickHandler} />}
            {!toggled &&
                <div className={styles.burger} onClick={burgerClickHandler}>
                    <div className={styles.burgerLayer}></div>
                    <div className={`${styles.burgerLayer} ${styles.contents}`}></div>
                    <div className={`${styles.burgerLayer} ${styles.contents}`}></div>
                </div>}
        </div>
    )
};

export default HamburgerMenu;