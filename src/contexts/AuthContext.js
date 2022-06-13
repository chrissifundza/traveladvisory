import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [currentUserID, setCurrentUserID] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password,myName,mySurname,cellphone) {
		
		return (
			
			auth.createUserWithEmailAndPassword(email, password).then( ()=>{
				 db.collection("TOURIST").doc(auth.currentUser.uid).set({
					Name:myName,
					Surname:mySurname,
					Email:email,
					Cellphone:cellphone
				})
			})
			);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setCurrentUserID(user)
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
