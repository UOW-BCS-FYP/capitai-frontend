// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Alert,
  IconButton,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { loginType } from 'src/types/auth/auth';
import CustomCheckbox from 'src/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import useAuth from 'src/guards/authGuard/UseAuth';
import useMounted from 'src/guards/authGuard/UseMounted';
import CustomOutlinedInput from 'src/components/forms/theme-elements/CustomOutlinedInput';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const mounted = useMounted();
  const { signin } = useAuth();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },

    validationSchema: LoginSchema,

    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        await signin(values.email, values.password);

        if (mounted.current) {
          setStatus({ success: true });
          setSubmitting(true);
        }
        console.log(values);
      } catch (err) {
        if (mounted.current) {
          setStatus({ success: false });
          setErrors({ submit: (err as Error)?.message });
          setSubmitting(false);
        }
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      {/* Alert for Capstone Project of Bachelor of Computer Science at University of Wollongong */}
      <Alert severity="warning" sx={{ mb: 2, width: '395px' }}>
        This is a Capstone Project of Bachelor of Computer Science at University of Wollongong. This project is not intended for commercial use. The project is developed by a group of students for educational purposes only.
      </Alert>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box>
      {errors.submit && (
        <Box mt={2}>
          <Alert severity="error">{errors.submit}</Alert>
        </Box>
      )}
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <Stack>
            <Box>
              <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
              <CustomTextField
                id="email"
                variant="outlined"
                fullWidth
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box>
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
              {/* <CustomTextField
                id="password"
                type="password"
                variant="outlined"
                fullWidth
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              /> */}
              <CustomOutlinedInput id="password" type={showPassword ? 'text' : 'password'}
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                fullWidth
              />
              <FormHelperText error={Boolean(touched.password && errors.password)}>
                {touched.password && errors.password}
              </FormHelperText>
            </Box>
            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <CustomCheckbox defaultChecked />
                  }
                  label="Remeber this Device"
                />
              </FormGroup>
              <Typography
                component={Link}
                to="/auth/reset-password"
                fontWeight="500"
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                }}
              >
                Forgot Password ?
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              Sign In
            </Button>
          </Box>
        </Form>
      </FormikProvider>
      {subtitle}
    </>
  );
};

export default AuthLogin;
