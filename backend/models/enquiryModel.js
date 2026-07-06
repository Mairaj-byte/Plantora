import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Completed', 'Not-Completed'],
    default: 'Not-Completed'
  }
}, { 
  timestamps: true // Automatically tracks 'createdAt' and 'updatedAt'
});

// Avoid compiling the model multiple times if Next.js/Hot-reloading is used
const EnquiryModel = mongoose.models.enquiry || mongoose.model('enquiry', enquirySchema);

export default EnquiryModel;