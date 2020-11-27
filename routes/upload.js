import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import bodyParser from 'koa-body'
import fs from 'fs-extra'
import mime from 'mime-types'
const app = new Koa()
const router = new Router({ prefix: '/test' })
app.use(serve('public'))
// you need to install the "handlebars" package
app.use(bodyParser({multipart: true}))


app.use( async(ctx, next) => {
	console.log(`${ctx.method} ${ctx.path}`)
	await next()
})

router.get('/', async ctx => {
	await ctx.render('upload',ctx.hbs)

})

router.post('/', async ctx => {
	const myfile = ctx.request.files.myfile
	const Name =ctx.request.body.nameofupload
	const dis=ctx.request.body.Details
	myfile.extension = mime.extension(myfile.type)
	console.log(`original filename: ${myfile.name}`)
	console.log(Name)
	console.log(dis)
	console.log(`correct file extension: ${myfile.fileExtension}`)
	console.log(`file size (in bytes): ${myfile.size}`)
	console.log(`temp upload directory and name: ${myfile.path}`)
	try {
		await fs.copy(myfile.path, `uploads/${myfile.name}`)
	} catch(err) {
		console.log(err.message)
	} finally {
		console.log('yer gonna try this shit again')
		ctx.redirect(`/secure?filetype=${myfile.extension}+&filename=${Name}&dis=${dis}&userid=${ctx.hbs.userid}`)
	}
})

export default router
