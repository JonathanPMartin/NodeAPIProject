
import Router from 'koa-router'
import uploadRouter from './upload.js'
import publicRouter from './public.js'
import homepageRouter from'./homepage.js'
import detailsRouter from './details.js'
const mainRouter = new Router()

const nestedRoutes = [publicRouter, homepageRouter,uploadRouter,detailsRouter]
for (const router of nestedRoutes) {
	mainRouter.use(router.routes())
	mainRouter.use(router.allowedMethods())
}

export default mainRouter
