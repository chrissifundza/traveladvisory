import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Distance from "./Distance";
import UpdateProfile from "./UpdateProfile";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route
						exact
						path="/dashboard"
						element={<PrivateRoute component={Dashboard} />}
					/>
					<Route
						exact
						path="/distance"
						element={<PrivateRoute component={Distance} />}
					/>
					<Route
						exact
						path="/profile"
						element={<PrivateRoute component={Profile} />}
					/>
					<Route
						exact
						path="/update-profile"
						element={<PrivateRoute component={UpdateProfile} />}
					/>
					<Route exact path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/forgot-password"
						element={<ForgotPassword />}
					/>
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
