import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, DialogActions, FormControlLabel, Grid, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ExpectedIncomeType } from '../../types/smart-budgeting';
import { useFormik } from 'formik';

interface FormValues {
    id?: number;
    title: string;
    amount: number;
    isRegular: boolean;
    isActivated: boolean;
    intervalMonth?: number;
}
interface ExpectedIncomeDialogProps {
    editExpInc?: ExpectedIncomeType;
    open: boolean;
    onSubmit: (values: FormValues) => void;
    onClose: () => void;
}

export default function ExpectedIncomeDialog(props: ExpectedIncomeDialogProps) {
    const formik = useFormik({
        initialValues: {
            title: '',
            amount: 0,
            isRegular: false,
            isActivated: true,
            intervalMonth: 0,
            ...props.editExpInc
        },
        //validationSchema: validationSchema,
        onSubmit: (values) => {
            props.onSubmit(values);
        },
    });

    const handleClose = () => {
        props.onClose();
    };

    const isEdit = props.editExpInc !== undefined;
    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: formik.handleSubmit,
            }}
        >
            {isEdit ? <DialogTitle>Edit Expected Income</DialogTitle> : <DialogTitle>New Expected Income</DialogTitle>}
            <DialogContent>
                <Grid container style={{ width: '400px' }}>
                    {/* select date */}
                    {/* <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} /> */}
                    <Grid item xs={12}>
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
                    <Grid item xs={6} sx={{
                        display: 'flex',
                    }}>
                        <Grid item xs={3} sx={{
                            display: 'flex',
                        }}>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary"
                                        icon={<CheckBoxOutlineBlankIcon />}
                                        checkedIcon={<CheckBoxIcon />}
                                        name="isBill"
                                        onChange={formik.handleChange}
                                        defaultChecked={formik.values.isRegular}
                                    />
                                }
                                label="Bill"
                            />
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={1} sx={{
                            display: 'flex',
                        }}>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary"
                                        icon={<CheckBoxOutlineBlankIcon />}
                                        checkedIcon={<CheckBoxIcon />}
                                        name="isActivated"
                                        onChange={formik.handleChange}
                                        defaultChecked={formik.values.isActivated}
                                    />
                                }
                                label="Activate"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6} justifyContent="center">
                        <TextField
                            margin="dense"
                            id="intervalMonth"
                            name="intervalMonth"
                            onChange={formik.handleChange}
                            label="Months per payment"
                            type="number"
                            style={{ width: '100%' }}
                            variant="standard"
                            inputProps={{
                                min: 1
                            }}
                            required={formik.values.isRegular}
                            disabled={!formik.values.isRegular}
                            value={formik.values.intervalMonth}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

