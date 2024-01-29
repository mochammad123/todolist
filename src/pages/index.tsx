import Image from "next/image";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Header from "@/components/Header";
import TodoListCard from "@/components/todo/TodoListCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="bg-sky-300 w-full max-h-fit p-3">
      <Provider store={store}>
        <Header todoPage={false} />
        <TodoListCard />
      </Provider>
    </main>
  );
}
