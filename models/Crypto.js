import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    symbol: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    coinID: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: false,
        default: "",
        trim: true
    }
}, {
    timestamps: true
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

export default Crypto;
