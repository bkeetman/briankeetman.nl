import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type RevalidateBody = {
  secret?: string;
  type?: 'post' | 'portfolio' | string;
  slug?: string;
};

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, message: 'Missing SANITY_REVALIDATE_SECRET env' },
      { status: 500 }
    );
  }

  const body = (await req.json().catch(() => null)) as RevalidateBody | null;
  if (!body || body.secret !== secret) {
    return NextResponse.json(
      { ok: false, message: 'Invalid secret' },
      { status: 401 }
    );
  }

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

  tags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({ ok: true, tags: Array.from(tags) });
}
