import Router from 'koa-router'
import Files from '../modules/files.js'
const dbName ='website.db'
const router = new Router({ prefix: '/details' })
router.get('/', async ctx => {
	const files=await new Files(dbName)
	try {
    const record=await files.column(ctx.hbs.column)
    console.log(record[0])
    ctx.hbs.record=record[0]
    await ctx.render('details', ctx.hbs)
    await files.close()
	} catch(err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
    console.log(err)
	}
})
export default router