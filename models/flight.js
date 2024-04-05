const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const ticketSchema = require('./ticket')



const destinationSchema = new Schema({

    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'SEA', 'DEN', 'LAX', 'SAN'],
    },

    arrival: {
        type: Date,
    }

});




const flightSchema = new Schema({


    destinations: {
        type: [destinationSchema]

    },

    tickets: [{

        type: Schema.Types.ObjectId,
        ref: 'Ticket'

    }],



    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United', 'Delta', 'Alaska']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'SEA', 'DEN', 'LAX', 'SFO', 'SAN'],
        default: 'SEA'
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function () {
            // Set default value to one year from the current date
            const oneYearFromNow = new Date();
            return new Date().setFullYear(new Date().getFullYear() + 1);

        }
    },

}, { timestamps: true });

// complile the schema into a model, and export it

module.exports = mongoose.model('Flight', flightSchema);