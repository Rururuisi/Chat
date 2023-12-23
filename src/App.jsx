import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/auth.context";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
	const { currentUser } = useContext(AuthContext);

	const ProtectedRoute = ({ condition, path, element }) => {
		if (condition) {
			return <Navigate to={path}>{element}</Navigate>;
		}
		return element;
	};

	const HomeNavigator = () => {
		return (
			<ProtectedRoute
				condition={!currentUser}
				path={"/login"}
				element={<Home />}
			/>
		);
	};

	const LoginNavigator = () => {
		return (
			<ProtectedRoute
				condition={currentUser}
				path={"/"}
				element={<Login />}
			/>
		);
	};

	const RegisterNavigator = () => {
		return (
			<ProtectedRoute
				condition={currentUser}
				path={"/"}
				element={<Register />}
			/>
		);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/'>
					<Route index element={<HomeNavigator />} />
					<Route path='login' element={<LoginNavigator />} />
					<Route path='register' element={<RegisterNavigator />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
