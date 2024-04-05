const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    create,
    new: newTicket,
};

async function create(req, res) {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).send('Flight not found');
        }

        // Add the flight property to the req.body object
        req.body.flight = flight._id;

        // Create a new ticket using the data from req.body
        const ticket = new Ticket(req.body);
        console.log(ticket);
        await ticket.save();

        flight.tickets.push(ticket._id)
        await flight.save();

        // Redirect back to the flight's show view
        res.redirect(`/flights/${flight._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}


async function newTicket(req, res) {

    const flight = await Flight.findById(req.params.id)

    res.render('tickets/new', { errorMsg: '', flight: flight });

}