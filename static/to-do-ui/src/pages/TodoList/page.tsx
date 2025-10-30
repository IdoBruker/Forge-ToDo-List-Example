import { TodoProvider } from "./TodoContext";
import AddTodoForm from "./components/AddTodoForm";
import ToDoList from "./components/ToDoList";
import { useTodos } from "./hooks/useTodosContext";
import LoadingIndicator from "../../components/LoadingIndicator";

const TodoListPageContent = () => {
  const { isLoading } = useTodos();
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="max-w-2xl px-4 sm:px-6 lg:px-8 py-15 h-full">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-2">
              To-Do List
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
              Stay organized, stay productive.
            </p>
          </header>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 h-9/12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Tasks
            </h2>
            <AddTodoForm />
            <div className="h-2/3 overflow-y-auto">
              <ToDoList />
            </div>
            {isLoading && <LoadingIndicator />}
          </div>
        </div>
      </div>
    </>
  );
};

const TodoListPage = () => {
  return (
    <TodoProvider>
      <TodoListPageContent />
    </TodoProvider>
  );
};

export default TodoListPage;
