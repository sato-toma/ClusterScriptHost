"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addTodo } from "../store/slices/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { ChannelId } from "../models/TodoChannel";

type TodoFormProps = {
  channelId: ChannelId;
};
const TodoForm = ({ channelId }: TodoFormProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!currentUser) {
      alert("Please login to add a todo.");
      return;
    }
    const newTodo = {
      id: uuidv4(),
      name: name,
      creatorId: currentUser.id,
      completed: false,
      createdAt: new Date().toISOString(),
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
