import { SoilDropDownValues } from "@features/MainPage/Forms/SoilForm";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import SoilRedType from "./SoilRedType";
import SoilBlackType from "./SoilBlackType";

const SoilTypes = () => {
	const [soilType, setSoilType] = React.useState(SoilDropDownValues.RED);
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Typography variant="h6">Please select the type of soil you want to look:</Typography>
				<Autocomplete
					sx={{
						maxWidth: 200,
					}}
					options={Object.values(SoilDropDownValues)}
					renderInput={(params) => <TextField {...params} label="Soil Type" variant="outlined" />}
					value={soilType}
					onChange={(_, value) => {
						if (value) {
							setSoilType(value);
						}
					}}
				/>
			</Grid>
			<Grid item xs={12}>
				{soilType === SoilDropDownValues.RED && <SoilRedType />}
				{soilType === SoilDropDownValues.BLACK && <SoilBlackType />}
			</Grid>
		</Grid>
	);
};

export default SoilTypes;
