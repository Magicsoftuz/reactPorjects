const Tour = require('./../model/tourModel');

const getToursAll = async (req, res) => {
  try {
    // magic.uz/api?name=umid&price=100
    // req.query = {name: "umid", price:100}

    // 1) Filter (Advanced and Basic)
    const querySalom = { ...req.query };
    console.log(querySalom);
    const removeQuery = ['sort', 'page', 'limit', 'field'];
    removeQuery.forEach((val) => delete querySalom[val]);
    console.log(querySalom);

    const queryStr = JSON.stringify(querySalom)
      .replace(/\gte\b/g, '$gte')
      .replace(/\blte\b/g, '$lte')
      .replace(/\blt\b/g, '$lt')
      .replace(/\bgt\b/g, '$gt');

    let data = Tour.find(JSON.parse(queryStr));

    //2) Sorting

    if (req.query.sort) {
      const querySort = req.query.sort.split(',').join(' ');
      console.log(querySort);
      data = data.sort(querySort);
    }

    const queryData = await data;

    if (queryData.length) {
      res.status(200).json({
        status: 'Success',
        results: queryData.length,
        body: queryData,
      });
    } else {
      throw new Error('Error');
    }
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
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
