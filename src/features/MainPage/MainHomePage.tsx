import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import SoilForm from "./Forms/SoilForm";

export const MainType = {
	SOIL: "SOIL",
	WEATHER: "WEATHER",
	CROP: "CROP",
};

const MainHomePage = () => {
	const [type, setType] = React.useState(MainType.SOIL);
	const handleChange = (value: string) => {
		setType(value);
	};
	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant="h3" mb={2}>
					Welcome to the Data Insertion Page
				</Typography>

				<Typography variant="h6">Select the type of data you want to insert:</Typography>
				<Autocomplete
					sx={{
						maxWidth: 200,
					}}
					options={Object.values(MainType)}
					renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
					value={type}
					onChange={(_, value) => {
						if (value) {
							handleChange(value);
						}
					}}
				/>

				{MainType?.SOIL === type && <SoilForm />}
			</Grid>
		</Grid>
	);
};

export default MainHomePage;
