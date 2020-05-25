import React, { useState } from 'react';

/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx, css } from '@emotion/core';

const styleApp = css`
  background: #d3d3d3;
  height: 500px;
  width: 600px;
  padding: 20px;
  margin: auto;
  margin-top: 100px;
  border: 5px solid #d16c6a;
  border-radius: 6px;
`;

const titleH2 = css`
  color: #d16c6a;
  text-align: center;
  font-family: sans-serif;
`;

const input = css`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-family: sans-serif;
  font-size: 20px;
  color: #5f5c5f;
`;

const buttonClearAll = css`
  font-family: sans-serif;
  border-radius: 5px;
  padding: 10px;
  color: #d16c6a;
  margin: auto;
  width: 20%;
  font-size: 16px;
`;

const form = css`
  padding-left: 40;
  margin-top: 16;
  border-radius: 6px;
`;

const a = css`
  color: #d16c6a;
  font-size: 20px;
  margin: 5px;
  font-family: sans-serif;
  background: transparent;
  padding: 0 4px;
  border-radius: 50%;
  text-decoration: none;
  margin-left: auto;
  :hover {
    background-color: #d16c6a;
    color: white;
  }
`;
const li = css`
  font-family: sans-serif;
  font-size: 20px;
  line-height: 1;
  display: flex;
  text-align: left;
  background-color: #f2d7d5;
  margin-bottom: 1rem;
  color: #5f5c5f;
  padding: 0.5rem;
  align-items: baseline;
  width: 70%;
`;

function App() {
  //newTodo holds the string which is in the input
  const [newTodo, setNewTodo] = useState('');
  //store a list of todo items
  const [todos, setTodos] = useState([]);

  function updateNewTodo(e) {
    e.preventDefault();
    //event target is going to be the input
    setNewTodo(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newTodo === '') return; //it logs anything
    //I want to get all the existing Todos and put at the end the newTodo
    //Each todo is an object which has an id and also some text
    setTodos([
      ...todos,
      { id: 1 + Math.random(), text: newTodo, isCompleted: false },
    ]);
    e.target.reset(); //resets the form
  }

  function removeTodo(id) {
    //filtering is based on the todo.id not being equal to the id
    setTodos(todos.filter((item) => item.id !== id));
  }

  function checkboxClick(id) {
    setTodos(
      todos.map((item) => {
        if (item.id === id)
          return { isCompleted: true, id: item.id, text: item.text };
        return item;
      }),
    );
  }

  //empty the list
  function clearAll() {
    setTodos([]);
  }

  return (
    <div css={styleApp}>
      <h2 css={titleH2}>CHICHI'S TODO LIST</h2>
      {/*I want this form to work whenever I hit enter*/}
      <form css={form} onSubmit={handleSubmit}>
        <input
          css={input}
          type="text"
          onChange={updateNewTodo}
          placeholder="What needs to be done?"
        />
        <ul>
          {todos.map((item) => (
            <li css={li} key={item.id}>
              <input type="checkbox" onClick={() => checkboxClick(item.id)} />
              <div
                style={{
                  textDecoration: item.isCompleted ? 'line-through' : '',
                }}
              >
                {item.text}{' '}
              </div>
              <a css={a} href="#a" onClick={() => removeTodo(item.id)}>
                x
              </a>
            </li>
          ))}
        </ul>
      </form>
      <button css={buttonClearAll} onClick={() => clearAll()}>
        clear All
      </button>
    </div>
  );
}

export default App;
