// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    IconButton,
    Tooltip,
    FormControlLabel,
    Typography,
    TextField,
    InputAdornment,
    Paper,
    Fab,
    Stack,
    Skeleton,
    TableCellProps,
    Grid,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from 'src/store/Store';
import CustomCheckbox from '../forms/theme-elements/CustomCheckbox';
import CustomSwitch from '../forms/theme-elements/CustomSwitch';
import { IconFilter, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { addExpInc, deleteExpInc, fetchExpInc, updateExpInc } from 'src/store/smart-budgeting/ExpectedIncomeSlice';
import { useState } from 'react';
import ExpectedIncomeDialog from './ExpectedIncomeDialog';
import { ExpectedIncomeType } from 'src/types/smart-budgeting';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmDialog from '../shared/DeleteConfirmDialog';
import FilterDialog from './FilterDialog';

type Order = 'asc' | 'desc';

interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
    paddingType: "normal" |"checkbox"|"none"|undefined;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Title',
        paddingType: 'normal',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
        paddingType: 'checkbox'
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'Amount',
        paddingType: 'normal'
    }
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <CustomCheckbox
                        color="primary"
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : headCell.paddingType}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell>
                    Action
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableCell = (props: TableCellProps & { loading?: boolean; children: React.ReactNode }) => {
    const { loading, children, ...rest } = props;
    return (
        <TableCell {...rest}>
            {loading ? (
                <Skeleton width="100%" animation="wave">
                {children}
                </Skeleton>
            ) : (
                children
            )}
        </TableCell>
    );
}

const ExpectedIncomeTableRow = (
    props: {
        row: ExpectedIncomeType,
        isItemSelected: boolean,
        labelId: string,
        handleClick: (event: React.MouseEvent<unknown>, name: string) => void,
        loading: boolean
        refetch: () => void
    }
) => {
    const { row, isItemSelected, labelId, handleClick, loading, refetch } = props;

    const dispatch = useDispatch();
    const [openDel, setDelDialog] = useState(false);
    const [openEdit, setEditDialog] = useState(false);

    const handleDelClose = () => {
        setDelDialog(false);
    };

    const handleEditClose = () => {
        setEditDialog(false);
    };

    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.title}
            selected={isItemSelected}
        >
            <EnhancedTableCell padding="checkbox" loading={loading}>
                <CustomCheckbox
                    onClick={(event) => handleClick(event, row.title)}
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                />
            </EnhancedTableCell>

            <EnhancedTableCell loading={loading}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" fontWeight="600">
                        {row.title}
                    </Typography>
                </Box>
            </EnhancedTableCell>

            <EnhancedTableCell loading={loading}>
                <Box display="flex" alignItems="center">
                    <Box
                        sx={{
                            backgroundColor: row.isActivated
                                ? (theme) => theme.palette.success.main
                                : (theme) => theme.palette.error.main,
                            borderRadius: '100%',
                            height: '10px',
                            width: '10px',
                        }}
                    />
                    <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        sx={{
                            ml: 1,
                        }}
                    >
                        {row.isActivated ? 'Active' : 'Inactive'}
                    </Typography>
                </Box>
            </EnhancedTableCell>

            <EnhancedTableCell loading={loading}>
                <Typography fontWeight={600} variant="h6">
                    ${row.amount}
                </Typography>
            </EnhancedTableCell>

            <EnhancedTableCell loading={loading}>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <IconButton size="small" onClick={() => setEditDialog(true)}>
                            <EditIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton size="small" onClick={() => setDelDialog(true)}>
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </EnhancedTableCell>
            <DeleteConfirmDialog
                open={openDel}
                onClose={handleDelClose}
                onSubmit={() =>
                    dispatch(deleteExpInc(row))
                        .then(refetch)
                }
            />
            <ExpectedIncomeDialog
                open={openEdit}
                onClose={handleEditClose}
                onSubmit={(values) =>
                    dispatch(updateExpInc({
                        ...values
                    }))
                        .then(handleEditClose)
                        .then(refetch)
                }
                editExpInc={row}
            />
        </TableRow>
    );
};

interface EnhancedTableToolbarProps {
    numSelected: number;
    handleSearch: React.ChangeEvent<HTMLInputElement> | any;
    search: string;
    handleAdd: React.ChangeEvent<HTMLInputElement> | any;
    handleDelMultiple: () => void;
    handleFilter: (values: any) => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, handleSearch, search, handleAdd, handleDelMultiple, handleFilter } = props;
    const [openDel, setDelDialog] = useState(false);
    const [openFilter, setFilterDialog] = useState(false);

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <></>
            ) : (
                <Box>
                    <Stack>
                        <Tooltip title="Add" placement="bottom">
                            <Fab size="small" color="info" onClick={handleAdd}>
                                <IconPlus size="16" />
                            </Fab>
                        </Tooltip>
                    </Stack>
                </Box>
            )}
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Box sx={{ flex: '1 1 100%' }}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconSearch size="1.1rem" />
                                </InputAdornment>
                            ),
                        }}
                        placeholder="Search Expected Income"
                        size="small"
                        onChange={handleSearch}
                        value={search}
                    />
                </Box>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={() => setDelDialog(true)}>
                        <IconTrash width="18" />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton onClick={()=>setFilterDialog(true)}>
                        <IconFilter size="1.2rem" />
                    </IconButton>
                </Tooltip>
            )}
            <DeleteConfirmDialog
                open={openDel}
                onClose={() => setDelDialog(false)}
                onSubmit={handleDelMultiple}
            />
            <FilterDialog
                open={openFilter}
                onClose={() => setFilterDialog(false)}
                onSubmit={handleFilter}
            />
        </Toolbar>
    );
};

const ExpectedIncomeTableList = () => {
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [dense, setDense] = React.useState(false);
    const dispatch = useDispatch();
    const totalCount = useSelector((state) => state.expectedIncomeReducer.totalExpectedIncomes);
    const records = useSelector((state) => state.expectedIncomeReducer.expectedIncomes);
    const fetchStatus = useSelector((state) => state.expectedIncomeReducer.fetchExpectedIncomeStatus);
    const fetchFilter = useSelector((state) => state.expectedIncomeReducer.fetchExpectedIncomeFilter);
    const page = fetchFilter.page ?? 0;
    const rowsPerPage = fetchFilter.rowsPerPage ?? 5;
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = useSelector(() => Math.max(0, (totalCount ? Math.min(rowsPerPage, totalCount) : rowsPerPage) - records?.length));

    const [openDialog, setOpenDialog] = useState(false);


    //Fetch Expected incomes
    React.useEffect(() => {
        // dispatch(fetchExpInc());
        if (fetchStatus === 'idle') {
            dispatch(fetchExpInc(fetchFilter));
        }
    }, [dispatch]);

    // const getExpInc: ExpectedIncomeType[] = useSelector((state) => state.expectedIncomeReducer.expectedIncomes);

    // const [rows, setRows] = React.useState<any>(getExpInc);
    // const [search, setSearch] = React.useState('');

    // React.useEffect(() => {
    //     setRows(getExpInc);
    // }, [getExpInc]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(fetchExpInc({ query: event.target.value }));
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
        dispatch(fetchExpInc({ sortBy: property, sortOrder: fetchFilter.sortOrder === 'asc' ? 'desc' : 'asc' }));
    };

    // This is for select all the row
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = records.map((n: any) => n.title);
            setSelected(newSelecteds);

            return;
        }
        setSelected([]);
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(fetchExpInc({ page: newPage }));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(fetchExpInc({ rowsPerPage: parseInt(event.target.value, 10), page: 0 }));
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const handleFilter = (values: any) => {
        dispatch(fetchExpInc({ isRegular: values.isRegular, isActivated: values.isActivated, min: values.min, max: values.max }));
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const theme = useTheme();
    const borderColor = theme.palette.divider;

    return (
        <Box>
            <Box>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    search={fetchFilter.query ?? ''}
                    handleSearch={(event: any) => handleSearch(event)}
                    handleAdd={() => setOpenDialog(true)}  
                    handleDelMultiple={() => selected.forEach(row => {
                        dispatch(deleteExpInc(
                            records.filter(expInc => expInc.title === row)[0]
                        )).then(() => { dispatch(fetchExpInc(fetchFilter)); setSelected([]); })
                    })}
                    handleFilter={(values) => handleFilter(values)}
                />
                <Paper variant="outlined" sx={{ mx: 2, mt: 1, border: `1px solid ${borderColor}` }}>
                    <TableContainer>
                        <Table
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={fetchFilter.sortOrder ?? 'asc'}
                                orderBy={fetchFilter.sortBy ?? ''}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={totalCount ?? 0}
                            />
                            <TableBody>
                                {records
                                    ?.map((row, index) => {
                                        const isItemSelected = isSelected(row.title);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <ExpectedIncomeTableRow
                                                key={row.title}
                                                row={row}
                                                isItemSelected={isItemSelected}
                                                labelId={labelId}
                                                handleClick={handleClick}
                                                loading={fetchStatus === 'loading'}
                                                refetch={() => dispatch(fetchExpInc(fetchFilter))}
                                            />
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}>
                                            { fetchStatus === 'loading' && records.length === 0 && <Skeleton variant="rectangular" width="100%" height={emptyRows * 53} animation="wave"></Skeleton>}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalCount ?? 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <Box ml={2}>
                    <FormControlLabel
                        control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
                        label="Dense padding"
                    />
                </Box>
            </Box>
            <ExpectedIncomeDialog
                open={openDialog}
                onClose={handleDialogClose}
                onSubmit={(values) =>
                    dispatch(addExpInc({
                        ...values
                    }))
                        .then(handleDialogClose)
                        .then(() => { dispatch(fetchExpInc(fetchFilter)) })
                }
            />
        </Box>
    );
};

export default ExpectedIncomeTableList;
