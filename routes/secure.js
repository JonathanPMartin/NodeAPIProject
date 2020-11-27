
import Router from 'koa-router'
import Files from '../modules/files.js'
const dbName ='website.db'
const router = new Router({ prefix: '/secure' })
async function checkAuth(ctx, next) {
	console.log('secure router middleware')
	console.log(ctx.hbs.userid)
	if(ctx.hbs.authorised !== true) return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
	if(ctx.hbs.dis !== undefined) {
		const data={
			uid: ctx.hbs.userid,
			uploadname: ctx.hbs.filename,
			filetype: ctx.hbs.filetype
		}
		const files=await new Files(dbName)
		await files.add(data)
		await files.close()
		return ctx.redirect('/secure')
	}
	await next()
}

router.use(checkAuth)

router.get('/', async ctx => {
	const files=await new Files(dbName)
	try {
		const records =await files.all(ctx.hbs.userid)
		//const records =await files.getByID(1)
		console.log('records')
		console.log(records)
		ctx.hbs.records=records
		await ctx.render('secure', ctx.hbs)
		await files.close()
	} catch(err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}
})
router.get

export default router
