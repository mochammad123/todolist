import CardModule from "@/modules/Card";
import { useGetAllTodosQuery, useGetTodosQuery } from "@/redux/todo/todoApi";
import { useGetUsersQuery } from "@/redux/user/userApi";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";

interface IData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

const TodoListCard = () => {
  const [page, setPage] = useState<number>(1);
  const {
    data: dataTodos,
    isLoading: isLoadingTodos,
    refetch,
  } = useGetTodosQuery({
    _start: page - 1,
    _limit: 12,
  });

  const { data: dataAllTodos, isLoading: isLoadingAllTodos } =
    useGetAllTodosQuery("todos");

  const { data: dataUsers, isLoading: isLoadingUsers } =
    useGetUsersQuery("users");

  const getUser = (userId: number) => {
    const user = dataUsers?.find((user: IUser) => user.id === userId);
    return user ? user : "Not Found";
  };

  const handlePageChange = (event: any, newPage: any) => {
    setPage(newPage);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {isLoadingTodos ? (
        <div className="w-full h-full">
          <div className="flex items-center justify-center">
            <p className="text-lg font-bold">Loading ...</p>
          </div>
        </div>
      ) : dataTodos && dataTodos?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {dataTodos?.map((data: IData, index: number) => {
              const user = getUser(data?.userId);
              return (
                <CardModule
                  title={data?.title}
                  name={user?.name}
                  completed={data?.completed}
                  key={index}
                />
              );
            })}
          </div>

          <div className="mt-4 flex justify-center w-full">
            <div className="bg-white rounded-lg shadow-lg p-2">
              <Pagination
                count={Math.ceil(dataAllTodos?.length / 12)}
                page={page}
                variant="outlined"
                shape="rounded"
                color="primary"
                onChange={handlePageChange}
              />
            </div>
          </div>
        </>
      ) : (
        "No Data"
      )}
    </>
  );
};

export default TodoListCard;
