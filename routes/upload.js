import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import views from 'koa-views'
import bodyParser from 'koa-body'
import fs from 'fs-extra'
import mime from 'mime-types'
import Files from '../modules/updatefiles.js'
const app = new Koa()
const router = new Router({ prefix: '/test' })
const dbName ='website.db'
app.use(serve('public'))
// you need to install the "handlebars" package
app.use(bodyParser({multipart:true}))


app.use( async(ctx, next) => {
	console.log(`${ctx.method} ${ctx.path}`)
	await next()
})

router.get('/', async ctx => {
  await ctx.render('upload',ctx.hbs)
  
})

router.post('/', async ctx => {
  //import Files from '../modules/files.js'
  //const files=await new Files(dbName)
  console.log(ctx.request.body)
  console.log(ctx.request.files.myfile)
  const myfile = ctx.request.files.myfile
  const Name =ctx.request.body.nameofupload
  const dis=ctx.request.body.Details
  myfile.extension = mime.extension(myfile.type)
  console.log(`original filename: ${myfile.name}`)
  console.log(Name)
  console.log(dis)
  
  const data={
    userid : ctx.hbs.userid,
    uploadname : Name,
    filetype : myfile.extension
  }
 
 //const records =await files.all()
 //const x= myfile.type
 //const y=ctx.hbs.userid
 //const z= myfile.type
 //console.log(x)
  //await files.add()
  //await files.close()
  console.log(data)
  ctx.session.data='test'
  console.log(`mime-type: ${myfile.type}`)
  console.log(`correct file extension: ${myfile.extension}`)
  console.log(`file size (in bytes): ${myfile.size}`)
  console.log(`temp upload directory and name: ${myfile.path}`)
  try {
    await fs.copy(myfile.path, `uploads/${myfile.name}`)
  } catch(err) {
    console.log(err.message)
  } finally {
    //await files.add()
    ctx.session.data='test'
    ctx.hbs.data='test'
    ctx.fuckit='test'
    console.log('yer gonna try this shit again')
    ctx.redirect(`/secure?filetype=${myfile.extension}+&filename=${Name}&dis=${dis}`)
  }
})
router.get('/', async ctx => {
  console.log('testing my dumb idea')
  console.log(ctx.request.body)
  if (ctx.hbs.data !==null){
      console.log(ctx.hbs.data)
      await files.add(ctx.hbs.data)
      console.log('passed test')
  
    }
})
//const files=await new Files(dbName)
 //const records =await files.all()
 //const x= myfile.type
 //const y=ctx.hbs.userid
// const z= myfile.type
// console.log(x)
  //await files.add()
  //await files.close()
export default router
