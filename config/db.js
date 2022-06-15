const mongoose = require("mongoose");
const config = require("config")
const db = config.get("mongoDB_URI");

// get a connection with the db info
const connectDb = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true
        });
        console.log("Connected to Db");
    } catch (err) {
        console.error(err.message);
        // exit the process
        process.exit(1);
    }
};

// export so all modules have access to this
module.exports = connectDb;

