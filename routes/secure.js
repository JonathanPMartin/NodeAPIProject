
import Router from 'koa-router'
import Files from '../modules/files.js'
const dbName ='website.db'
const router = new Router({ prefix: '/secure' })
import Koa from 'koa'
import serve from 'koa-static'
import views from 'koa-views'
import bodyParser from 'koa-body'
import fs from 'fs-extra'
import mime from 'mime-types'
const app = new Koa()
async function checkAuth(ctx, next) {
	console.log('secure router middleware')
	console.log(ctx.hbs)
	if(ctx.hbs.authorised !== true) return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
	if(ctx.hbs.dis !== undefined) {
		const data={
			userid: 1,
			uploadname: ctx.hbs.filename,
			filetype: ctx.hbs.filetype
		}
		const files=await new Files(dbName)
		files.add(data)
		return ctx.redirect('/secure')
	}
	await next()
}

router.use(checkAuth)

router.get('/', async ctx => {
	const files=await new Files(dbName)
	try {
		const records =await files.all()
		console.log(records)
		ctx.hbs.records=records
		console.log(' before data')
		console.log(ctx.hbs.filetype)
		console.log(ctx.hbs.filename)
		console.log(ctx.hbs.dis)
		console.log(ctx.hbs.data)
		if (ctx.session.data !== null) {
			console.log('fuck yer')
		}
		await ctx.render('secure', ctx.hbs)
		await files.close()
	} catch(err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}
})
router.get

export default router
