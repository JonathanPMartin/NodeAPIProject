
import Router from 'koa-router'
import Files from '../modules/files.js'
const dbName ='website.db'
const router = new Router({ prefix: '/secure' })

async function checkAuth(ctx, next) {
	console.log('secure router middleware')
	console.log(ctx.hbs)
	if(ctx.hbs.authorised !== true) return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
	await next()
}

router.use(checkAuth)

router.get('/', async ctx => {
  const files=await new Files(dbName)
	try {
    const records =await files.all()
    console.log(records)
    ctx.hbs.records=records
    
		await ctx.render('secure', ctx.hbs)
    await files.close()
	} catch(err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}
})

export default router
