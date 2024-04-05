const Flight = require('../models/flight');

module.exports = {
  index,
  show,
  create,
  new: newFlight,
};

async function index(req, res) {
  try {
    const flights = await Flight.find({});
    res.render('flights/index', { flights });
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).render('error', { error });
  }
}

async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id).populate('tickets');
    if (!flight) {
      return res.status(404).send('Flight not found');
    }
    res.render('flights/show', { title: 'Flight Details', flight });
  } catch (error) {
    console.error('Error fetching flight:', error);
    res.status(500).render('error', { error });
  }
}

async function newFlight(req, res) {
  res.render('flights/new', { errorMsg: '' });
}

async function create(req, res) {
  try {
    await Flight.create(req.body);
    res.redirect('/flights');
  } catch (error) {
    console.error('Error creating flight:', error);
    res.render('flights/new', { errorMsg: error.message });
  }
}