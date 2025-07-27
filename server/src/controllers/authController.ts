import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { registerSchema, loginSchema } from '../validators/authValidator';

export const registerUser = async (req: Request, res: Response) => {
   try {
     const { error } = registerSchema.validate(req.body);
     if (error) return res.status(400).json({ message: error.details[0].message });
   const { name, email, password } = req.body;
     const hashed = await bcrypt.hash(password, 10);
     const isUserExist = await User.findOne({email});
     if (isUserExist) {
         return res.status(409).json({ message: "User already exists" });
     }
   const user = await User.create({ name, email, password: hashed });
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '');
   res.status(201).json({ token, user: { id: user._id, name, email } });
   } catch (error) {
      res.status(500).json({ message: 'Server error' });
   }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
   const { error } = loginSchema.validate(req.body);
     if (error) return res.status(400).json({ message: error.details[0].message });
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (!user) return res.status(400).json({ error: 'User not found' });
   const valid = await bcrypt.compare(password, user.password);
   if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '');
   res.json({ token, user: { id: user._id, name: user.name, email } });
 } catch (error) {
   res.status(500).json({ message: 'Server error' });
 }
};
