import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import GooglePlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-google-places-autocomplete";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { useSoilControllerCreateBlackSoil } from "@api/services/soil";

const SoilBlackSubForm = () => {
	const createBlackSoil = useSoilControllerCreateBlackSoil();
	const initialValues = {
		address: "",
		latitude: "",
		longitude: "",
		cotton: "",
		wheat: "",
		maize: "",
		subflower: "",
		surgarcane: "",
		rice: "",
	};

	const validationSchema = Yup.object({
		address: Yup.string().required("Required"),
		latitude: Yup.string().required("Required"),
		longitude: Yup.string().required("Required"),
		cotton: Yup.string().required("Required"),
		wheat: Yup.string().required("Required"),
		maize: Yup.string().required("Required"),
		subflower: Yup.string().required("Required"),
		rice: Yup.string().required("Required"),
		surgarcane: Yup.string().required("Required"),
	});

	const handleSubmit = async (
		values: typeof initialValues,
		actions: FormikHelpers<typeof initialValues>,
	) => {
		try {
			await createBlackSoil.mutateAsync({
				data: {
					address: values.address,
					latitude: parseFloat(values.latitude),
					longitude: parseFloat(values.longitude),
					cotton: parseFloat(values.cotton),
					wheat: parseFloat(values.wheat),
					maize: parseFloat(values.maize),
					sunflower: parseFloat(values.subflower),
					sugarcane: parseFloat(values.surgarcane),
					rice: parseFloat(values.rice),
				},
			});
			actions.resetForm();
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<Grid container>
			<Grid item xs={6}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(formik) => {
						return (
							<Form>
								<Typography variant="h5" my={2}>
									Enter Soil Data
								</Typography>
								<Box
									sx={{
										mb: 2,
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
												formik.setFieldValue("address", value?.label);
												formik.setFieldValue("latitude", latLng.lat);
												formik.setFieldValue("longitude", latLng.lng);
											},
										}}
										debounce={200}
									/>
								</Box>
								<Field name="cotton" type="number" component={TextFormField} label="Cotton" />
								<Field name="wheat" type="number" component={TextFormField} label="Wheat" />
								<Field name="maize" type="number" component={TextFormField} label="Maize" />
								<Field name="subflower" type="number" component={TextFormField} label="Subflower" />
								<Field
									name="surgarcane"
									type="number"
									component={TextFormField}
									label="Surgarcane"
								/>
								<Field name="rice" type="number" component={TextFormField} label="Rice" />
								<Button variant="contained" color="primary" type="submit">
									Submit
								</Button>
							</Form>
						);
					}}
				</Formik>
			</Grid>
		</Grid>
	);
};

export default SoilBlackSubForm;
