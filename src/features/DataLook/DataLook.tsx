import { MainType } from "@features/MainPage/MainHomePage";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import SoilTypes from "./Sub/SoilTypes";

const DataLook = () => {
	const [type, setType] = React.useState(MainType.SOIL);
	const handleChange = (value: string) => {
		setType(value);
	};
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Typography variant="h4">Data Look</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h6">Select the type of data you want to look:</Typography>
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
			</Grid>
			<Grid item xs={12}>
				{MainType?.SOIL === type && <SoilTypes />}
			</Grid>
		</Grid>
	);
};

export default DataLook;
