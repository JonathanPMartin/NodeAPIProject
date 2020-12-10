import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import bodyParser from 'koa-body'
import fs from 'fs-extra'
import mime from 'mime-types'
const app = new Koa()
const router = new Router({ prefix: '/upload' })
app.use(serve('public'))
app.use(bodyParser({multipart: true}))


app.use( async(ctx, next) => {
	console.log(`${ctx.method} ${ctx.path}`)
	await next()
})

router.get('/', async ctx => {//recorves the handlebars data
	await ctx.render('upload',ctx.hbs)

})

router.post('/', async ctx => {
	const myfile = ctx.request.files.myfile //stores the info for the file
	const body =ctx.request.body //stores the info of the body from handlebars
	let str=''
	// the code below is used in to get the correct file type as mime type often gives an incorect value
	for(let i = 0; i < myfile.name.length; i++) {
		if (myfile.name[i]==='.') {
			let j=i
			for(j; j<myfile.name.length; j++) str=str+myfile.name[j]

		}
	}
	myfile.extension = mime.extension(myfile.type)
	try {
		// saves the file uploaded to public/uploads
		await fs.copy(myfile.path, `public/uploads/${myfile.name}`)
		// below redirects to homepage passing filename and des
		// as the adding proccess for the database did not work with a router.post statememt
		ctx.redirect(`/homepage?filetype=${str}+&filename=${body.nameofupload}&des=${body.Details}&\
userid=${ctx.hbs.userid}&file=${myfile.name}&filesize=${myfile.size}`)
	} catch(err) {
		console.log(err.message)
	}
})

export default router
