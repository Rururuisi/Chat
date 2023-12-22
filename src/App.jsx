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

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/'>
					<Route
						index
						element={
							<ProtectedRoute
								condition={!currentUser}
								path={"/login"}
								element={<Home />}
							/>
						}
					/>
					<Route
						path='login'
						element={
							<ProtectedRoute
								condition={currentUser}
								path={"/"}
								element={<Login />}
							/>
						}
					/>
					<Route
						path='register'
						element={
							<ProtectedRoute
								condition={currentUser}
								path={"/"}
								element={<Register />}
							/>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
