import { NextResponse } from 'next/server'
import { keywordsList } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const limit = parseInt(searchParams.get('limit') || '10')

  let filteredKeywords = keywordsList

  if (query) {
    filteredKeywords = keywordsList.filter(
      (keyword) =>
        keyword.keyword.toLowerCase().includes(query.toLowerCase()) ||
        keyword.source.toLowerCase().includes(query.toLowerCase())
    )
  }

  return NextResponse.json({
    data: filteredKeywords.slice(0, limit),
    total: filteredKeywords.length,
    query,
  })
}
