const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    avatar: { type: String, default: "avatar19" },
    password: { type: String, required: true },
    rankedScore: { type: Number, default: 0.00 },
    trustScore: { type: Number, default: 100 },
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.statics.register = async function (username, password) {
    const User = this;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const user = new User({ username, password });
    await user.save();

    return user.generateAuthToken();
};

UserSchema.statics.login = async function (username, password) {
    const User = this;
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return user.generateAuthToken();
};

UserSchema.methods.generateAuthToken = function () {
    const user = this;

    const payload = {
        user: {
            id: user._id,
            username: user.username,
        },
    };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = mongoose.model("User", UserSchema);
