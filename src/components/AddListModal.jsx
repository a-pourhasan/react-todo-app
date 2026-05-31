import { useState } from "react";
import './AddListModal.css';

const COLORS = [
  { name: 'Blue', hex: '#64B5F6' },
  { name: 'Purple', hex: '#BA68C8' },
  { name: 'Green', hex: '#81C784' },
  { name: 'Orange', hex: '#FFB74D' },
  { name: 'Red', hex: '#EF5350' },
  { name: 'Pink', hex: '#EC407A' },
  { name: 'Teal', hex: '#26A69A' },
  { name: 'Indigo', hex: '#5C6BC0' }
];

const ICONS = [
  { name: 'List', icon: 'fa-list' },
  { name: 'Briefcase', icon: 'fa-briefcase' },
  { name: 'Shopping', icon: 'fa-shopping-cart' },
  { name: 'Star', icon: 'fa-star' },
  { name: 'Heart', icon: 'fa-heart' },
  { name: 'Bookmark', icon: 'fa-bookmark' },
  { name: 'Tag', icon: 'fa-tag' },
  { name: 'Lightbulb', icon: 'fa-lightbulb' },
  { name: 'Rocket', icon: 'fa-rocket' },
  { name: 'Users', icon: 'fa-users' },
  { name: 'Calendar', icon: 'fa-calendar' },
  { name: 'Checkmark', icon: 'fa-check-circle' }
];

const AddListModal = ({ isOpen, onClose, onAddList }) => {
  const [listName, setListName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!listName.trim()) {
      alert('Please enter a list name');
      return;
    }
    onAddList({
      name: listName.trim(),
      color: selectedColor.hex,
      icon: selectedIcon.icon
    });
    setListName('');
    setSelectedColor(COLORS[0]);
    setSelectedIcon(ICONS[0]);
  };

  const handleClose = () => {
    setListName('');
    setSelectedColor(COLORS[0]);
    setSelectedIcon(ICONS[0]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New List</h2>
          <button className="modal-close" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="listName">List Name</label>
            <input
              id="listName"
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="Enter list name..."
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {COLORS.map((color) => (
                <button
                  key={color.hex}
                  type="button"
                  className={`color-btn ${selectedColor.hex === color.hex ? 'selected' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Icon</label>
            <div className="icon-picker">
              {ICONS.map((item) => (
                <button
                  key={item.icon}
                  type="button"
                  className={`icon-btn ${selectedIcon.icon === item.icon ? 'selected' : ''}`}
                  onClick={() => setSelectedIcon(item)}
                  title={item.name}
                  aria-label={`Select ${item.name} icon`}
                >
                  <i className={`fas ${item.icon}`}></i>
                </button>
              ))}
            </div>
          </div>

          <div className="form-preview">
            <label>Preview</label>
            <div className="preview-item">
              <span className="preview-icon" style={{ backgroundColor: selectedColor.hex }}>
                <i className={`fas ${selectedIcon.icon}`}></i>
              </span>
              <span className="preview-name">{listName || 'List Name'}</span>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-create">
              Create List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListModal;
