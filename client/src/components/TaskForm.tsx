
import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { addTask } from '../redux/taskSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const TaskForm = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      status: 'Pending',
      tags: '',
      dueDate: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Task title is required'),
      description: Yup.string().required('Description is required'),
      status: Yup.string().oneOf(['Pending', 'In Progress', 'Done']).required('Status is required'),
      tags: Yup.string(),
      dueDate: Yup.string().required('Due date is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload = {
        title: values.title,
        description: values.description,
        status: values.status,
        tags: values.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        dueDate: values.dueDate,
      };
      dispatch(addTask(payload));
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div className="flex flex-col col-span-1">
        <input
          name="title"
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          placeholder="Enter task title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
        )}
      </div>
      <div className="flex flex-col col-span-1">
        <textarea
          name="description"
          className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          placeholder="Enter description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={2}
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
        )}
      </div>
      <div className="flex flex-col col-span-1">
        <select
          name="status"
          className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        {formik.touched.status && formik.errors.status && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.status}</p>
        )}
      </div>
      <div className="flex flex-col col-span-1">
        <input
          name="tags"
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          placeholder="Enter tags (comma separated)"
          value={formik.values.tags}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="flex flex-col col-span-1">
        <input
          name="dueDate"
          type="date"
          className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          value={formik.values.dueDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.dueDate && formik.errors.dueDate && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.dueDate}</p>
        )}
      </div>
      <div className="col-span-1 md:col-span-2 flex justify-center mt-2">
        <button type="submit" className="w-1/2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60">
          Add Task
        </button>
      </div>
    </form>
  );
};