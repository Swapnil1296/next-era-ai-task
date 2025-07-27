import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token') || '{}').token;
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling using swal
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Customize error messages based on status code
      let message = data?.message || 'Something went wrong';

      if (status === 401) {
        message = 'Unauthorized. Please log in again.';
        localStorage.removeItem('token'); window.location.href = '/login';
      } else if (status === 403) {
        message = 'You do not have permission to perform this action.';
      } else if (status === 404) {
        message = 'Requested resource not found.';
      } else if (status === 500) {
        message = 'Server error. Please try again later.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        background: '#fef2f2',
        color: '#b91c1c',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#ef4444',
        customClass: {
          popup: 'rounded-lg shadow-xl',
          title: 'text-xl font-semibold',
          confirmButton: 'px-5 py-2',
        },
        // buttonsStyling: false,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Please check your internet connection.',
        background: '#fef2f2',
        color: '#b91c1c',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#ef4444',
        customClass: {
          popup: 'rounded-lg shadow-xl',
          title: 'text-xl font-semibold',
          confirmButton: 'px-5 py-2',
        },
        // buttonsStyling: false,
      });
    }

    return Promise.reject(error);
  }
);

export default api;
