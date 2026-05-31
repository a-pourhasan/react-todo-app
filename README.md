# Todo List App

A modern, responsive React application for managing your daily tasks with a clean and intuitive user interface.

## ✨ Features

- ✅ **Add Tasks** - Quickly add new tasks to your list
- ✏️ **Edit Tasks** - Modify existing tasks inline
- 🗑️ **Delete Tasks** - Remove tasks you no longer need
- ✔️ **Mark as Complete** - Check off completed tasks with visual feedback
- 💾 **Persistent Storage** - Tasks are automatically saved to browser storage
- 🎨 **Modern UI** - Clean, responsive design
- ♿ **Accessible** - WCAG compliant with keyboard navigation support

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd to-do-list
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **CSS3** - Styling with flexbox
- **Font Awesome** - Icons
- **React Testing Library** - Unit testing

## 📁 Project Structure

```
src/
├── components/
│   ├── NewItem.jsx    - Input component for adding tasks
│   └── List.jsx       - Task list display component
├── App.js             - Main app component
├── App.css            - App styling
├── index.js           - Entry point
└── index.css          - Global styles
```

## 🎯 Usage

1. **Add a Task**: Type in the input field and click the + button
2. **Edit a Task**: Click the pencil icon next to the task
3. **Complete a Task**: Click the checkmark to mark as done
4. **Delete a Task**: Click the trash icon to remove

## 🔄 Component Props

### NewItem
- `insertItem` (function) - Callback to add new task

### List
- `list` (array) - Array of task objects
- `deleteItem` (function) - Callback to delete task
- `checkItem` (function) - Callback to toggle task completion
- `editItem` (function) - Callback to enable edit mode
- `editItemInput` (function) - Callback to save edited task
- `cancelEdit` (function) - Callback to cancel editing

## 📝 Task Object Structure

```javascript
{
  text: string,
  checked: boolean,
  editMode: boolean
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit a pull request.

## 📄 License

This project is open source and available under the MIT License.
