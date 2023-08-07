import { ReactElement } from 'react';
import styles from '../../../assets/styles/Menu.module.css';
import { Link } from 'react-router-dom';
import { FaXmark } from 'react-icons/fa6';
import Logo from '../../../assets/images/logo.png'

const Menu = (props: any): ReactElement => {
    const originalBackground = document.body.style.background;
    const originalPointerEvent = document.body.style.pointerEvents;
    const originalZIndex = document.body.style.zIndex;
    document.body.style.background = "rgba(0,0,0,.5)";
    document.body.style.zIndex = '2';
    document.body.style.pointerEvents = 'none'; // Makes background un-clickable.

    const mouseLeaveHandler = (): void => {
        props.onMouseLeave();
        document.body.style.background = originalBackground;
        document.body.style.pointerEvents = originalPointerEvent;
        document.body.style.zIndex = originalZIndex;
    };

    const linkClickHandler = (): void => {
        document.body.style.background = originalBackground;
        document.body.style.pointerEvents = originalPointerEvent;
        document.body.style.zIndex = originalZIndex;
    };

    return (
        <div className={styles.container}>
            <FaXmark className={styles.xMark} onClick={mouseLeaveHandler} />
            <ul className={styles.menuItems}>
                <img className={styles.logo} src={Logo} />
                <Link className={styles.menuItem} to='/placeholder' onClick={linkClickHandler}>Things and Stuff</Link>
                <Link className={styles.menuItem} to='/placeholder' onClick={linkClickHandler}>Things and Stuff</Link>
                <Link className={styles.menuItem} to='/placeholder' onClick={linkClickHandler}>Things and Stuff</Link>
            </ul>
        </div>
    )
};

export default Menu;