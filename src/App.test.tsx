import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {

  it('adds a new todo', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New task')).toBeInTheDocument();
  })

  it('deletes a todo', () => {
    render(<App />);

    const deleteBtn = screen.getByText('Delete');
    fireEvent.click(deleteBtn);

    const deletedTodo = screen.queryByText('New task');

    expect(deletedTodo).toBeNull();
  })
});