import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";

import Distance from "./Distance";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route
						exact
						path="/"
						element={<PrivateRoute component={Dashboard} />}
					/>
					<Route
						exact
						path="/distance"
						element={<PrivateRoute component={Distance} />}
					/>
				
					
					
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
