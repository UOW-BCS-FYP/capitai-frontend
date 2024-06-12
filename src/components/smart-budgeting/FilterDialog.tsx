import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, TextField } from '@mui/material';
import { useFormik } from 'formik';
import CustomRadio from '../forms/theme-elements/CustomRadio';

export interface FormValues {
    isBill: string;
    isActivated: string;
    min?: number;
    max?: number;
}
interface FilterDialogProps {
    open: boolean;
    onSubmit: (values: FormValues) => void;
    onClose: () => void;
}

export default function FilterDialog(props: FilterDialogProps) {
    const formik = useFormik({
        initialValues: {
            isBill: '',
            isActivated: '',
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
        formik.values.isBill = '';
        formik.values.isActivated = '';
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
                <Grid container style={{ width: '400px' }}>
                    {/* select date */}
                    {/* <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} /> */}
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
                            <FormLabel>Is Bill</FormLabel>
                            <RadioGroup
                                name="isBill"
                                value={formik.values.isBill}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel value="true" control={<CustomRadio />} label="True" />
                                <FormControlLabel value="false" control={<CustomRadio />} label="False" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} sx={{
                        display: 'flex',
                    }}>
                        <FormControl>
                            <FormLabel>Is Activated</FormLabel>
                            <RadioGroup
                                name="isActivated"
                                value={formik.values.isActivated}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel value="true" control={<CustomRadio />} label="True" />
                                <FormControlLabel value="false" control={<CustomRadio />} label="False" />
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

