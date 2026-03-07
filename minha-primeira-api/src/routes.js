import {parseRoutePaht} from "./ultils/parseRoutePath.js"
export const routes = [
    // separando as roatas
    // se o método for GET e a URL for /product, retorna a lista de produtos
    {
        method:"GET",
        path: "/products",
        controller:({request,response,database})=>{
            const products =  database.select("products")
        
            // verifica a requisição e retorna uma resposta ao cliente
            return response.end(JSON.stringify(products))//confirir
        }
    },
    {
        method:"POST",
        path: "/products",
        controller:({request,response, database})=>{
            const {name,price} = request.body


            database.insert("products",{name,price})
            // verifica a requisição e retorna uma resposta ao cliente
            // tem q usar o JSON.stringify para transforma ele para texto
            return response.writeHead(201).end()
        }
       
 
    },
    {
        method:"DELETE",
        // para pegar um id escolhido 
        path: "/products/:id",
        controller:({request,response})=>{
            return response.end(request.Params.id)
        }
       
    }
    // pecorrendo cada rota
].map((route)=>({
    ...route,
    path:parseRoutePaht(route.path)
}))