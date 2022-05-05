const Tour = require('./../model/tourModel');

const getToursAll = async (req, res) => {
  try {
    class APIFeatures {
      constructor(surov, surovUrl) {
        this.surov = surov;
        this.surovUrl = surovUrl;
      }

      filter() {
        // 1) Filter (Advanced and Basic)
        const querySalom = { ...this.surovUrl };

        const removeQuery = ['sort', 'page', 'limit', 'field'];
        removeQuery.forEach((val) => delete querySalom[val]);

        const queryStr = JSON.stringify(querySalom)
          .replace(/\bgte\b/g, '$gte')
          .replace(/\blte\b/g, '$lte')
          .replace(/\blt\b/g, '$lt')
          .replace(/\bgt\b/g, '$gt');

        this.surov.find(JSON.parse(queryStr));
        return this;
      }

      sort() {
        if (this.surovUrl.sort) {
          const querySort = this.surovUrl.sort.split(',').join(' ');
          this.surov.sort(querySort);
          return this;
        }
      }
    }

    // magic.uz/api?name=umid&price=100
    // req.query = {name: "umid", price:100}

    let data = new APIFeatures(Tour.find(), req.query).filter().sort();

    //2) Sorting

    // if (req.query.sort) {
    //   const querySort = req.query.sort.split(',').join(' ');
    //   console.log(querySort);
    //   data = data.sort(querySort);
    // }

    // 3) Field
    // if (req.query.field) {
    //   const queryField = req.query.field.split(',').join(' ');
    //   data = data.select(queryField);
    // } else {
    //   data = data.select('-__v');
    // }

    // 4)Pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 5;
    // const skip = (page - 1) * limit;

    // data = data.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numberOfDocuments = await Tour.countDocuments();
    //   console.log(numberOfDocuments);
    //   if (numberOfDocuments <= skip) {
    //     throw new Error('This page does not exist');
    //   }
    // }

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
    console.log(err);
    res.status(404).json({
      status: 'Fail',
      message: err.message,
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
