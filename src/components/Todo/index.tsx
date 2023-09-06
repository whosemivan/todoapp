import './style.scss';
import React from 'react';
import { Checkbox, Button } from 'antd';

type TodoProps = {
    item: {
        title: string,
        isCompleted: boolean
    },
    setTodos: React.Dispatch<React.SetStateAction<{
        title: string,
        isCompleted: boolean
    }[]>>
    todos: {
        title: string,
        isCompleted: boolean
    }[]
};

const Todo = ({ item, setTodos, todos }: TodoProps) => {

    const handleTodoDelete = () => {
        const updatedTodos = todos.filter((todo) =>
            todo.title !== item.title && todo
        );
        setTodos(updatedTodos);
    };

    const handleTodoChange = () => {
        const updatedTodos = todos.map((todo) =>
            todo.title === item.title ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );
        setTodos(updatedTodos);
    };

    return (
        <li className='todo'>
            <Checkbox className={item.isCompleted ? 'checkboxLineThrough' : 'checkbox'} checked={item.isCompleted} onChange={handleTodoChange}>{item.title}</Checkbox>
            <Button onClick={handleTodoDelete} danger size="small" type="primary">Delete</Button>
        </li>
    );
};

export default Todo;