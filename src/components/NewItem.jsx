import {useState} from "react";

const NewItem = ({insertItem}) => {
    const [taskText, setTaskText] = useState("");

    const handleInputChange = (e) => {
        setTaskText(e.target.value);
    };

    const handleAddTask = () => {
        if (taskText.trim()) {
            insertItem({
                text: taskText.trim(),
                checked: false,
                editMode: false
            });
            setTaskText("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div className="insert-box">
            <div className="action-box">
                <button
                    className="btn insert-btn"
                    onClick={handleAddTask}
                    aria-label="Add new task"
                    title="Add new task"
                >
                    <i className="fas fa-plus" aria-hidden="true"></i>
                </button>
            </div>
            <div className="input-box">
                <input
                    type="text"
                    value={taskText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a new task..."
                    aria-label="New task input"
                />
            </div>
        </div>
    );
};

export default NewItem;