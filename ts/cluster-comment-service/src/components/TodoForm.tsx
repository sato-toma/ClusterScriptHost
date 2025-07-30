"use client";
import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addTodo } from "../store/slices/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { ChannelId } from "../models/TodoChannel";

type TodoFormProps = {
  channelId: ChannelId;
};
const TodoForm = ({ channelId }: TodoFormProps) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const newTodo = {
      id: uuidv4(),
      name: name,
      completed: false,
      createdAt: new Date(),
      channelId: channelId,
      description: description,
    };
    dispatch(addTodo(newTodo));
    setName("");
    setDescription("");
  };

  return (
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
