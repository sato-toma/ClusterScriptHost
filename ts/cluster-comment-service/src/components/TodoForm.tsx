"use client";
import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addTodo } from "../store/slices/todoSlice";
import { v4 as uuidv4 } from "uuid";

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const newTodo = {
      id: uuidv4(),
      title,
      description,
    };
    dispatch(addTodo(newTodo));
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Todo</button>
    </div>
  );
};

export default TodoForm;
