const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log(('MongoDB Connected....').bold.blue);
    } catch(err) {
        console.log(err.message);

        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
