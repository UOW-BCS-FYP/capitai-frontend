/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';
import { alpha } from '@mui/material/styles';
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Paper,
  IconButton,
  Tooltip,
  FormControlLabel,
  Typography,
  // Avatar,
  // AvatarGroup,
  // Badge,
  // Stack,
  InputAdornment,
  TextField,
  Grid
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import CustomCheckbox from 'src/components/forms/theme-elements/CustomCheckbox';
import CustomSwitch from 'src/components/forms/theme-elements/CustomSwitch';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import { IconTrash, IconFilter, IconSearch } from '@tabler/icons-react';
// import { EnhancedTableData, EnTableType } from 'src/components/tables/tableData';
import BlankCard from '../../components/shared/BlankCard';
import { useDispatch, useSelector } from '../../store/Store';
import MonthlyEarnings from 'src/components/dashboards/modern/MonthlyEarnings';
import YearlyBreakup from 'src/components/dashboards/modern/YearlyBreakup';
import PageImpressions from 'src/components/widgets/charts/PageImpressions';
import { FinancialGoalType } from 'src/types/goal-tracker';
import { fetchGoals } from 'src/store/goal-tracker/GoalTrackerSlice';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Goal Tracker',
  },
];

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }

//   return 0;
// }
// const rows: EnTableType[] = EnhancedTableData;

type Order = 'asc' | 'desc';

// function getComparator<Key extends keyof FinancialGoalType>(
//   order: Order,
//   orderBy: Key,
// ): (a: { [key in Key]: number | string | boolean }, b: { [key in Key]: number | string | boolean }) => number {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }

//     return a[1] - b[1];
//   });

//   return stabilizedThis.map((el) => el[0]);
// }

interface HeadCell {
  disablePadding: boolean;
  id: keyof FinancialGoalType;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'deadline',
    numeric: false,
    disablePadding: false,
    label: 'Deadline',
  },
  {
    id: 'priority',
    numeric: false,
    disablePadding: false,
    label: 'Priority',
  },
  {
    id: 'completed',
    numeric: false,
    disablePadding: false,
    label: 'Completed',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof FinancialGoalType) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof FinancialGoalType) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            tabIndex={-1}
            inputProps={{
              'aria-labelledby': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="subtitle1" fontWeight="500">
                {headCell.label}
              </Typography>
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

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, search, handleSearch } = props;

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
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <TextField
          sx={{ flex: '1 1 100%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size="1.1rem" />
              </InputAdornment>
            ),
          }}
          placeholder="Search Product"
          size="small"
          onChange={handleSearch}
          value={search}
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <IconTrash width={18} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <IconFilter width={18} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

const EnhanceTable = () => {
  const dispatch = useDispatch();
  const goals: FinancialGoalType[] = useSelector((state) => state.goalTrackerReducer.goals);
  const statusFetchGoals = useSelector((state) => state.goalTrackerReducer.statusFetchGoals);
  const errorFetchGoals = useSelector((state) => state.goalTrackerReducer.errorFetchGoals);

  useEffect(() => {
    console.log('fetching goals')
    if (statusFetchGoals === 'idle') {
      dispatch(fetchGoals())
    }
  }, [statusFetchGoals, dispatch]);


  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof FinancialGoalType>('title');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = React.useState<FinancialGoalType[]>(goals);
  const [search, setSearch] = React.useState('');

  // if (statusFetchGoals === 'idle' || statusFetchGoals === 'loading') {
  //   return (<Typography variant="subtitle2">Loading...</Typography>)
  // }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredRows: FinancialGoalType[] = goals.filter((row) => {
      return row.title.toLowerCase().includes(event.target.value);
    });
    setSearch(event.target.value);
    setRows(filteredRows);
  };
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof FinancialGoalType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property as keyof FinancialGoalType);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  const handleSelect = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <PageContainer title="Goal Tracker" description="this is Goal Tracker page">
      {/* breadcrumb */}
      <Breadcrumb title="Goal Tracker" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <YearlyBreakup />
            </Grid>
            <Grid item xs={12} md={4}>
              <MonthlyEarnings />
            </Grid>
            <Grid item xs={12} md={4}>
              <PageImpressions />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12}>
          <BlankCard>
            <Box mb={2} sx={{ mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} search={search} handleSearch={(e: any) => handleSearch(e)} />
              {statusFetchGoals === 'loading' && <Typography variant="subtitle2">Loading...</Typography>}
              {statusFetchGoals === 'failed' && <Typography variant="subtitle2">{errorFetchGoals}</Typography>}
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {goals
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: FinancialGoalType, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleSelect(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <CustomCheckbox
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
                                {row.title}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
                                {row.type}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
                                {row.amount.toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
                                {row.deadline}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
                                {row.priority}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
                                {row.completed ? 'Yes' : 'No'}
                              </Typography>
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
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
            <Box p={2}>
              <FormControlLabel
                control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
              />
            </Box>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EnhanceTable;
