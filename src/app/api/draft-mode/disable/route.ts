import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();

  const redirectPath = request.nextUrl.searchParams.get('redirect') ?? '/';
  const location = new URL(redirectPath, request.url);

  return NextResponse.redirect(location);
}
