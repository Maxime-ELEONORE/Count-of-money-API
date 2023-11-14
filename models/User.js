import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Invalid email format.'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }),
            message: 'Password is not strong enough.'
        }
    }, 
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
