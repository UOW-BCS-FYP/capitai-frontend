import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { Stack, MenuItem, Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import CustomCheckbox from "../forms/theme-elements/CustomCheckbox";
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";
import CustomSelect from "../forms/theme-elements/CustomSelect";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { FinancialGoalType } from 'src/types/goal-tracker';
import { AppState } from 'src/store/Store';

interface FormValues {
  id?: number;
  title: string;
  type: string;
  amount: number;
  deadline: string;
  priority: number;
  completed: boolean;
  interest: number;
  paymentInterval: number;
  frequency: number;
}

const validationSchema = yup.object<FormValues>({
  title: yup.string().required('Title is Required'),
  type: yup.string().required('Type is Required').oneOf(['capital building', 'debt payment', 'long term expense']),
  amount: yup.number().required('Amount is Required'),
  priority: yup.number().required('Priority is Required'),
  completed: yup.boolean(),
  // capital building fields, required if type is capital building
  deadline: yup.date().when('type', {
    is: 'capital building',
    then: () => yup.string().required('Deadline is Required')
  }),
  // debt payment fields, required if type is debt payment
  interest: yup.number().when('type', {
    is: 'debt payment',
    then: () => yup.number().required('Interest is Required')
  }),
  paymentInterval: yup.number().when('type', {
    is: 'debt payment',
    then: () => yup.number().required('Payment Interval is Required')
  }),
  // long term expense fields, required if type is long term expense
  frequency: yup.number().when('type', {
    is: 'long term expense',
    then: () => yup.number().required('Frequency is Required')
  })
});

interface GoalTrackerFormProps {
  editGoal?: FinancialGoalType;
  onSubmit: (values: FormValues) => void;
}

const GoalTrackerForm = (props: GoalTrackerFormProps) => {
  const loading = useSelector((state: AppState) => state.goalTrackerReducer.addGoalStatus === 'loading' || state.goalTrackerReducer.updateGoalStatus === 'loading');
  const formik = useFormik({
    initialValues: {
      title: '',
      type: 'capital building',
      amount: 0,
      deadline: '',
      priority: 0,
      completed: false,
      interest: 0,
      paymentInterval: 0,
      frequency: 0,
      ...props.editGoal // if editGoal is provided, it will override the default values
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.onSubmit(values);
    },
  });

  const langOptions = [
    { value: 'capital building', label: 'Capital Building' },
    { value: 'debt payment', label: 'Debt Payment' },
    { value: 'long term expense', label: 'Long Term Expense' },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack>
        <Box>
          <CustomFormLabel>Title</CustomFormLabel>
          <CustomTextField
            fullWidth
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Box>
        <Box>
          <CustomFormLabel>Type</CustomFormLabel>
          <CustomSelect
            fullWidth
            id="type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            error={formik.touched.type && Boolean(formik.errors.type)}
          >
            {langOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomSelect>
        </Box>
        <Box>
          <CustomFormLabel>Amount</CustomFormLabel>
          <CustomTextField
            fullWidth
            id="amount"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Box>
        <Box>
          <CustomFormLabel>Priority</CustomFormLabel>
          <CustomTextField
            fullWidth
            id="priority"
            name="priority"
            value={formik.values.priority}
            onChange={formik.handleChange}
            error={formik.touched.priority && Boolean(formik.errors.priority)}
            helperText={formik.touched.priority && formik.errors.priority}
          />
        </Box>
        <Box>
          <CustomFormLabel>Completed</CustomFormLabel>
          <CustomCheckbox
            id="completed"
            name="completed"
            checked={formik.values.completed}
            onChange={formik.handleChange}
          />
        </Box>
        <Box>
          <CustomFormLabel>Deadline</CustomFormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              onChange={(newValue) => {
                console.log(newValue)
                formik.setFieldValue('deadline', newValue)
              }}
              renderInput={(inputProps) => (
                <CustomTextField
                  fullWidth
                  id="deadline"
                  name="deadline"
                  variant="outlined"
                  size="small"
                  inputProps={{ 'aria-label': 'basic date picker' }}
                  {...inputProps}
                  error={formik.touched.deadline && Boolean(formik.errors.deadline)}
                  helperText={formik.touched.deadline && formik.errors.deadline}
                />
              )}
              value={formik.values.deadline}
            />
          </LocalizationProvider>
        </Box>
        {formik.values.type === 'debt payment' && (
          <>
            <Box>
              <CustomFormLabel>Interest</CustomFormLabel>
              <CustomTextField
                fullWidth
                id="interest"
                name="interest"
                value={formik.values.interest}
                onChange={formik.handleChange}
                error={formik.touched.interest && Boolean(formik.errors.interest)}
                helperText={formik.touched.interest && formik.errors.interest}
              />
            </Box>
            <Box>
              <CustomFormLabel>Payment Interval</CustomFormLabel>
              <CustomTextField
                fullWidth
                id="paymentInterval"
                name="paymentInterval"
                value={formik.values.paymentInterval}
                onChange={formik.handleChange}
                error={formik.touched.paymentInterval && Boolean(formik.errors.paymentInterval)}
                helperText={formik.touched.paymentInterval && formik.errors.paymentInterval}
              />
            </Box>
          </>
        )}
        {formik.values.type === 'long term expense' && (
          <Box>
            <CustomFormLabel>Frequency</CustomFormLabel>
            <CustomTextField
              fullWidth
              id="frequency"
              name="frequency"
              value={formik.values.frequency}
              onChange={formik.handleChange}
              error={formik.touched.frequency && Boolean(formik.errors.frequency)}
              helperText={formik.touched.frequency && formik.errors.frequency}
            />
          </Box>
        )}
      </Stack>
      <Stack justifyContent="space-between" direction="row" alignItems="center" mt={2}>
        <LoadingButton color="primary" variant="contained" type="submit" loading={loading}>
          Save {loading && '...'}
        </LoadingButton>
      </Stack>
    </form>
  )
};

export default GoalTrackerForm;
