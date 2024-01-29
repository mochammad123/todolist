import CardModule from "@/modules/Card";
import { useGetAllTodosQuery } from "@/redux/todo/todoApi";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";

const TodoListCardSsr: React.FC<IDataTodoList> = ({
  dataAllTodos,
  dataUsers,
}) => {
  const { refetch } = useGetAllTodosQuery("todos");

  useEffect(() => {
    refetch();
  }, []);

  const getUser = (userId: number) => {
    const user = dataUsers?.find((user: IUser) => user.id === userId);
    return user ? user.name : "Not Found";
  };

  return (
    <>
      {dataAllTodos && dataAllTodos?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {dataAllTodos?.map((data: IData, index: number) => {
              const user = getUser(data?.userId);
              return (
                <CardModule
                  title={data?.title}
                  name={user}
                  completed={data?.completed}
                  key={index}
                />
              );
            })}
          </div>
        </>
      ) : (
        "No Data"
      )}
    </>
  );
};

export const getStaticProps = async () => {
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
    revalidate: 60,
  };
};

export default TodoListCardSsr;
