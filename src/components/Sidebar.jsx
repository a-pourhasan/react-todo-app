const Sidebar = ({ lists, activeList, onListSelect, onDeleteList }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Lists</h2>
      </div>
      <nav className="lists-nav">
        {lists.map((list) => (
          <div key={list.id} className="list-item-nav">
            <button
              className={`list-btn ${list.id === activeList?.id ? 'active' : ''}`}
              onClick={() => onListSelect(list)}
              style={list.id === activeList?.id ? { backgroundColor: list.color } : {}}
            >
              <span className="list-icon">
                <i className={`fas ${list.icon}`}></i>
              </span>
              <span className="list-name">{list.name}</span>
              <span className="list-count">{list.taskCount || 0}</span>
            </button>
            {lists.length > 1 && (
              <button
                className="delete-list-btn"
                onClick={() => onDeleteList(list.id)}
                title="Delete list"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        ))}
      </nav>
      <button className="add-list-btn">
        <i className="fas fa-plus"></i>
        <span>New List</span>
      </button>
    </aside>
  );
};

export default Sidebar;
