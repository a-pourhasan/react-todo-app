import './App.css';
import List from "./components/List";
import NewItem from "./components/NewItem";
import {useState, useEffect} from "react";

const STORAGE_KEY = 'todoItems';

function App() {
    const [list, setList] = useState([]);

    useEffect(() => {
        const savedItems = localStorage.getItem(STORAGE_KEY);
        if (savedItems) {
            try {
                setList(JSON.parse(savedItems));
            } catch (error) {
                console.error('Failed to load tasks:', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }, [list]);

    const addToList = (item) => {
        if (!item.text.trim()) return;
        setList([...list, {...item, text: item.text.trim()}]);
    };

    const removeFromList = (indexToRemove) => {
        setList(list.filter((item, index) => index !== indexToRemove));
    };

    const toggleItemCompletion = (indexToCheck) => {
        setList(prevItems =>
            prevItems.map((item, i) =>
                i === indexToCheck ? {...item, checked: !item.checked} : item
            )
        );
    };

    const enableEditMode = (indexToEdit) => {
        setList(prevItems =>
            prevItems.map((item, i) =>
                i === indexToEdit ? {...item, editMode: true} : {...item, editMode: false}
            )
        );
    };

    const saveEditedItem = (indexToEdit, newText) => {
        if (!newText.trim()) return;
        setList(prevItems =>
            prevItems.map((item, i) =>
                i === indexToEdit ? {...item, text: newText.trim(), editMode: false} : item
            )
        );
    };

    const cancelEdit = (indexToCancel) => {
        setList(prevItems =>
            prevItems.map((item, i) =>
                i === indexToCancel ? {...item, editMode: false} : item
            )
        );
    };

    return (
        <div className="app-container">
            <h1 className="header">My Tasks</h1>
            <div className="list-style">
                <NewItem insertItem={addToList} />
                <List
                    list={list}
                    deleteItem={removeFromList}
                    checkItem={toggleItemCompletion}
                    editItem={enableEditMode}
                    editItemInput={saveEditedItem}
                    cancelEdit={cancelEdit}
                />
                {list.length === 0 && (
                    <p className="empty-message">No tasks yet. Add one to get started!</p>
                )}
            </div>
        </div>
    );
}

export default App;
