import './App.css';
import List from "./components/List";
import NewItem from "./components/NewItem";
import {useState} from "react";

function App() {
    const [list, setList] = useState([]);

    const addToList = (item) => {
        setList([...list, item]);
    }

    const removeFromList = (indexToRemove) => {
        setList(list.filter((item, index) => index !== indexToRemove));
    }

    const checkAnItem = (indexToCheck) => {
        setList(prevItems =>
            prevItems.map((item, i) =>
                i === indexToCheck ? {...item, checked: !item.checked} : item
            )
        );
    }

    const editAnItem = (indexToEdit) => {
        setList(prevItems =>
            prevItems.map((item, i) =>
                i === indexToEdit ? {...item, editMode: true} : item
            )
        );
    }

    const editAnItemInput = (indexToEdit, textEdit) => {
        setList(prevItems =>
            prevItems.map((item, i) =>
                i === indexToEdit ? {...item, text: textEdit, editMode: false} : item
            )
        );
    }

    const cancelAnItem = (indexToCancel) => {
        setList(prevItems =>
            prevItems.map((item, i) =>
                i === indexToCancel ? {...item, editMode: false} : item
            )
        );
    }

    return (
        <div className="app-container">
            <h3 className="header">To Do List</h3>
            <div className="list-style">
                <NewItem insertItem={addToList} />
                <List list={list} deleteItem={removeFromList} checkItem={checkAnItem}
                      editItem={editAnItem} editItemInput={editAnItemInput}
                      cancelEdit={cancelAnItem} />
            </div>
        </div>
    );
}

export default App;
