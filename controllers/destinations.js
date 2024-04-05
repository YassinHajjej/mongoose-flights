const Flight = require('../models/flight');

module.exports = {
  create
};

async function create(req, res) {

  try {
    // Save any changes made to the flight doc
    const flight = await Flight.findById(req.params.id);
    // We can push (or unshift) subdocs into Mongoose arrays
    flight.destinations.push(req.body);
    await flight.save();
    res.redirect(`/flights/${flight._id}`)

  } catch (err) {
    console.log(err);
  }
}