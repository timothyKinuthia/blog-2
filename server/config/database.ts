import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

mongoose.connect(`${uri}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) throw err;
    console.log(`CONNECTED TO DATABASE`)
});