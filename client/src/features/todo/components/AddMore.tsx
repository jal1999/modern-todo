import { FaPlus } from "react-icons/fa6";
import styles from "../../../assets/styles/AddMore.module.css";
import { createTodoEntry } from "../services/addMoreService";

const AddMore = (props: any) => {
    const x = true;
    return (
        <div className={styles.container} onClick={() => createTodoEntry(props.todoListId, props.update)}>
            <FaPlus style={{color: "white", width: "3vw"}}/>
        </div>
    )
};

export default AddMore;