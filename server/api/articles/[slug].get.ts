import { getDB } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const db = await getDB()

  const slug = getRouterParam(event, 'slug')

  const article = await db.collection('articles').findOne({ slug })

  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not found',
    })
  }

  return article
})