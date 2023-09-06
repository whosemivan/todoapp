import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './index';
// import App from './App';

const setTodos = jest.fn();

describe('Todo component', () => {

    it('Todo completed', () => {
        const fakeItem = {
            title: 'Test1',
            isCompleted: true
        };

        const fakeTodos = [
            {
                title: 'Test1',
                isCompleted: true,
            },
            {
                title: 'Test2',
                isCompleted: false,
            },
        ];

        const { container } = render(<Todo item={fakeItem} setTodos={setTodos} todos={fakeTodos} />);

        const todoItem = container.getElementsByClassName('checkboxLineThrough')[0]
        console.log(todoItem);
        expect(todoItem).toHaveClass('ant-checkbox-wrapper ant-checkbox-wrapper-checked checkboxLineThrough css-dev-only-do-not-override-nnuwmp');
    })

    it('Todo incompleted', () => {

        const fakeItem = {
            title: 'Test1',
            isCompleted: false
        };

        const fakeTodos = [
            {
                title: 'Test1',
                isCompleted: false,
            },
            {
                title: 'Test2',
                isCompleted: false,
            },
        ];

        const { container } = render(<Todo item={fakeItem} setTodos={setTodos} todos={fakeTodos} />);

        const todoItem = container.getElementsByClassName('checkbox')[0]
        console.log(todoItem);
        expect(todoItem).toHaveClass('ant-checkbox-wrapper checkbox css-dev-only-do-not-override-nnuwmp');
    })
});