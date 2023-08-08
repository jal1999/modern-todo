import { todoListRedirect } from "../services/itemServices";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../../assets/styles/Item.module.css"

const Item = (props: any) => {
    const dispatch = useDispatch();
    const menuIsOpen = useSelector((state: any) => state.menuOpen);

    return (
        <div className={styles.containter} onClick={() => todoListRedirect(props.todoListId)}>
            <h1>{props.todoListTitle}</h1>
        </div>
    )
};

export default Item;