import { useSoilControllerGetRedSoil } from "@api/services/soil";
import { Box, Grid, Typography } from "@mui/material";
import Loader from "@shared/components/Loader";
import React from "react";
import GooglePlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-google-places-autocomplete";

const SoilRedType = () => {
	const [lattitude, setLattitude] = React.useState("");
	const [longitude, setLongitude] = React.useState("");
	const redType = useSoilControllerGetRedSoil(
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

	if (redType.isLoading) {
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
				{redType?.data?.map((data) => {
					return (
						<Box key={data.id} sx={{ border: 1, p: 2, mt: 1 }}>
							<Typography variant="h6">Address: {data.address}</Typography>
							<Typography variant="h6">Latitude: {data.latitude}</Typography>
							<Typography variant="h6">Longitude: {data.longitude}</Typography>
							<Typography variant="h6">Groundnut: {data.groundnut}</Typography>
							<Typography variant="h6">Kagi: {data.kagi}</Typography>
							<Typography variant="h6">Pulse: {data.pulse}</Typography>
							<Typography variant="h6">Vegetable: {data.vegetable}</Typography>
							<Typography variant="h6">Cereal: {data.cereal}</Typography>
						</Box>
					);
				})}
			</Grid>
		</Grid>
	);
};

export default SoilRedType;
