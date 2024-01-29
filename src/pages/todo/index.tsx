import Header from "@/components/Header";
import TodoListCardSsr from "@/components/todo/TodoListCardSsr";
import store from "@/redux/store";
import { GetStaticProps } from "next";
import { env } from "process";
import React from "react";
import { Provider } from "react-redux";

const index: React.FC<IDataTodoList> = ({
  dataTodos,
  dataAllTodos,
  dataUsers,
}) => {
  return (
    <main className="bg-sky-300 w-full max-h-fit p-3">
      <Provider store={store}>
        <Header todoPage={true} />
        <TodoListCardSsr dataAllTodos={dataAllTodos} dataUsers={dataUsers} />
      </Provider>
    </main>
  );
};

export async function getServerSideProps() {
  try {
    const responseAllTodos = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`
    );
    const dataAllTodos = await responseAllTodos.json();

    const responseUsers = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`
    );
    const dataUsers = await responseUsers.json();

    return {
      props: {
        dataAllTodos,
        dataUsers,
      },
    };
  } catch (error) {
    return {
      props: {
        dataAllTodos: [],
        dataUsers: [],
      },
    };
  }
}

export default index;
