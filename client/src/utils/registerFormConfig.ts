import * as Yup from 'yup';
import axios from 'axios';
import type { NavigateFunction } from 'react-router-dom';

export const initialRegisterValues = {
  name: '',
  email: '',
  password: ''
};

export const registerValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required')
});

export const handleRegisterSubmit =
  (navigate: NavigateFunction, setError: (msg: string) => void) =>
  async (values: typeof initialRegisterValues, { setSubmitting }: any) => {
    setError('');
    try {
      await axios.post('/api/auth/register', values);
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
    setSubmitting(false);
  };
