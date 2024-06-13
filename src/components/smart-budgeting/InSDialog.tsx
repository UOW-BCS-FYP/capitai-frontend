import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, TextField } from '@mui/material';
import { InSRecordType } from '../../types/smart-budgeting';
import { useFormik } from 'formik';
import CustomRadio from '../forms/theme-elements/CustomRadio';

interface FormValues {
    id?: number;
    title: string;
    amount: number;
    date: Date;
    subject: string;
    category?: string;
    isIncome: boolean;
}
interface InSDialogProps {
    editInS?: InSRecordType;
    open: boolean;
    onSubmit: (values: FormValues) => void;
    onClose: () => void;
}

export default function InSDialog(props: InSDialogProps) {
    const formik = useFormik({
        initialValues: {
            title: '',
            amount: 0,
            date: '',
            subject: '',
            isIncome: true,
            ...props.editInS
        },
        //validationSchema: validationSchema,
        onSubmit: (values) => {
            //https://stackoverflow.com/questions/70011074/mui-radio-button-group-returning-strings-despite-providing-it-with-boolean-value
            if (values.isIncome === 'true') values.isIncome = true;
            else if (values.isIncome === 'false') values.isIncome = false;
            props.onSubmit(values);
        },
    });

    const handleClose = () => {
        props.onClose();
    };

    const isEdit = props.editInS !== undefined;
    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: formik.handleSubmit,
            }}
        >
            <DialogTitle>{isEdit ? (props.editInS?.isIncome ? 'Edit Income Record' : 'Edit Spending Record') : 'New Income/Spending Record'}</DialogTitle>
            <DialogContent>
                <Grid container style={{ width: '400px' }}>
                    {/* select date */}
                    {/* <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} /> */}
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            label="Title"
                            type="text"
                            variant="standard"
                            style={{ width: '100%' }}
                            inputProps={{
                                maxLength: 20
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={5}>
                        <TextField
                            margin="dense"
                            id="subject"
                            name="subject"
                            onChange={formik.handleChange}
                            value={formik.values.subject}
                            label={formik.values.isIncome === 'true' ? 'Received from' : 'Issued to'}
                            type="text"
                            variant="standard"
                            style={{ width: '100%' }}
                            inputProps={{
                                maxLength: 20
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            id="amount"
                            name="amount"
                            onChange={formik.handleChange}
                            value={formik.values.amount}
                            label="Amount"
                            type="number"
                            style={{ width: '100%' }}
                            variant="standard"
                            inputProps={{
                                min: 1
                            }}
                            required
                        />
                    </Grid>
                    {!isEdit ?
                        <Grid item xs={6} sx={{ display: 'flex' }}>
                            <FormControl>
                                <FormLabel>Income/Spending</FormLabel>
                                <RadioGroup
                                    name="isIncome"
                                    value={formik.values.isIncome}
                                    onChange={formik.handleChange}
                                >
                                    <FormControlLabel value={true} control={<CustomRadio />} label="Income" />
                                    <FormControlLabel value={false} control={<CustomRadio />} label="Spending" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    : ''}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

