import { NavLink } from "react-router-dom";

const links = [
	{ route: "/", text: "Home" },
	{ route: "/contact", text: "Contact" },
	{ route: "/todos", text: "Todos" },
	{ route: "/todos/create", text: "Add todos" },
];

export default function Navbar() {
	return (
		<nav style={{ display: "flex", gap: "5px" }}>
			{links.map((data: { route: string; text: string }) => (
				<NavLink
					key={data.route}
					style={({ isActive }) => {
						return {
							color: isActive ? "red" : "inherit",
						};
					}}
					to={data.route}
				>
					{data.text}
				</NavLink>
			))}
		</nav>
	);
}
