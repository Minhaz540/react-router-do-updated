import { ActionFunction, ActionFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import AvailableTodos, { ITodo } from "../../components/AvailableTodos";

export default function Todos() {
	const todos = useLoaderData();

	return (
		<section>
			<h1>Available todos</h1>
			<AvailableTodos todos={todos as ITodo[]} />
		</section>
	);
}

export async function dataLoader() {
	try {
		const res = await fetch("https://todo-service-v-1-api.onrender.com/api/todos");
		const data = await res.json();

		return data.sort(
			(a: ITodo, b: ITodo) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);
	} catch (error) {
		console.error(error);
	}
}

export const manageTodoAction: ActionFunction = async ({ params, request }: ActionFunctionArgs) => {
	try {
		switch (request.method) {
			case "DELETE": {
				await fetch(
					`https://todo-service-v-1-api.onrender.com/api/todos/${params.todoId}`,
					{
						method: "DELETE",
					}
				);
				return redirect("/todos");
			}
			default: {
				throw new Response("", { status: 405 });
			}
		}
	} catch (error) {
		console.error(error);
	}
};
