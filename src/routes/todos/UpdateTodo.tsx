import {
	redirect,
	useLoaderData,
	ActionFunction,
	ActionFunctionArgs,
	LoaderFunctionArgs,
	LoaderFunction,
} from "react-router-dom";
import TodoForm from "../../components/TodoForm";
import AvailableTodos, { ITodo } from "../../components/AvailableTodos";
import { dataLoader } from ".";

interface IData {
	singleTodoData: ITodo;
	allTodosData: ITodo[];
}

export default function UpdateTodo() {
	const { singleTodoData, allTodosData } = useLoaderData() as IData;

	return (
		<div>
			<h1>Update Todo</h1>
			<TodoForm update todo={singleTodoData as ITodo} />
			<br />
			<hr />
			<h2>Available todos</h2>
			<AvailableTodos todos={allTodosData as ITodo[]} />
		</div>
	);
}

export const updateTodoDataLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
	try {
		const res = await fetch(
			`https://todo-service-v-1-api.onrender.com/api/todos/find/${params?.todoId}`
		);

		const [singleTodoData, allTodosData] = await Promise.all([res.json(), dataLoader()]);

		return {
			singleTodoData,
			allTodosData,
		};
	} catch (error) {
		console.log(error);
	}
};

export const updateAction: ActionFunction = async ({ params, request }: ActionFunctionArgs) => {
	try {
		const formData = await request.formData();

		await fetch(`https://todo-service-v-1-api.onrender.com/api/todos/${params.todoId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: formData.get("title") }),
		});

		return redirect(`/todos`);
	} catch (error) {
		console.error(error);
	}
};
