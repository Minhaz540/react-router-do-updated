import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Root from "./templates/Root";
import Contact from "./Contact";
import Home from "./Home";
import CreateTodo, { createAction } from "./todos/CreateTodo";
import Todos, { manageTodoAction, dataLoader as todosLoader } from "./todos";
import UpdateTodo, { updateTodoDataLoader, updateAction } from "./todos/UpdateTodo";
import ErrorElement from "../components/ErrorElement";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" errorElement={<ErrorElement />} element={<Root />}>
			<Route index element={<Home />} />
			<Route path="contact" element={<Contact />} />
			<Route path="todos">
				<Route index element={<Todos />} loader={todosLoader} />
				<Route path=":todoId" action={manageTodoAction} />
				<Route
					path="create"
					element={<CreateTodo />}
					action={createAction}
					loader={todosLoader}
				/>
				<Route
					path="edit/:todoId"
					element={<UpdateTodo />}
					action={updateAction}
					loader={updateTodoDataLoader}
				/>
			</Route>
		</Route>
	)
);

export default function AppRoutes() {
	return <RouterProvider router={router} />;
}
