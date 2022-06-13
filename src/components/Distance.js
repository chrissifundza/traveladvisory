import React, { useState, useRef, useEffect } from "react";
import {
	Box,
	Button,
	ButtonGroup,
	Flex,
	HStack,
	IconButton,
	Input,
	Text,
	SkeletonText,
	ChakraProvider,
	theme,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
	useJsApiLoader,
	GoogleMap,
	Marker,
	Autocomplete,
	DirectionsRenderer,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";


export default function Distance() {
	const [latitude, setLatitude] = useState("");
const [longitude, setLongitude] = useState("");

useEffect(()=>{
navigator.geolocation.getCurrentPosition((position)=>{
	console.log(position.coords.latitude)
	setLatitude(position.coords.latitude);
	setLongitude(position.coords.longitude)
})
},[])
const center = { lat: latitude, lng: longitude };
	const [map, setMap] = useState(/** @type google.maps.Map */ (null));
	const [directionsResponse, setDirectionsResponse] = useState(null);
	const [distance, setDistance] = useState("");
	const [duration, setDuration] = useState("");
	/** @type React.MutableRefObject<HTMLInputElement> */
	const originRef = useRef();
	/** @type React.MutableRefObject<HTMLInputElement> */
	const distiantRef = useRef();

	async function calculateRoute() {
		if (originRef.current.value === "" || distiantRef.current.value == "") {
		}
		/* eslint-disable no-undef */
		const directionsService = new google.maps.DirectionsService();
		const results = await directionsService.route({
			origin: originRef.current.value,
			destination: distiantRef.current.value,
			/* eslint-disable no-undef */
			travelMode: google.maps.TravelMode.DRIVING,
		});
		setDirectionsResponse(results);
		setDistance(results.routes[0].legs[0].distance.text);
		setDuration(results.routes[0].legs[0].duration.text);
	}
	function clearRoute() {
		setDirectionsResponse(null);
		setDistance("");
		setDuration("");
		originRef.current.value = "";
		distiantRef.current.value = "";
	}
	return (
		<ChakraProvider theme={theme}>
			<Flex
				position="relative"
				flexDirection="column"
				alignItems="center"
				h="100vh"
				w="100vw"
			>
				<Box position="absolute" left={0} top={0} h="100%" w="100%">
					<GoogleMap
						center={center}
						zoom={15}
						mapContainerStyle={{ width: "100%", height: "100%" }}
						onLoad={(map) => setMap(map)}
					>
						<Marker position={center} />
						{directionsResponse && (
							<DirectionsRenderer
								directions={directionsResponse}
							/>
						)}
					</GoogleMap>
				</Box>

				<Box
					p={4}
					borderRadius="lg"
					mt={4}
					bgColor="white"
					shadow="base"
					minW="container.md"
					zIndex="modal"
				>
					<HStack spacing={4}>
						<Autocomplete>
							<Input
								type="text"
								placeholder="Origin"
								ref={originRef}
							/>
						</Autocomplete>
						<Autocomplete>
							<Input
								type="text"
								placeholder="Destination"
								ref={distiantRef}
							/>
						</Autocomplete>
						<ButtonGroup>
							<Button
								colorScheme="blue"
								type="submit"
								onClick={calculateRoute}
							>
								Calculate Route
							</Button>
							<IconButton
								aria-label="center back"
								icon={<FaTimes />}
								onClick={clearRoute}
							/>
							<Link to="/dashboard">Home</Link>
						</ButtonGroup>
					</HStack>
					<HStack spacing={4} mt={4} justifyContent="space-between">
						<Text>Distance: {distance} </Text>
						<Text>Duration: {duration} </Text>
						<IconButton
							aria-label="center back"
							icon={<FaLocationArrow />}
							isRound
							onClick={() => map.panTo(center)}
						/>
					</HStack>
				</Box>
			</Flex>
		</ChakraProvider>
	);
}
