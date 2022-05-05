import * as React from "react";
import { useMutation, useQueryClient } from "react-query";

const NewTodoForm = () => {
  //キャッシュを利用できるようにする
  const queryClient = useQueryClient();
  //フォームに入力されたステートを保持する
  const [form, setForm] = React.useState({
    title: "",
    body: "",
  });

  const { mutate } = useMutation(
    //useMutationでデータを登録する
    () => {
      return fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(form),
      });
    },
    //コールバックオプションによるAPIリクエストが成功した時の後処理
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  //データが送信されたらsetFormで入力内容を空にする
  const saveTodo = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setForm({ title: "", body: "" });
    mutate();
  };

  return (
    <form
      onSubmit={saveTodo}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        タイトル
        <input
          style={{ width: "500px" }}
          type="text"
          id="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </label>
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "16px",
        }}
      >
        内容
        <textarea
          style={{ width: "500px," }}
          id="body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
      </label>
      <button style={{ width: "100px", marginTop: "16px" }}>Save</button>
    </form>
  );
};

export default NewTodoForm;
