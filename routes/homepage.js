
import Router from 'koa-router'
import Files from '../modules/files.js'
const dbName ='website.db'
const router = new Router({ prefix: '/homepage' })
//function exists to bypass linter waring of to many lines in an async function
//and retruns the data used to add a new entry to the database
function dataval(ctx) {
	const data={
		uid: ctx.hbs.userid,
		uploadname: ctx.hbs.filename,
		filetype: ctx.hbs.filetype,
		file: ctx.hbs.file,
		filesize: ctx.hbs.filesize,
		des: ctx.hbs.des
	}
	return data
}
async function checkAuth(ctx, next) {
	const files= await new Files(dbName)
	if(ctx.hbs.authorised !== true) {//if the user is not logged in redirect to login
		return ctx.redirect(`/login?msg=you need to log in&referrer=/homepage?userid=${ctx.hbs.userid}`)
	}
	//below checks if delete is true, if it is it deletes the row specified in row and then redirects
	//this is done to avoid long urls
	if(ctx.hbs.userid === undefined) return ctx.redirect('/logout')
	if (ctx.hbs.delete !== undefined) {
		await files.delete(ctx.hbs.row)
		await files.close()
		return ctx.redirect(`/homepage?userid=${ctx.hbs.userid}`)
	}
	//checks if des is defined if it is it adds new data to the database and redircts to homepage to avoid a long url
	if(ctx.hbs.des !== undefined) {
		await files.add(dataval(ctx))
		await files.close()
		return ctx.redirect(`/homepage?userid=${ctx.hbs.userid}`)
	}
	await next()
}

router.use(checkAuth)

router.get('/', async ctx => {//displays the uploads the user has made
	const files=await new Files(dbName)
	try {
		const records =await files.all(ctx.hbs.userid)
		console.log('records')
		console.log(records)
		ctx.hbs.records=records
		await ctx.render('homepage', ctx.hbs)
		await files.close()
	} catch(err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
		console.log(err)
	}
})


export default router
