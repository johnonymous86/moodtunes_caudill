import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import connectDB from '@/lib/mongodb';
import MoodSession from '@/models/MoodSession';

// GET /api/sessions - returns the current user's mood session history
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    await connectDB();

    const sessions = await MoodSession.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json({ sessions }, { status: 200 });
  } catch (err) {
    console.error('[Sessions Error]', err);
    return NextResponse.json(
      { error: 'Failed to load history.' },
      { status: 500 }
    );
  }
}
