const Tour = require("../models/tourModel");
const mongoose=require('mongoose');
// GET /tours
const getAllTours =async (req, res) => {
  try{
    const tours =await Tour.find({}).sort({createdAt: -1});
    res.status(200).json(tours);
  }catch(error){
    res.status(500).json({message:'Failed to retrieve tours.'});
  }
};

// POST /tours
const createTour = (req, res) => {
  const newTour = Tour.create({ ...req.body }); // Spread the req.body object

  if (newTour) {
    res.status(201).json(newTour); // 201 Created
  } else {
    // Handle error (e.g., failed to create tour)
    res.status(400).json({ message: "Invalid tour data" });
  }
};
 
// GET /tours/:tourId
const getTourById = async (req, res) => {
  const {tourId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }

  try {
    const tour = await Tour.findById(tourId);
    if (tour) {
      res.status(200).json(tour);
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tour" });
  }
};

// PUT /tours/:tourId
const updateTour = async (req, res) => {
  const { tourId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }

  try {
    const updatedTour = await Tour.findOneAndUpdate(
      { _id: tourId },
      { ...req.body },
      { new: true }
    );
    if (updatedTour) {
      res.status(200).json(updatedTour);
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update tour" });
  }
};

// DELETE /tours/:tourId
const deleteTour=async(req,res)=>{
  const{tourId}=req.params;
  if(!mongoose.Types.ObjectId.isValid(tourId)){
    return res.status(400).json({message:'invalid tour id'});
  }
  try{
    const deletedTour=await Tour.findByIdAndDelete(tourId);
    if(!deletedTour){
      res.status(404).json({ message: "Tour not found" });
    } else {
      res.status(204).send();
    }
  }catch(error){
    res.status(500).json({message:'failed to delete tour'});
  }
}

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
