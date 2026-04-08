/**
 * ISR Revalidation Webhook
 * WordPress calls this endpoint when content is published/updated
 * URL: https://psalmsalive.com/api/revalidate?secret=YOUR_SECRET
 *
 * In WordPress, add this to functions.php or use a plugin like
 * "WP Webhooks" to POST to this URL on post save/publish.
 */

import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const { type, slug } = body

    if (type === 'episode' && slug) {
      revalidatePath(`/episodes/${slug}`)
      revalidatePath('/episodes')
      revalidatePath('/')
      revalidatePath('/sitemap.xml')
    } else if (type === 'settings') {
      revalidatePath('/', 'layout')
      revalidatePath('/sitemap.xml')
    } else {
      revalidatePath('/')
      revalidatePath('/episodes')
      revalidatePath('/about')
      revalidatePath('/faith-journey')
      revalidatePath('/contact')
      revalidatePath('/sitemap.xml')
    }

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated: ${type ?? 'all'} ${slug ?? ''}`.trim(),
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    return NextResponse.json(
      { message: 'Revalidation failed', error: String(err) },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
}