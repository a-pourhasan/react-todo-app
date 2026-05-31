import { render, screen, fireEvent } from '@testing-library/react';
import List from './List';

describe('List Component', () => {
  const mockCallbacks = {
    deleteItem: jest.fn(),
    checkItem: jest.fn(),
    editItem: jest.fn(),
    editItemInput: jest.fn(),
    cancelEdit: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty list', () => {
    render(
      <List
        list={[]}
        {...mockCallbacks}
      />
    );

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('renders list of tasks', () => {
    const tasks = [
      { text: 'Task 1', checked: false, editMode: false },
      { text: 'Task 2', checked: false, editMode: false }
    ];

    render(
      <List
        list={tasks}
        {...mockCallbacks}
      />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('displays checked class for completed tasks', () => {
    const tasks = [
      { text: 'Completed task', checked: true, editMode: false }
    ];

    render(
      <List
        list={tasks}
        {...mockCallbacks}
      />
    );

    const textBox = screen.getByText('Completed task').closest('.text-box');
    expect(textBox).toHaveClass('checked');
  });

  test('calls deleteItem when delete button is clicked', () => {
    const tasks = [
      { text: 'Task to delete', checked: false, editMode: false }
    ];

    render(
      <List
        list={tasks}
        {...mockCallbacks}
      />
    );

    const deleteButton = screen.getByLabelText('Delete task');
    fireEvent.click(deleteButton);

    expect(mockCallbacks.deleteItem).toHaveBeenCalledWith(0);
  });

  test('calls checkItem when check button is clicked', () => {
    const tasks = [
      { text: 'Task to check', checked: false, editMode: false }
    ];

    render(
      <List
        list={tasks}
        {...mockCallbacks}
      />
    );

    const checkButton = screen.getByLabelText('Mark as complete');
    fireEvent.click(checkButton);

    expect(mockCallbacks.checkItem).toHaveBeenCalledWith(0);
  });

  test('calls editItem when edit button is clicked', () => {
    const tasks = [
      { text: 'Task to edit', checked: false, editMode: false }
    ];

    render(
      <List
        list={tasks}
        {...mockCallbacks}
      />
    );

    const editButton = screen.getByLabelText('Edit task');
    fireEvent.click(editButton);

    expect(mockCallbacks.editItem).toHaveBeenCalledWith(0);
  });

  test('calls cancelEdit when cancel button is clicked in edit mode', () => {
    const tasks = [
      { text: 'Editing task', checked: false, editMode: true }
    ];

    render(
      <List
        list={tasks}
        {...mockCallbacks}
      />
    );

    const cancelButton = screen.getByLabelText('Cancel editing');
    fireEvent.click(cancelButton);

    expect(mockCallbacks.cancelEdit).toHaveBeenCalledWith(0);
  });

  test('renders multiple tasks correctly', () => {
    const tasks = [
      { text: 'First', checked: false, editMode: false },
      { text: 'Second', checked: true, editMode: false },
      { text: 'Third', checked: false, editMode: false }
    ];

    render(
      <List
        list={tasks}
        {...mockCallbacks}
      />
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
