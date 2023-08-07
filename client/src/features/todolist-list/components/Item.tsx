import { useHistory } from "react-router-dom";
import { todoListRedirect } from "../services/itemServices";
import styles from "../../../assets/styles/Item.module.css"

const Item = (props: any) => {
    const history = useHistory();

    return (
        <div className={styles.containter} onClick={() => todoListRedirect(props.todoListTitle, history)}>
            <h1>{props.todoListTitle}</h1>
        </div>
    )
};

export default Item;