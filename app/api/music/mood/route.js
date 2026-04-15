import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { getTracksByTag } from '@/lib/lastfm';
import { getMoodById } from '@/lib/moodMap';
import connectDB from '@/lib/mongodb';
import MoodSession from '@/models/MoodSession';

export async function POST(request) {
  try {
    // Auth check
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { moodId } = await request.json();

    // Validate mood
    const mood = getMoodById(moodId);
    if (!mood) {
      return NextResponse.json({ error: 'Invalid mood selection.' }, { status: 400 });
    }

    // Fetch tracks from Last.fm
    const tracks = await getTracksByTag(mood.tag, 20);

    if (!tracks || tracks.length === 0) {
      return NextResponse.json(
        { error: 'No tracks found for that mood. Try another!' },
        { status: 404 }
      );
    }

    // Persist mood session to MongoDB
    await connectDB();
    await MoodSession.create({
      userId: session.user.id,
      mood: mood.id,
      moodLabel: mood.label,
      moodEmoji: mood.emoji,
      tracks,
    });

    return NextResponse.json({ tracks, mood }, { status: 200 });
  } catch (err) {
    console.error('[Music Mood Error]', err);
    return NextResponse.json(
      { error: 'Failed to fetch music. Please try again.' },
      { status: 500 }
    );
  }
}
