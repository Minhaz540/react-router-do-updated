import SingleTodo from "./SingleTodo";

export interface ITodo {
	_id: string;
	title: string;
	isComplete: boolean;
	createdAt: string;
	_v: number;
}

interface Props {
	todos: ITodo[];
}

export default function AvailableTodos({ todos }: Props) {
	return (
		<ul>
			{todos?.map((todo) => (
				<SingleTodo key={todo._id} todo={todo} />
			))}
		</ul>
	);
}
