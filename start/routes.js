'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.get('/', 'AuthController.index').middleware(['auth:jwt'])
  Route.post('shopping', 'AuthController.storeShop').middleware(['auth:jwt'])
  Route.get('shopping', 'AuthController.getShop').middleware(['auth:jwt'])
  Route.post('signup', 'AuthController.store')
  Route.post('signin', 'AuthController.show')
}).prefix('api/users')
