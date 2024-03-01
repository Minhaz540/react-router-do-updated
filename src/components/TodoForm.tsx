import { Form, useNavigation } from "react-router-dom";
import { ITodo } from "./AvailableTodos";

export default function TodoForm({ todo, update }: { todo?: ITodo; update?: boolean }) {
	const navigation = useNavigation();
	const busy = navigation.state === "submitting";

	return (
		<Form action={update ? `/todos/edit/${todo?._id}` : "/todos/create"} method="post">
			<label>
				Todo title
				<br />
				<input defaultValue={todo?.title} disabled={busy} type="text" name="title" />
			</label>
			<button type="submit" disabled={busy}>
				{update ? (
					<>{busy ? "Updating..." : "Update"}</>
				) : (
					<>{busy ? "Creating..." : "Create"}</>
				)}
			</button>
		</Form>
	);
}
