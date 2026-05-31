import './App.css';
import List from "./components/List";
import NewItem from "./components/NewItem";
import Sidebar from "./components/Sidebar";
import AddListModal from "./components/AddListModal";
import {useState, useEffect} from "react";

const STORAGE_KEY = 'todoItems';
const LISTS_STORAGE_KEY = 'todoLists';

const DEFAULT_LISTS = [
    {
        id: 'my-tasks',
        name: 'My Tasks',
        color: '#64B5F6',
        icon: 'fa-list',
        taskCount: 0
    },
    {
        id: 'work',
        name: 'Work',
        color: '#BA68C8',
        icon: 'fa-briefcase',
        taskCount: 0
    },
    {
        id: 'shopping',
        name: 'Shopping',
        color: '#81C784',
        icon: 'fa-shopping-cart',
        taskCount: 0
    },
    {
        id: 'personal',
        name: 'Personal',
        color: '#FFB74D',
        icon: 'fa-star',
        taskCount: 0
    }
];

function App() {
    const [list, setList] = useState([]);
    const [lists, setLists] = useState(DEFAULT_LISTS);
    const [activeList, setActiveList] = useState(DEFAULT_LISTS[0]);
    const [showAddListModal, setShowAddListModal] = useState(false);

    useEffect(() => {
        const savedItems = localStorage.getItem(STORAGE_KEY);
        const savedLists = localStorage.getItem(LISTS_STORAGE_KEY);

        if (savedItems) {
            try {
                setList(JSON.parse(savedItems));
            } catch (error) {
                console.error('Failed to load tasks:', error);
            }
        }

        if (savedLists) {
            try {
                setLists(JSON.parse(savedLists));
                setActiveList(JSON.parse(savedLists)[0]);
            } catch (error) {
                console.error('Failed to load lists:', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        setLists(prevLists => {
            const updatedLists = prevLists.map(l => ({
                ...l,
                taskCount: list.filter(item => item.listId === l.id).length
            }));
            localStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(updatedLists));
            return updatedLists;
        });
    }, [list]);

    const filteredList = list.filter(item => item.listId === activeList.id);

    const addToList = (item) => {
        if (!item.text.trim()) return;
        setList([...list, {...item, text: item.text.trim(), listId: activeList.id}]);
    };

    const removeFromList = (indexToRemove) => {
        const actualIndex = list.findIndex((item, idx) =>
            item.listId === activeList.id &&
            list.filter(i => i.listId === activeList.id)[indexToRemove] === item
        );
        setList(list.filter((_, index) => index !== actualIndex));
    };

    const toggleItemCompletion = (indexToCheck) => {
        const filteredIndices = list.map((item, idx) => item.listId === activeList.id ? idx : -1).filter(i => i !== -1);
        const actualIndex = filteredIndices[indexToCheck];

        setList(prevItems =>
            prevItems.map((item, i) =>
                i === actualIndex ? {...item, checked: !item.checked} : item
            )
        );
    };

    const enableEditMode = (indexToEdit) => {
        const filteredIndices = list.map((item, idx) => item.listId === activeList.id ? idx : -1).filter(i => i !== -1);
        const actualIndex = filteredIndices[indexToEdit];

        setList(prevItems =>
            prevItems.map((item, i) =>
                i === actualIndex ? {...item, editMode: true} : {...item, editMode: false}
            )
        );
    };

    const saveEditedItem = (indexToEdit, newText) => {
        if (!newText.trim()) return;
        const filteredIndices = list.map((item, idx) => item.listId === activeList.id ? idx : -1).filter(i => i !== -1);
        const actualIndex = filteredIndices[indexToEdit];

        setList(prevItems =>
            prevItems.map((item, i) =>
                i === actualIndex ? {...item, text: newText.trim(), editMode: false} : item
            )
        );
    };

    const cancelEdit = (indexToCancel) => {
        const filteredIndices = list.map((item, idx) => item.listId === activeList.id ? idx : -1).filter(i => i !== -1);
        const actualIndex = filteredIndices[indexToCancel];

        setList(prevItems =>
            prevItems.map((item, i) =>
                i === actualIndex ? {...item, editMode: false} : item
            )
        );
    };

    const handleDeleteList = (listId) => {
        if (lists.length <= 1) return;
        const newLists = lists.filter(l => l.id !== listId);
        setLists(newLists);
        setList(list.filter(item => item.listId !== listId));
        setActiveList(newLists[0]);
        localStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(newLists));
    };

    const handleAddList = (listData) => {
        const newListId = `list-${Date.now()}`;
        const newList = {
            id: newListId,
            name: listData.name,
            color: listData.color,
            icon: listData.icon,
            taskCount: 0
        };

        const updatedLists = [...lists, newList];
        setLists(updatedLists);
        setActiveList(newList);
        setShowAddListModal(false);
        localStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(updatedLists));
    };

    return (
        <div className="app-layout">
            <Sidebar
                lists={lists}
                activeList={activeList}
                onListSelect={setActiveList}
                onDeleteList={handleDeleteList}
                onAddList={() => setShowAddListModal(true)}
            />
            <main className="main-content">
                <header className="content-header">
                    <h1>{activeList.name}</h1>
                </header>
                <NewItem insertItem={addToList} />
                <List
                    list={filteredList}
                    deleteItem={removeFromList}
                    checkItem={toggleItemCompletion}
                    editItem={enableEditMode}
                    editItemInput={saveEditedItem}
                    cancelEdit={cancelEdit}
                />
                {filteredList.length === 0 && (
                    <p className="empty-message">No tasks yet. Add one to get started!</p>
                )}
            </main>
            <AddListModal
                isOpen={showAddListModal}
                onClose={() => setShowAddListModal(false)}
                onAddList={handleAddList}
            />
        </div>
    );
}

export default App;
