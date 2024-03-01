import { redirect, useLoaderData } from "react-router-dom";
import AvailableTodos, { ITodo } from "../../components/AvailableTodos";
import TodoForm from "../../components/TodoForm";

export default function CreateTodo() {
	const todos = useLoaderData();

	return (
		<section>
			<h1>Create a new Todo</h1>
			<TodoForm />
			<br />
			<hr />
			<h2>Available todos</h2>
			<AvailableTodos todos={todos as ITodo[]} />
		</section>
	);
}

export async function createAction({ request }: { request: Request }) {
	try {
		const formData = await request.formData();

		await fetch("https://todo-service-v-1-api.onrender.com/api/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: formData.get("title") }),
		});

		return redirect(`/todos`);
	} catch (error) {
		console.error(error);
	}
}
