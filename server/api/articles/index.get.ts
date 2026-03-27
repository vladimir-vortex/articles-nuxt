import { getDB } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const db = await getDB()

  const { page = '1', per_page = '12' } = getQuery(event)

  const pageNum = Number(page)
  const perPageNum = Number(per_page)

  const skip = (pageNum - 1) * perPageNum

  const collection = db.collection('articles')

  const [data, total] = await Promise.all([
    collection
      .find({}, { projection: { content: 0 } })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(perPageNum)
      .toArray(),

    collection.countDocuments(),
  ])

  return {
    data,
    total,
    page: pageNum,
    perPage: perPageNum,
    lastPage: Math.ceil(total / perPageNum),
  }
})