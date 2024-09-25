import { useSoilControllerGetBlackSoil } from "@api/services/soil";
import { Grid, Typography, Box } from "@mui/material";
import Loader from "@shared/components/Loader";
import React from "react";
import GooglePlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-google-places-autocomplete";

const SoilBlackType = () => {
	const [lattitude, setLattitude] = React.useState("");
	const [longitude, setLongitude] = React.useState("");

	const blackType = useSoilControllerGetBlackSoil(
		{
			latitude: parseFloat(lattitude),
			longitude: parseFloat(longitude),
		},
		{
			query: {
				enabled: !!lattitude && !!longitude,
			},
		},
	);

	if (blackType.isLoading) {
		return <Loader />;
	}

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant="h6">Please select the location to get the soil type:</Typography>
			</Grid>
			<Grid item xs={12}>
				<Box
					sx={{
						mb: 2,
						maxWidth: 200,
					}}
				>
					<GooglePlacesAutocomplete
						apiKey={"AIzaSyA--mW45cdHnpeKYxHktQ0sx5n4vHJu5D8"}
						selectProps={{
							placeholder: "Enter Address",
							onChange: async (value) => {
								if (!value) return;
								const a = await geocodeByAddress(value?.label);
								const latLng = await getLatLng(a[0]);
								setLattitude(latLng.lat.toString());
								setLongitude(latLng.lng.toString());
							},
						}}
						debounce={200}
					/>
				</Box>
			</Grid>
			<Grid item xs={12}>
				{blackType?.data?.map((data) => {
					return (
						<Box key={data.id} sx={{ border: 1, p: 2, mt: 1 }}>
							<Typography variant="h6">Address: {data.address}</Typography>
							<Typography variant="h6">Latitude: {data.latitude}</Typography>
							<Typography variant="h6">Longitude: {data.longitude}</Typography>
							<Typography variant="h6">Cotton: {data.cotton}</Typography>
							<Typography variant="h6">Wheat: {data.wheat}</Typography>
							<Typography variant="h6">Rice: {data.rice}</Typography>
							<Typography variant="h6">Sugarcane: {data.sugarcane}</Typography>
							<Typography variant="h6">Maize: {data.maize}</Typography>
						</Box>
					);
				})}
			</Grid>
		</Grid>
	);
};

export default SoilBlackType;
