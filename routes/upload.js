import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import views from 'koa-views'
import bodyParser from 'koa-body'
import fs from 'fs-extra'
import mime from 'mime-types'

const app = new Koa()
const router = new Router({ prefix: '/test' })

app.use(serve('public'))
// you need to install the "handlebars" package
app.use(bodyParser({multipart:true}))


app.use( async(ctx, next) => {
	console.log(`${ctx.method} ${ctx.path}`)
	await next()
})

router.get('/', async ctx => {
  await ctx.render('upload')
})

router.post('/', async ctx => {
  console.log(ctx.request.body)
  console.log(ctx.request.files.myfile)
  const myfile = ctx.request.files.myfile
  myfile.extension = mime.extension(myfile.type)
  console.log(`original filename: ${myfile.name}`)
  console.log(`mime-type: ${myfile.type}`)
  console.log(`correct file extension: ${myfile.extension}`)
  console.log(`file size (in bytes): ${myfile.size}`)
  console.log(`temp upload directory and name: ${myfile.path}`)
  try {
    await fs.copy(myfile.path, `uploads/${myfile.name}`)
  } catch(err) {
    console.log(err.message)
  } finally {
    ctx.redirect('/')
  }
})
export default router
