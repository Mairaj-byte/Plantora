import express from 'express';
import { addEnquiry, listEnquiries, updateStatus, deleteEnquiry } from '../controllers/enquiryController.js';

const enquiryRouter = express.Router();

// Base collection list endpoints
enquiryRouter.route('/list')
  .post(addEnquiry)
  .get(listEnquiries);

// Update status endpoint - expects { id, status } in request body
enquiryRouter.post('/status', updateStatus);

// Delete endpoint - expects { id } in request body
enquiryRouter.post('/delete', deleteEnquiry);

export default enquiryRouter;