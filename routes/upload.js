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
	const body =ctx.request.body
	let str=''
	for(let i = 0; i < myfile.name.length; i++) {
		if (myfile.name[i]==='.') {
			let j=i
			for(j; j<myfile.name.length; j++) {
				str=str+myfile.name[j]
			}
		}
	}
	myfile.extension = mime.extension(myfile.type)
	try {
		await fs.copy(myfile.path, `public/uploads/${myfile.name}`)
		ctx.redirect(`/secure?filetype=${str}+&filename=${body.nameofupload}&des=${body.Details}&userid=${ctx.hbs.userid}&file=${myfile.name}&filesize=${myfile.size}`)
	} catch(err) {
		console.log(err.message)
	}
})

export default router
