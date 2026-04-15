import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// POST /api/register
// Creates a new user. Password is hashed automatically by the User model's
// pre-save hook (see models/User.js) — no manual bcrypt call needed here.
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are all required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check for existing account
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json(
        { error: 'An account with that email already exists.' },
        { status: 409 }
      );
    }

    // Create user — password hashed via pre-save hook
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });
    await user.save();

    return NextResponse.json(
      { message: 'Account created successfully.', userId: user._id.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error('[Register Error]', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
