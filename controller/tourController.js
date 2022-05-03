const Tour = require('./../model/tourModel');

const getToursAll = async (req, res) => {
  try {
    const data = await Tour.find();

    res.status(200).json({
      status: 'Success',
      results: data.length,
      body: data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid data',
    });
  }
};
const addTour = async (req, res) => {
  try {
    const data = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      body: data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'San xato qilding',
    });
  }
};

const getTourItem = async (req, res) => {
  try {
    const data = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      body: data,
    });
  } catch (err) {
    res.status(200).json({
      status: 'Success',
      message: 'Invalid data id',
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const data = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Success',
      body: data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Error Update',
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Failed to delete info',
    });
  }
};

module.exports = { getToursAll, addTour, updateTour, deleteTour, getTourItem };
