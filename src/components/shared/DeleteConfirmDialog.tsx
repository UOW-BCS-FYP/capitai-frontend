import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions } from '@mui/material';

interface DeleteConfirmDialogProps {
    open: boolean;
    onSubmit: () => void;
    onClose: () => void;
}

export default function DeleteConfirmDialog(props: DeleteConfirmDialogProps) {

    const handleClose = () => {
        props.onClose();
    };

    const handleSubmit = () => {
        props.onSubmit();
        handleClose();
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
        >
            <DialogTitle>Confirm Delete?</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

