/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
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
  Grid,
  Skeleton,
  TableCellProps,
  Button
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import CustomSwitch from 'src/components/forms/theme-elements/CustomSwitch';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import { IconTrash, IconFilter, IconSearch } from '@tabler/icons-react';
import BlankCard from '../../components/shared/BlankCard';
import { useDispatch, useSelector } from '../../store/Store';
import CapitalBuildCard from 'src/components/goal-tracker/CapitalBuildingCard';
import DebtPaymentCard from 'src/components/goal-tracker/DebtPaymentCard';
import LongTermExpenseCard from 'src/components/goal-tracker/LongTermExpenseCard';
import { FinancialGoalType, SortOrder } from 'src/types/goal-tracker';
import { deleteGoal, fetchGoals, rearrangeGoal } from 'src/store/goal-tracker/GoalTrackerSlice';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Goal Tracker',
  },
];

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
  order: SortOrder;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    // onSelectAllClick, 
    order, orderBy, 
    // numSelected, rowCount, 
    onRequestSort } = props;
  const createSortHandler = (property: keyof FinancialGoalType) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <CustomCheckbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            tabIndex={-1}
            inputProps={{
              'aria-labelledby': 'select all desserts',
            }}
          /> */}
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
        <TableCell>
          <Typography variant="subtitle1" fontWeight="500">
            Actions
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleSearch: React.ChangeEvent<HTMLInputElement> | any;
  search: string;
  handleDelMultiple: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, search, handleSearch, handleDelMultiple } = props;
  const [openDel, setDelDialog] = useState(false);

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
        <>
          <Button variant="contained" color="primary" component={Link} to={`/goal-tracker/create`} style={{ marginRight: '1.1rem' }}>
            Create
          </Button>
          <TextField
            sx={{ flex: '1 1 100%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
            placeholder="Search"
            size="small"
            onChange={handleSearch}
            value={search}
          />
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={() => setDelDialog(true)}>
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
      <DeleteConfirmDialog
        open={openDel}
        onClose={() => setDelDialog(false)}
        onSubmit={handleDelMultiple}
      />
    </Toolbar>
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

import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
const EnhancedTableRow = (props: { row: FinancialGoalType; loading: boolean; selected: boolean; onSelect: (event: React.MouseEvent<unknown>, id: number) => void }) => {
  const navigate = useNavigate();
  const { row, loading, selected, onSelect } = props;
  // const labelId = `enhanced-table-checkbox-${row.id}`;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: row.id!});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onEdit = (event: React.MouseEvent<unknown>, id: number) => {
    event.stopPropagation();
    navigate(`/goal-tracker/details/${id}`);
  }

  return (
    <TableRow
      hover
      onClick={(event) => onSelect(event, row.id!)}
      // role="checkbox"
      aria-checked={selected}
      // tabIndex={-1}
      key={row.id}
      selected={selected}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <EnhancedTableCell padding="checkbox">
        {/* <CustomCheckbox
          checked={selected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        /> */}
        <Tooltip title="Drag">
          <DragIndicatorIcon
            style={{ cursor: 'grab' }}
            {...listeners}
          />
        </Tooltip>
      </EnhancedTableCell>
      <EnhancedTableCell loading={loading}>
        <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
          {row.title}
        </Typography>
      </EnhancedTableCell>
      <EnhancedTableCell loading={loading}>
        <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
          {row.type}
        </Typography>
      </EnhancedTableCell>
      <EnhancedTableCell loading={loading}>
        <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
          {parseFloat(String(row.amount)).toFixed(2)}
        </Typography>
      </EnhancedTableCell>
      <EnhancedTableCell loading={loading}>
        <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
          {row.deadline}
        </Typography>
      </EnhancedTableCell>
      <EnhancedTableCell loading={loading}>
        <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
          {row.priority}
        </Typography>
      </EnhancedTableCell>
      <EnhancedTableCell loading={loading}>
        <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
          {row.completed ? 'Yes' : 'No'}
        </Typography>
      </EnhancedTableCell>
      <EnhancedTableCell loading={loading}>
        <Button variant="contained" color="primary" onClick={(event) => onEdit(event, row.id!)}>
          Edit
        </Button>
      </EnhancedTableCell>
    </TableRow>
  );
}

import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Link, useNavigate } from 'react-router-dom';
import DeleteConfirmDialog from 'src/components/shared/DeleteConfirmDialog';
const EnhanceTable = () => {
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.goalTrackerReducer.total);
  const goals = useSelector((state) => state.goalTrackerReducer.goals);
  const [records, setRecords] = useState<FinancialGoalType[]>([]);
  const fetchStatus = useSelector((state) => state.goalTrackerReducer.fetchGoalsStatus);
  // const fetchError = useSelector((state) => state.goalTrackerReducer.fetchGoalsError);
  const fetchFilter = useSelector((state) => state.goalTrackerReducer.fetchGoalsFilter);
  const page = fetchFilter.page ?? 0;
  const rowsPerPage = fetchFilter.rowsPerPage ?? 5;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = useSelector(() => Math.max(
    0,
    (totalCount ? Math.min(rowsPerPage, totalCount) : rowsPerPage) - goals.length
  ));
  
  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchGoals({}));
    }
    goals && setRecords(goals);
  }, [fetchStatus, dispatch]);

  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [dense, setDense] = React.useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(fetchGoals({ query: event.target.value }));
  };
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof FinancialGoalType) => {
    const isAsc = fetchFilter.sortBy === property && fetchFilter.sortOrder === 'asc';
    dispatch(fetchGoals({ sortBy: property, sortOrder: isAsc ? 'desc' : 'asc' }));
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = records.map((n) => n.id!);
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
    dispatch(fetchGoals({ page: newPage }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(fetchGoals({ rowsPerPage: parseInt(event.target.value, 10), page: 0 }));
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const {active, over} = event;
    
    if (active?.id && over?.id && active?.id !== over?.id) {
      const oldIndex = records.findIndex((r) => r.id === active?.id);
      const newIndex = records.findIndex((r) => r.id === over?.id);
      const newOrder = arrayMove(records, oldIndex, newIndex);
      setRecords(newOrder); // update the UI
      
      const activeRecord = records.find((r) => r.id === active?.id);
      const overRecord = records.find((r) => r.id === over?.id);

      if (!activeRecord || !overRecord) {
        return;
      }
      
      // update the backend
      dispatch(rearrangeGoal({
        ...activeRecord,
        priority: overRecord.priority
      }))
      .then((results) => {
        console.log(results);
        setRecords((results?.payload as any).data);
      })
    }
  }

  function handleDeleteMultiple() {
    // console.log('delete multiple', selected);
    Promise
      .all(selected.map((id) => dispatch(deleteGoal(id))))
      .then(() => {
        setSelected([]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(fetchGoals({}));
      })
  }

  return (
    <PageContainer title="Goal Tracker" description="this is Goal Tracker page">
      {/* breadcrumb */}
      <Breadcrumb title="Goal Tracker" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <CapitalBuildCard />
            </Grid>
            <Grid item xs={12} md={4}>
              <DebtPaymentCard />
            </Grid>
            <Grid item xs={12} md={4}>
              <LongTermExpenseCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12}>
          <BlankCard>
            <Box mb={2} sx={{ mb: 2 }}>
              <EnhancedTableToolbar
                numSelected={selected.length}
                search={fetchFilter.query ?? ''}
                handleSearch={(e: any) => handleSearch(e)}
                handleDelMultiple={() => handleDeleteMultiple()}
              />
              <TableContainer>
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={records as any}
                    strategy={verticalListSortingStrategy}
                  >
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? 'small' : 'medium'}
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={fetchFilter.sortOrder ?? 'asc'}
                        orderBy={fetchFilter.sortBy ?? ''}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={records.length}
                      />
                      <TableBody>
                        {records
                          .map((row) => {
                            const isItemSelected = isSelected(row.id!);

                            return (
                              <EnhancedTableRow
                                loading={fetchStatus === 'loading'}
                                key={row.id}
                                row={row}
                                selected={isItemSelected}
                                onSelect={handleSelect}
                              />
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={8}>
                              { fetchStatus === 'loading' && records.length === 0 && <Skeleton variant="rectangular" width="100%" height={emptyRows * 53} animation="wave"></Skeleton>}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </SortableContext>
                </DndContext>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalCount}
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
