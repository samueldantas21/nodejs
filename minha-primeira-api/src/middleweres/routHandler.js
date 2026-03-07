import { routes } from "../routes.js";
import {extractQueryParams } from "../ultils/extrat-querry-params.js";
import {Database} from "../database.js"

const database = new Database()




export function routHandler (request,response){
    // find server para proucura dentro das rotas
    const route = routes.find((route)=>{
        return route.method === request.method && route.path.test(request.url)
    })

    if(route){
        const routeParams = request.url.match(route.path)
        const{query,...Params} = routeParams.groups
        
       
        
        request.Params = Params
        request.query = query ? extractQueryParams(query) : {}

        return  route.controller({request,response,database})
    }
    return response.writeHead(404).end("rota nao encontrada")
}