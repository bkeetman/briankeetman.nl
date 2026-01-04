import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type RevalidateBody = {
  type?: 'post' | 'portfolio' | string;
  slug?: string;
};

export async function POST(req: NextRequest) {
  const secretHeaderName = 'x-sanity-secret';
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error('Revalidate request rejected: missing SANITY_REVALIDATE_SECRET');
    return NextResponse.json(
      { ok: false, message: 'Missing SANITY_REVALIDATE_SECRET env' },
      { status: 500 }
    );
  }

  const providedSecret = req.headers.get(secretHeaderName);
  if (!providedSecret || providedSecret !== secret) {
    console.warn('Revalidate request rejected: invalid or missing header secret', {
      hasHeader: Boolean(providedSecret),
      headerName: secretHeaderName,
    });
    return NextResponse.json(
      { ok: false, message: 'Invalid secret' },
      { status: 401 }
    );
  }

  const body = (await req.json().catch(() => null)) as RevalidateBody | null;
  if (!body) {
    console.warn('Revalidate request rejected: unable to parse body');
    return NextResponse.json(
      { ok: false, message: 'Invalid body' },
      { status: 400 }
    );
  }

  console.info('Revalidate request accepted', {
    type: body.type,
    slug: body.slug,
    auth: 'header',
  });

  const tags = new Set<string>();

  if (body.type === 'post') {
    tags.add('post');
    if (body.slug) tags.add(`post:${body.slug}`);
  } else if (body.type === 'portfolio') {
    tags.add('portfolio');
    if (body.slug) tags.add(`portfolio:${body.slug}`);
  } else {
    // fallback: revalidate everything we tag
    tags.add('post');
    tags.add('portfolio');
  }

  const tagsList = Array.from(tags);
  tagsList.forEach((tag) => revalidateTag(tag));

  console.info('Revalidate request processed', { tags: tagsList });

  return NextResponse.json({ ok: true, tags: tagsList });
}
