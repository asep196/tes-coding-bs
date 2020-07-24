'use strict'
const User = use('App/Models/User')
const Shopping = use('App/Models/Shopping')

class AuthController {
    async index({response, request, auth}){
        const users = await User.all()
        response.header('Content-type', 'application/json')
        return response.send(users)
    }
    async getShop({response, request, auth}){
        const shops = await Shopping.all()
        response.header('Content-type', 'application/json')
        return response.send(shops)
    }
    async show({request, response, auth}){
        let res={}
        let req=request.post()
        let user = await User.findBy('email', req.email)
        let token = await auth.attempt(req.email, req.password)
        res.token = token.token
        res.username = user.username
        res.email= user.email
        response.header('Content-type', 'application/json')
        return response.send(res)
    }
    async storeShop({response, request, auth}){
        let data = request.post()
        Shopping.create({
            name:data.shopping.name
        })
        response.header('Content-type', 'application/json')
        return response.send({
            messsage:"success"
        })
    }
    async store({response, request, auth}){
        let data = request.post()
        let token={}
        let res = {}
        const user = await User.create({
            username:data.users.username,
            email:data.users.email,
            password:data.users.encrypted_password,
            phone:data.users.phone,
            country:data.users.country,
            city:data.users.city,
            postcode:data.users.postcode,
            name:data.users.name,
            address:data.users.address
        })
        response.header('Content-type', 'application/json')
        token = await auth.attempt(data.users.email, data.users.encrypted_password)
        res.email = data.users.email
        res.username = data.users.username
        res.token = token.token
        response.send(res)
    }
}

module.exports = AuthController
