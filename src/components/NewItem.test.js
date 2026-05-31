import { render, screen, fireEvent } from '@testing-library/react';
import NewItem from './NewItem';

describe('NewItem Component', () => {
  test('renders input field and button', () => {
    const mockInsertItem = jest.fn();
    render(<NewItem insertItem={mockInsertItem} />);

    expect(screen.getByPlaceholderText('Enter a new task...')).toBeInTheDocument();
    expect(screen.getByLabelText('Add new task')).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    const mockInsertItem = jest.fn();
    render(<NewItem insertItem={mockInsertItem} />);

    const input = screen.getByPlaceholderText('Enter a new task...');
    fireEvent.change(input, { target: { value: 'New task' } });

    expect(input.value).toBe('New task');
  });

  test('calls insertItem when button is clicked', () => {
    const mockInsertItem = jest.fn();
    render(<NewItem insertItem={mockInsertItem} />);

    const input = screen.getByPlaceholderText('Enter a new task...');
    const button = screen.getByLabelText('Add new task');

    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(button);

    expect(mockInsertItem).toHaveBeenCalledWith({
      text: 'Test task',
      checked: false,
      editMode: false
    });
  });

  test('clears input after adding task', () => {
    const mockInsertItem = jest.fn();
    render(<NewItem insertItem={mockInsertItem} />);

    const input = screen.getByPlaceholderText('Enter a new task...');
    const button = screen.getByLabelText('Add new task');

    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(button);

    expect(input.value).toBe('');
  });

  test('calls insertItem on Enter key press', () => {
    const mockInsertItem = jest.fn();
    render(<NewItem insertItem={mockInsertItem} />);

    const input = screen.getByPlaceholderText('Enter a new task...');

    fireEvent.change(input, { target: { value: 'Keyboard task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockInsertItem).toHaveBeenCalled();
  });

  test('does not call insertItem with empty text', () => {
    const mockInsertItem = jest.fn();
    render(<NewItem insertItem={mockInsertItem} />);

    const button = screen.getByLabelText('Add new task');
    fireEvent.click(button);

    expect(mockInsertItem).not.toHaveBeenCalled();
  });

  test('trims whitespace from task text', () => {
    const mockInsertItem = jest.fn();
    render(<NewItem insertItem={mockInsertItem} />);

    const input = screen.getByPlaceholderText('Enter a new task...');
    const button = screen.getByLabelText('Add new task');

    fireEvent.change(input, { target: { value: '  Task with spaces  ' } });
    fireEvent.click(button);

    expect(mockInsertItem).toHaveBeenCalledWith({
      text: 'Task with spaces',
      checked: false,
      editMode: false
    });
  });
});
