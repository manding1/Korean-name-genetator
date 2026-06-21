import { NextRequest, NextResponse } from 'next/server';
import { match } from '@/lib/matchEngine';

export async function POST(request: NextRequest) {
  try {
    const { answers, userName } = await request.json();

    if (!Array.isArray(answers) || answers.length !== 10) {
      return NextResponse.json(
        { error: 'Invalid answers: must be an array of 10 items' },
        { status: 400 }
      );
    }

    const result = match(answers, typeof userName === 'string' ? userName : undefined);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json(
      { error: 'Failed to generate name. Please try again.' },
      { status: 500 }
    );
  }
}
