import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'please provide your email'],
    lowercase: true,
    unique: true
  },
  username: String,
  password: {
    type: String,
    minlength: 8,
    select: false
  },
  phone: {
    type: String
  }
});

/*****Document middleware*****/
// get username from email
userSchema.pre('save', function(next) {
  this.username = this.email.match(/^([^@]*)@/)[1];
  next();
});


// hash passsword
userSchema.pre('save', async function(next) {
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(
  candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

if (!mongoose.models.User) {
  mongoose.model('User', userSchema);
}

export default mongoose.models.User;
