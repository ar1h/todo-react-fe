import React from 'react';

const ToDoList = ({ items }) => (
    <ul>
        <h1>List of Items</h1>
        {
            items && items.map((item, index) => <li key={index}>{item.taskName}</li>)
        }
    </ul>
);

export default ToDoList;