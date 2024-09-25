import { Formik, Form, FormikHelpers, Field } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { useSoilControllerCreateRedSoil } from "@api/services/soil";

const SoilRedSubForm = () => {
	const createRedSoil = useSoilControllerCreateRedSoil();

	const initialValues = {
		address: "",
		latitude: "",
		longitude: "",
		groundNut: "",
		kagi: "",
		pulses: "",
		vegetables: "",
		cerales: "",
	};

	const validationSchema = Yup.object({
		address: Yup.string().required("Required"),
		latitude: Yup.string().required("Required"),
		longitude: Yup.string().required("Required"),
		groundNut: Yup.string().required("Required"),
		kagi: Yup.string().required("Required"),
		pulses: Yup.string().required("Required"),
		vegetables: Yup.string().required("Required"),
		cerales: Yup.string().required("Required"),
	});

	const handleSubmit = async (
		values: typeof initialValues,
		actions: FormikHelpers<typeof initialValues>,
	) => {
		try {
			await createRedSoil.mutateAsync({
				data: {
					address: values.address,
					latitude: parseFloat(values.latitude),
					longitude: parseFloat(values.longitude),
					groundnut: parseFloat(values.groundNut),
					kagi: parseFloat(values.kagi),
					pulse: parseFloat(values.pulses),
					vegetable: parseFloat(values.vegetables),
					cereal: parseFloat(values.cerales),
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
								<Field
									name="groundNut"
									label="Ground Nut"
									type="number"
									component={TextFormField}
								/>
								<Field name="kagi" label="Kagi" type="number" component={TextFormField} />
								<Field name="pulses" label="Pulses" type="number" component={TextFormField} />
								<Field
									name="vegetables"
									label="Vegetables"
									type="number"
									component={TextFormField}
								/>
								<Field name="cerales" label="Cerales" type="number" component={TextFormField} />
								<Button type="submit" variant="contained" color="primary">
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

export default SoilRedSubForm;
