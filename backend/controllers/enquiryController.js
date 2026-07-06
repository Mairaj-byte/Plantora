import EnquiryModel from '../models/enquiryModel.js';

const addEnquiry = async (req, res) => {
  try {
    // 1. Pull status out of the body if it's passed (optional)
    const { plantName, name, email, contactNumber, address, message, status } = req.body;

    if (!plantName || !name || !email || !contactNumber || !address || !message) {
      return res.status(400).json({ success: false, message: "All form fields are required." });
    }

    const newEnquiry = new EnquiryModel({
      plantName,
      name,
      email,
      contactNumber,
      address,
      message,
      status: status || 'Not-Completed' // 2. Assigns it explicitly, falling back if empty
    });

    await newEnquiry.save();
    res.status(201).json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all submitted enquiries
// @route   GET /api/enquiry/list
// @access  Private/Admin
const listEnquiries = async (req, res) => {
  try {
    const enquiries = await EnquiryModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enquiries });
  } catch (error) {
    console.error("Error in listEnquiries:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Status of an enquiry
// @route   POST /api/enquiry/status
// @access  Private/Admin
const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    // Validate if the incoming status values are valid enum properties
    if (!['Completed', 'Not-Completed'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status selection." });
    }

    const updatedEnquiry = await EnquiryModel.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true } // Returns back updated data state
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found." });
    }

    res.status(200).json({ success: true, message: "Status updated successfully!", data: updatedEnquiry });
  } catch (error) {
    console.error("Error in updateStatus:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete an enquiry
// @route   POST /api/enquiry/delete
// @access  Private/Admin
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedEnquiry = await EnquiryModel.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found." });
    }

    res.status(200).json({ success: true, message: "Enquiry deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteEnquiry:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addEnquiry, listEnquiries, updateStatus, deleteEnquiry };