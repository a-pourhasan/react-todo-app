import {useState} from "react";

const List = ({list, deleteItem, checkItem, editItem, editItemInput, cancelEdit}) => {
    const [editingText, setEditingText] = useState("");

    const handleEnableEdit = (index, text) => {
        editItem(index);
        setEditingText(text);
    };

    const handleInputChange = (e) => {
        setEditingText(e.target.value);
    };

    const handleSaveEdit = (index) => {
        editItemInput(index, editingText);
    };

    const handleCancelEdit = (index) => {
        cancelEdit(index);
        setEditingText("");
    };

    const handleKeyPress = (e, index) => {
        if (e.key === 'Enter') {
            handleSaveEdit(index);
        } else if (e.key === 'Escape') {
            handleCancelEdit(index);
        }
    };

    return (
        <ul className="task-list">
            {list.map((item, index) => (
                <li key={index} className="task-item">
                    <div className="action-box">
                        {!item.editMode ? (
                            <>
                                <button
                                    className="btn check-btn"
                                    onClick={() => checkItem(index)}
                                    aria-label={item.checked ? "Mark as incomplete" : "Mark as complete"}
                                    title={item.checked ? "Mark as incomplete" : "Mark as complete"}
                                >
                                    <i className="fas fa-check" aria-hidden="true"></i>
                                </button>
                                <button
                                    className="btn edit-btn"
                                    onClick={() => handleEnableEdit(index, item.text)}
                                    aria-label="Edit task"
                                    title="Edit task"
                                >
                                    <i className="fas fa-pencil" aria-hidden="true"></i>
                                </button>
                                <button
                                    className="btn delete-btn"
                                    onClick={() => deleteItem(index)}
                                    aria-label="Delete task"
                                    title="Delete task"
                                >
                                    <i className="fas fa-trash" aria-hidden="true"></i>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="btn insert-btn"
                                    onClick={() => handleSaveEdit(index)}
                                    aria-label="Save task"
                                    title="Save task"
                                >
                                    <i className="fas fa-check" aria-hidden="true"></i>
                                </button>
                                <button
                                    className="btn delete-btn"
                                    onClick={() => handleCancelEdit(index)}
                                    aria-label="Cancel editing"
                                    title="Cancel editing"
                                >
                                    <i className="fas fa-xmark" aria-hidden="true"></i>
                                </button>
                            </>
                        )}
                    </div>
                    {item.editMode ? (
                        <div className="input-box">
                            <input
                                type="text"
                                value={editingText}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleKeyPress(e, index)}
                                placeholder="Edit task..."
                                aria-label="Edit task input"
                                autoFocus
                            />
                        </div>
                    ) : (
                        <div className={`text-box ${item.checked ? "checked" : ""}`}>
                            <span>{item.text}</span>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default List;