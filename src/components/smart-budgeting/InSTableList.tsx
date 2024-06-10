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
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from 'src/store/Store';
import CustomCheckbox from '../forms/theme-elements/CustomCheckbox';
import CustomSwitch from '../forms/theme-elements/CustomSwitch';
import { IconDotsVertical, IconFilter, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { fetchInS } from 'src/store/smart-budgeting/InSRecordSlice';
import { SortOrder } from 'src/types/common';

interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
    paddingType: "normal" | "checkbox" | "none" | undefined;
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
        id: 'type',
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
    },
    {
        id: 'issuedOn',
        numeric: false,
        disablePadding: false,
        label: 'Issued On',
        paddingType: 'normal'
    },
    {
        id: 'subject',
        numeric: false,
        disablePadding: false,
        label: 'Received from/Issued to',
        paddingType: 'normal',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'category',
        paddingType: 'normal',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: SortOrder;
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
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
    handleSearch: React.ChangeEvent<HTMLInputElement> | any;
    search: string;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, handleSearch, search } = props;

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
                            <Fab size="small" color="info">
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
                    <IconButton>
                        <IconTrash width="18" />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <IconFilter size="1.2rem" />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

const I_STableList = () => {
    const [dense, setDense] = React.useState(false);
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const records = useSelector((state) => state.InSRecordRecuder.InSRecords);
    const totalRecord = useSelector((state) => state.InSRecordRecuder.totalInSRecords);
    const fetchFilter = useSelector((state) => state.InSRecordRecuder.fetchFilter);
    const fetchStatus = useSelector((state) => state.InSRecordRecuder.fetchStatus);
    // const fetchError = useSelector((state) => state.InSRecordRecuder.fetchError);
    const page = useSelector((state) => state.InSRecordRecuder.fetchFilter.page ?? 0);
    const rowsPerPage = useSelector((state) => state.InSRecordRecuder.fetchFilter.rowsPerPage ?? 5);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = useSelector(() => Math.max(0, (totalRecord ? Math.min(rowsPerPage, totalRecord) : rowsPerPage) - records?.length));

    const dispatch = useDispatch();

    //Fetch Expected incomes
    React.useEffect(() => {
        dispatch(fetchInS(fetchFilter));
    }, [dispatch]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(fetchInS({ ...fetchFilter, query: event.target.value }));
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
        dispatch(fetchInS({ ...fetchFilter, sortBy: property, sortOrder: fetchFilter.sortOrder === 'asc' ? 'desc' : 'asc' }));
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
        dispatch(fetchInS({ ...fetchFilter, page: newPage }));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(fetchInS({ ...fetchFilter, rowsPerPage: parseInt(event.target.value, 10) }));
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
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
                                orderBy={fetchFilter.sortBy ?? 'name'}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={totalRecord ?? 0}
                            />
                            <TableBody>
                                {records
                                    ?.map((row: any, index) => {
                                        const isItemSelected = isSelected(row.title);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.title)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.title}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <CustomCheckbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="h6" fontWeight="600">
                                                            {row.title}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Box
                                                            sx={{
                                                                backgroundColor: row.isIncome
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
                                                            {row.isIncome ? 'Income' : 'Spending'}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="h6" fontWeight="600">
                                                            {row.amount}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="h6" fontWeight="600">
                                                            {row.date.substring(0, 10)}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="h6" fontWeight="600">
                                                            {row.subject}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="h6" fontWeight="600">
                                                            {row.category}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Tooltip title="Edit">
                                                        <IconButton size="small">
                                                            <IconDotsVertical size="1.1rem" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={7}>
                                            { fetchStatus === 'loading' && records?.length === 0 && <Skeleton variant="rectangular" width="100%" height={emptyRows * 53} animation="wave"></Skeleton>}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalRecord}
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
        </Box>
    );
};

export default I_STableList;
