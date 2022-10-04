import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
	AppBar,
	Toolbar,
	Typography,
	InputBase,
	MenuItem,
	Select,
	Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "react-bootstrap";
import useStyles from "./styles.js";
import { Link } from "react-router-dom";

const Header = ({ onPlaceChanged, onLoad }) => {
	const classes = useStyles();
	function handleLogout() {}

	return (
		<AppBar position="static" color="primary">
			<Toolbar className={classes.toolbar}>
				<Typography variant="h5" className={classes.title}>
					Discover Tour Guide
					<Select id="type" value={"LogOut"}>
						<MenuItem value="profile">
							
						</MenuItem>
						<MenuItem value="point">
							<Link to="/distance" View Profile>
								Calculate Distance
							</Link>
						</MenuItem>
					</Select>
				</Typography>{" "}
				<Box display="flex">
					<Typography variant="h6" className={classes.title}>
						Explore new places
					</Typography>

					<Autocomplete
						onLoad={onLoad}
						onPlaceChanged={onPlaceChanged}
					>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
							/>{" "}
						</div>
					</Autocomplete>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
