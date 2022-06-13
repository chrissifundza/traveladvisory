import React, { useState, useEffect } from "react";
import { Card, Button, Alert, Table } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { jsPDF } from "jspdf";


export default function Dashboard() {
	const [error, setError] = useState("");
	const [arr, setArr]=useState([]);
	const [myname, setMyname] = useState("");
	const [mysurname, setMySurname] = useState("");
	const [cellphone, setCellphone] = useState("");
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	
console.log(currentUser.uid);

function displayUser() {
	
	db.collection("TOURIST").doc(currentUser.uid).onSnapshot((snap)=>{
		 
		 setMyname(snap.data().Name)
		 setMySurname(snap.data().Surname)
		 setCellphone(snap.data().Cellphone)
	})
	db.collection("TOURIST").onSnapshot((snap)=>{
		let array =[];
		
		snap.forEach(element => {
			let item={};
			array.push(item.Name=element.data().Name,
			item.Email=element.data().Email,
			item.Surname=element.data().Surname)
		});
		setArr(array)
   })
}
	async function handleLogout() {
		setError("");

		try {
			await logout();
			navigate("/");
		} catch {
			setError("Failed to log out");
		}
	}
useEffect(()=>{
	displayUser()
},[])
function generatePDF(){
	
	
	db.collection("TOURIST").get().then((snap)=>{
		let array =[];
		const doc = new jsPDF();
	
		
		let count = 0;
		
		
		snap.forEach(element => {
			count++
			let item={};
			array.push(item.No="User No. "+count,
				item.Name="Name: "+element.data().Name,
			item.Surname="Surname: "+element.data().Surname,
			item.Email="Email: "+element.data().Email,item.Line="--------------------------------------------------")
			
		});
		doc.text(array, 10, 10);
		
		
		
		doc.save("Report for all users.pdf");
   })

};
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">
						Discover Tour Guide <br />
						Profile
					</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					
					<Table striped bordered hover>
  <thead>
    <tr>
      
      <th>First Name</th>
      <th>Last Name</th>
	  <th>Cellphone</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>{myname}</td>
      <td>{mysurname}</td>
	  <td>{cellphone}</td>
      <td>{currentUser.email}</td>
    </tr>
   
  </tbody>
 
</Table>
					<Link
						to="/update-profile"
						className="btn btn-primary w-100 mt-3"
					>
						Update Profile
					</Link>
				</Card.Body>
			</Card>

			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleLogout}>
					Log Out
				</Button> <br />
				<Button variant="link" onClick={generatePDF}>
					Generate Report of All Users
				</Button>
			</div>
		</>
	);
}
