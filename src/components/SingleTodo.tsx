import { Form, Link, useNavigation } from "react-router-dom";
import { ITodo } from "./AvailableTodos";
import { ChangeEvent, useState } from "react";

export default function SingleTodo({ todo }: { todo: ITodo }) {
	const navigation = useNavigation();
	const busy = navigation.state === "submitting";
	const [complete, setComplete] = useState(todo.isComplete);

	async function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>, todoId: string) {
		const isComplete = event.target.checked;
		setComplete(isComplete);

		try {
			const response = await fetch(
				`https://todo-service-v-1-api.onrender.com/api/todos/${todoId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ isComplete }),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update todo status");
			}
		} catch (error) {
			console.error("Error updating todo status:", error);
		}
	}
	return (
		<li style={{ marginBottom: "10px" }}>
			<div style={{ display: "flex", gap: "5px" }}>
				<span
					style={{
						textDecoration: complete ? "line-through" : "none",
					}}
				>
					{todo.title}{" "}
					<input
						name="complete"
						type="checkbox"
						defaultChecked={todo.isComplete}
						onChange={(event) => handleCheckboxChange(event, todo._id)}
					/>
				</span>{" "}
				<span style={{ display: "flex", gap: "5px" }}>
					<Link to={`/todos/edit/${todo._id}`}>
						<button>Edit</button>
					</Link>{" "}
					<Form action={`/todos/${todo._id}`} method="DELETE">
						<button disabled={busy} type="submit">
							Delete
						</button>
					</Form>
				</span>
			</div>
		</li>
	);
}
