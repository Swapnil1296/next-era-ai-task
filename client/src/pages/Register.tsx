import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {
    initialRegisterValues,
    registerValidationSchema,
    handleRegisterSubmit
} from '../utils/registerFormConfig'; // adjust path as needed

const Register: React.FC = () => {
    const navigate = "useNavigate()";
    const [error, setError] = useState('');

    return (

        <div className="max-w-md w-full bg-teal-100 p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Register</h2>

            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
                    {error}
                </div>
            )}

            <Formik
                initialValues={initialRegisterValues}
                validationSchema={registerValidationSchema}
                onSubmit={handleRegisterSubmit(navigate, setError)}
            >
                <Form className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <Field
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <Field
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <Field
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200"
                    >
                        Register
                    </button>
                </Form>

            </Formik>
            <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{' '}
                <Link to="/" className="text-blue-600 hover:underline">
                    Login
                </Link>
            </p>
        </div>

    );
};

export default Register;
