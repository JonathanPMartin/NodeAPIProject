
import Router from 'koa-router'
import testRouter from './upload.js'
import publicRouter from './public.js'
import secureRouter from'./secure.js'
import detailsRouter from './details.js'
const mainRouter = new Router()

const nestedRoutes = [publicRouter, secureRouter,testRouter,detailsRouter]
for (const router of nestedRoutes) {
	mainRouter.use(router.routes())
	mainRouter.use(router.allowedMethods())
}

export default mainRouter
