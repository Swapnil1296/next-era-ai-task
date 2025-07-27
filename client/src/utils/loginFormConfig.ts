// utils/loginFormConfig.ts
import * as Yup from 'yup';
import axios from 'axios';
import type { NavigateFunction } from 'react-router-dom';
import api from './axios';

export const initialLoginValues = {
  email: '',
  password: '',
 
};

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required')
});

export const handleLoginSubmit =
  (navigate: NavigateFunction, setError: (msg: string) => void) =>
  async (values: typeof initialLoginValues, { setSubmitting }: any) => {
    setError('');
    try {
      const res = await api.post('/api/auth/login', values);
      localStorage.setItem('token', JSON.stringify({token: res.data.token, isLoggedIn: true}));
      // if (values.remember) {
      //   localStorage.setItem('rememberedEmail', values.email);
      // }
      navigate('/task');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
    setSubmitting(false);
  };
