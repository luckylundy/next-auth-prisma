import { Todo } from "@prisma/client";
import * as React from "react";
import { useQuery } from "react-query";

const TodoList = () => {
  const { data: todos, isLoading } = useQuery<Todo[]>("todos", async () => {
    //fetchの初期値はgetなのでtodo一覧を/api/todosから取得
    const res = await fetch("/api/todos");
    return res.json();
  });
  //まだdataが取得できていない時
  if (isLoading) return <span>loading...</span>;
  //todosがなかった時
  if (todos.length === 0) return <span>no todos</span>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <h2>{todo.title}</h2>
          <span>{todo.body}</span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
