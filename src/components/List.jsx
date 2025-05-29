import {useState} from "react";

const List = ({list, deleteItem, checkItem, editItem, editItemInput, cancelEdit}) => {

    const [inputEdit, setInputEdit] = useState({
        text: "",
        checked: false,
        editMode: false
    });

    const inputChange = (e) => {
        setInputEdit({
            text: e.target.value,
            checked: false,
            editMode: false
        });
    };

    const enableEdit = (index, text) => {
        editItem(index);
        setInputEdit({
            text: text,
            checked: false,
            editMode: false
        });
    }

    return (
        <>
            {list.map((item, index) => (
                <div className="box">
                    <div className="action-box">
                        {!item.editMode &&
                            <>
                                <button className="btn delete-btn" onClick={() => deleteItem(index)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                                <button className="btn edit-btn" onClick={() => enableEdit(index, item.text)}>
                                    <i className="fas fa-pencil"></i>
                                </button>

                                <button className="btn check-btn" onClick={() => checkItem(index)}>
                                    <i className="fas fa-check"></i>
                                </button>
                            </>
                        }
                        {item.editMode &&
                            <>
                                <button className="btn insert-btn" onClick={() => editItemInput(index, inputEdit.text)}>
                                    <i className="fas fa-check"></i>
                                </button>
                                <button className="btn delete-btn" onClick={() => cancelEdit(index)}>
                                    <i className="fas fa-xmark"></i>
                                </button>
                            </>
                        }
                    </div>
                    {item.editMode ?
                        <div className="input-box">
                            <input type="text" value={inputEdit.text} onChange={inputChange} />
                        </div>
                        :
                        <div className={`text-box ${item.checked ? "checked" : ""}`}>
                            <span>{item.text}</span>
                        </div>
                    }
                </div>
            ))}
        </>
    )
}

export default List;