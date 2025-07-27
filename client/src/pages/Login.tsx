import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { handleLoginSubmit, initialLoginValues, loginValidationSchema } from '../utils/loginFormConfig';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="max-w-md w-full bg-teal-100 p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Login to your account</h2>

      {error && (
        <div className="bg-emerald-300 text-red-700 px-4 py-2 mb-4 rounded">
          {error}
        </div>
      )}

      <Formik
       initialValues={initialLoginValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleLoginSubmit(navigate, setError)}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium">Password</label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="Enter your password"
                />
                <div
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex items-center space-x-2">
              <Field type="checkbox" name="remember" className="accent-blue-600" />
              <label className="text-sm">Remember me</label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" /> Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </Form>
        )}
      </Formik>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
