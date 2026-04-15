import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [6, 'Password must be at least 6 characters.'],
    },
  },
  {
    timestamps: true,
  }
);

// ─── Pre-save hook ────────────────────────────────────────────────────────────
// Hash the password before a new document is inserted.
// Mirrors the pattern from the original mongo-auth starter repo.
// Skipped on updates so existing hashes are never double-hashed.
UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Prevent model re-registration during Next.js hot-reload
export default mongoose.models.User || mongoose.model('User', UserSchema);
