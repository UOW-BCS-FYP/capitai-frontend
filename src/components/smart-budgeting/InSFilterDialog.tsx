import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, DialogActions, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, TextField } from '@mui/material';
import { useFormik } from 'formik';
import CustomRadio from '../forms/theme-elements/CustomRadio';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';

export interface FormValues {
    dateStart?: Date;
    dateEnd?: Date;
    isIncome: string;
    category: string;
    min?: number;
    max?: number;
}
interface FilterDialogProps {
    open: boolean;
    onSubmit: (values: FormValues) => void;
    onClose: () => void;
}

export default function InSFilterDialog(props: FilterDialogProps) {

    const formik = useFormik({
        initialValues: {
            dateStart: undefined,
            dateEnd: undefined,
            isIncome: '',
            category: '',
            min: undefined,
            max: undefined,
        },
        //validationSchema: validationSchema,
        onSubmit: (values) => {
            props.onSubmit(values);
            handleClose();
        }
    });

    const handleClose = () => {
        props.onClose();
    };

    const handleReset = () => {
        formik.values.dateStart = undefined;
        formik.values.dateEnd = undefined;
        formik.values.isIncome = '';
        formik.values.category = '';
        formik.values.min = undefined;
        formik.values.max = undefined;
        props.onSubmit(formik.values);
        handleClose();
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: formik.handleSubmit,
            }}
        >
            <DialogTitle>Filter Options</DialogTitle>
            <DialogContent>
                <Box>
                    <CustomFormLabel>Start by</CustomFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            onChange={(newValue) => {
                                formik.setFieldValue('dateStart', newValue)
                            }}
                            renderInput={(inputProps) => (
                                <CustomTextField
                                    fullWidth
                                    id="dateStart"
                                    name="dateStart"
                                    variant="outlined"
                                    size="small"
                                    inputProps={{ 'aria-label': 'basic date picker' }}
                                    {...inputProps}
                                />
                            )}
                            value={formik.values.dateStart}
                        />
                    </LocalizationProvider>
                </Box>
                <Box>
                    <CustomFormLabel>End before</CustomFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            onChange={(newValue) => {
                                formik.setFieldValue('dateEnd', newValue)
                            }}
                            renderInput={(inputProps) => (
                                <CustomTextField
                                    fullWidth
                                    id="dateEnd"
                                    name="dateEnd"
                                    variant="outlined"
                                    size="small"
                                    inputProps={{ 'aria-label': 'basic date picker' }}
                                    {...inputProps}
                                />
                            )}
                            value={formik.values.dateEnd}
                        />
                    </LocalizationProvider>
                </Box>
                <Grid container style={{ width: '400px' }}>
                <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        id="min"
                        name="min"
                        onChange={formik.handleChange}
                        value={formik.values.min}
                        label="Minimum amount"
                        type="number"
                        style={{ width: '90%' }}
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        id="max"
                        name="max"
                        onChange={formik.handleChange}
                        value={formik.values.max}
                        label="Maximum amount"
                        type="number"
                        style={{ width: '90%' }}
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={6} sx={{
                    display: 'flex',
                }}>
                    <FormControl>
                        <FormLabel>Type</FormLabel>
                        <RadioGroup
                            name="isIncome"
                            value={formik.values.isIncome}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value="true" control={<CustomRadio />} label="Income" />
                            <FormControlLabel value="false" control={<CustomRadio />} label="Spending" />
                        </RadioGroup>
                    </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleReset}>Reset</Button>
                <Button type="submit">Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

