const model = require('../models')
const { generateId } = require('../utils/idgen')

async function getPublicArticles() {
	return await model.BlogArticle.findAll({
		where: { status_id: 1 },
		order: [['created_at', 'DESC']]
	})
}

async function getArticleById(id) {
	return await model.BlogArticle.findByPk(id)
}

async function createArticle() {
	const id = await generateId(10, model.BlogArticle)

	await model.BlogArticle.create({
		id,
		created_at: Date.now(),
		updated_at: Date.now(),
		status_id: 3
	})

	return id
}

async function deleteArticle(id) {
	const article = await model.BlogArticle.findByPk(id)
	if (!article) {
		throw new Error('Article not found')
	}

	const t = await model.sequelize.transaction()
	try {
		await model.BlogLocale.destroy({ where: { article_id: id }, transaction: t })
		await model.BlogComment.destroy({ where: { article_id: id }, transaction: t })
		await article.destroy({ transaction: t })
		await t.commit()
	} catch (err) {
		await t.rollback()
		throw err
	}
}

async function publishArticle(id, statusId) {
	if (![1, 2].includes(statusId)) {
		throw new Error('Invalid status id for publishing')
	}

	const article = await model.BlogArticle.findByPk(id)
	if (!article) {
		throw new Error('Article not found')
	}

	return await article.update({
		status_id: statusId,
		published_at: new Date(),
		updated_at: new Date()
	})
}

module.exports = {
	createArticle,
	deleteArticle,
	publishArticle,
	getPublicArticles,
	getArticleById
}

