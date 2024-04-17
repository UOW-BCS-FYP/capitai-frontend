import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, DialogActions, FormControlLabel, Grid, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function BudgetingCategoryDialog(props: { open: boolean, onClose: () => void }) {
    
    const handleClose = () => {
        props.onClose();
    };

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    console.log(formJson);
                    handleClose();
                },
            }}
        >
            <DialogTitle>New Budget Category</DialogTitle>
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
                        <FormControlLabel
                            control={
                                <Checkbox color="primary"
                                    icon={<CheckBoxOutlineBlankIcon />}
                                    checkedIcon={<CheckBoxIcon />}
                                    name="isBill"
                                    checked={checked}
                                    onChange={handleChange}
                                />
                            }
                            label="Bill"
                            defaultChecked= {false}
                        />
                    </Grid>
                    <Grid item xs={6} justifyContent="center">
                        <TextField
                        margin="dense"
                        id="interval"
                        name="interval"
                        label="Months per payment"
                        type="number"
                        style={{ width: '100%' }}
                        variant="standard"
                        inputProps={{
                            min: 2
                        }}
                        required = {checked ? true : false}
                        disabled = {checked ? false : true}
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

