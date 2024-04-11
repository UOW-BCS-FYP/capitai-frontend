// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, Typography, Button, Divider, Alert, IconButton, InputAdornment, FormHelperText, FormControlLabel, FormGroup } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import { registerType } from 'src/types/auth/auth';
import AuthSocialButtons from './AuthSocialButtons';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import useAuth from 'src/guards/authGuard/UseAuth';
import useMounted from 'src/guards/authGuard/UseMounted';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import CustomOutlinedInput from 'src/components/forms/theme-elements/CustomOutlinedInput';
import CustomCheckbox from 'src/components/forms/theme-elements/CustomCheckbox';

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const mounted = useMounted();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    UserName: Yup.string().required('Username is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const formik = useFormik({
    initialValues: {
      UserName: '',
      email: '',
      password: '',
      policy: true,
      submit: null,
      acceptTerms: false,
    },

    validationSchema: registerSchema,

    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        console.log(values)
        await signup(values.email, values.password);
        navigate('/auth/login1');
        if (mounted.current) {
          setStatus({ success: true });
          setSubmitting(true);
        }
      } catch (err: any) {
        if (mounted.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <AuthSocialButtons title="Sign up with" />

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
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <Box>
        {errors.submit && (
          <Box mt={2}>
            <Alert severity="error">{errors.submit}</Alert>
          </Box>
        )}
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Stack mb={3}>
              <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
              <CustomTextField
                id="name"
                variant="outlined"
                fullWidth
                {...getFieldProps('UserName')}
                error={Boolean(touched.UserName && errors.UserName)}
                helperText={touched.UserName && errors.UserName}
              />
              <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
              <CustomTextField
                id="email"
                variant="outlined"
                fullWidth
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
              {/* <CustomTextField
                id="password"
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
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                fullWidth
              />
              <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <CustomCheckbox id="acceptTerms" {...getFieldProps('acceptTerms')} />
                    }
                    label={
                      <Typography
                        color="textSecondary"
                        variant="body2"
                        fontWeight="400"
                        position="relative"
                      >
                        I accept the{' '}
                        <Typography
                          color="primary"
                          sx={{ cursor: 'pointer' }}
                        >
                          Terms & Conditions
                        </Typography>
                      </Typography>
                    }
                  />
                  <FormHelperText error={Boolean(touched.acceptTerms && errors.acceptTerms)}>
                    {touched.acceptTerms && errors.acceptTerms}
                  </FormHelperText>
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
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              Sign Up
            </Button>
          </Form>
        </FormikProvider>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
