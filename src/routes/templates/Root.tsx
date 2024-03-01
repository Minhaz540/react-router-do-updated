import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";

export default function Root() {
	const navigation = useNavigation();
	return (
		<>
			<Navbar />
			{navigation.state === "loading" ? <Loading /> : <Outlet />}
		</>
	);
}
