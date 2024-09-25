import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import SoilRedSubForm from "./SoilRedSubForm";
import SoilBlackSubForm from "./SoilBlackSubForm";

export const SoilDropDownValues = {
	RED: "RED",
	BLACK: "BLACK",
};

const SoilForm = () => {
	const [soilType, setSoilType] = React.useState(SoilDropDownValues.RED);
	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant="h6">Please select the type of soil you want to insert:</Typography>
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
				{soilType === SoilDropDownValues.RED && <SoilRedSubForm />}
				{soilType === SoilDropDownValues.BLACK && <SoilBlackSubForm />}
			</Grid>
		</Grid>
	);
};

export default SoilForm;
