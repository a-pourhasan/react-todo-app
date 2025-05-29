import {useState} from "react";

const NewItem = ({insertItem}) => {
    const [task, setTask] = useState({
        text: "",
        checked: false,
        editMode: false
    });

    const inputChange = (e) => {
        setTask({
            text: e.target.value,
            checked: false,
            editMode: false
        });
    };

    const insertToList = () => {
        insertItem(task);
        setTask({
            text: "",
            checked: false,
            editMode: false
        });
    };

    return (
        <div className="insert-box">
            <div className="action-box">
                <button className="btn insert-btn" onClick={insertToList}>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            <div className="input-box">
                <input type="text" value={task.text} onChange={inputChange} />
            </div>
        </div>
    )
}

export default NewItem;