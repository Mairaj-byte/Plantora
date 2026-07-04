import express from 'express';
import { clearData } from '../controllers/clearController.js';

const clearRouter = express.Router();

clearRouter.post('/all', clearData);

export default clearRouter;
