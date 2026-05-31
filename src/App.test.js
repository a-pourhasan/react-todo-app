import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders app with title', () => {
    render(<App />);
    expect(screen.getByText('My Tasks')).toBeInTheDocument();
  });

  test('renders empty message initially', () => {
    render(<App />);
    expect(screen.getByText('No tasks yet. Add one to get started!')).toBeInTheDocument();
  });

  test('adds a new task', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter a new task...');
    const button = screen.getByLabelText('Add new task');

    fireEvent.change(input, { target: { value: 'Buy groceries' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    });
  });

  test('prevents adding empty tasks', async () => {
    render(<App />);
    const button = screen.getByLabelText('Add new task');

    fireEvent.click(button);

    expect(screen.getByText('No tasks yet. Add one to get started!')).toBeInTheDocument();
  });

  test('deletes a task', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter a new task...');
    const addButton = screen.getByLabelText('Add new task');

    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Test task')).toBeInTheDocument();
    });

    const deleteButton = screen.getByLabelText('Delete task');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('Test task')).not.toBeInTheDocument();
    });
  });

  test('toggles task completion', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter a new task...');
    const addButton = screen.getByLabelText('Add new task');

    fireEvent.change(input, { target: { value: 'Complete this task' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Complete this task')).toBeInTheDocument();
    });

    const checkButton = screen.getByLabelText('Mark as complete');
    fireEvent.click(checkButton);

    await waitFor(() => {
      const textBox = screen.getByText('Complete this task').closest('.text-box');
      expect(textBox).toHaveClass('checked');
    });
  });

  test('persists tasks to localStorage', async () => {
    const { unmount } = render(<App />);
    const input = screen.getByPlaceholderText('Enter a new task...');
    const addButton = screen.getByLabelText('Add new task');

    fireEvent.change(input, { target: { value: 'Persistent task' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Persistent task')).toBeInTheDocument();
    });

    const stored = localStorage.getItem('todoItems');
    expect(stored).toBeTruthy();
    expect(stored).toContain('Persistent task');

    unmount();

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Persistent task')).toBeInTheDocument();
    });
  });

  test('adds task on Enter key press', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter a new task...');

    fireEvent.change(input, { target: { value: 'Keyboard task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('Keyboard task')).toBeInTheDocument();
    });
  });
});
