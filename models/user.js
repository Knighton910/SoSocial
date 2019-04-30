const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
   username: {
       type: String, required: true, unique: true},
       password: { type: String, required: true },
       createdAt: { type: Date, default: Date.now },
       displayName: String,
       bio: String
});

const noop = () => {};

userSchema.pre('save', (done) => {
   const user = this;

   if (!user.isModified('password')) {
       return done()
   }

   // Generates a salt for the hash, and calls the inner func once completed
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) { return done(err); }
        bcrypt.hash(user.password, salt, noop, (err, hashedPassword) => {
            if (err) {return done(err); }
            user.password = hashedPassword
            done()
        })
    });
});

userSchema.methods.checkPassword = (guess, done) => {
    bcrypt.compare(guess, this.password, (err, isMatch) => {
        done(err, isMatch)
    })
};

userSchema.methods.name = () => {
    return this.displayName || this.username
}

const User = mongoose.model('User', userSchema)

module.exports = User;
