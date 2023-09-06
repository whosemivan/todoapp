import { useState, useEffect } from 'react'
import './App.scss';
import Todo from './components/Todo';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Radio, RadioChangeEvent, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

type TypeTodo = {
  title: string,
  isCompleted: boolean
};

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo: TypeTodo) => {
    if (filter === 'active') return !todo.isCompleted;
    if (filter === 'done') return todo.isCompleted;
    return true;
  });

  const handleFilterChange = (e: RadioChangeEvent) => {
    setFilter(e.target.value);
  };

  const handleTodoAdd = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, {
        title: inputValue,
        isCompleted: false
      }]);
      setInputValue('');
    } else {
      console.log('Error');
    }
  };

  const handleTodoDelete = (todos: TypeTodo[], item: TypeTodo) => {
    const updatedTodos = todos.filter((todo) =>
        todo.title !== item.title && todo
    );
    setTodos(updatedTodos);
};

  return (
    <section className='todos'>
      <Title className='title'>todos</Title>

      <div className='container'>
        <Input placeholder='Add a new todo' value={inputValue} type="text" className='input' onChange={(evt) => setInputValue(evt.target.value)} />
        <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={handleTodoAdd} />
      </div>

      <ul className='list'>
        {
          filteredTodos.map((item: TypeTodo) => (
            <Todo key={uuidv4()} item={item} setTodos={setTodos} todos={todos} />
          ))
        }
      </ul>
      <Radio.Group value={filter} onChange={handleFilterChange}>
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="done">Done</Radio.Button>
        <Radio.Button value="active">Active</Radio.Button>
      </Radio.Group>
    </section>
  )
}

export default App
