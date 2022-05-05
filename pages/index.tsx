import { signIn, signOut, useSession } from "next-auth/react";
import NewTodoForm from "../components/NewTodoForm ";
import TodoList from "../components/TodoList";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      {!session && (
        <>
          サインインしてください。 <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          サインイン完了。 email: {session.user.email}
          <button onClick={() => signOut()}>Sign out</button>
          <NewTodoForm />
          <TodoList />
        </>
      )}
    </>
  );
}
