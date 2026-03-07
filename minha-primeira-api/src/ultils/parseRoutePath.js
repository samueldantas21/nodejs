export function parseRoutePaht(path){

    // pegando tudo q vem depois do id
    const routeParametersRegex = /:([a-zA-Z]+)/g


    const withParams = path.replaceAll(routeParametersRegex,"(?<$1>[a-z0-9-_]+)")//essa parte e para pega o grupo nomeado da regex

    // aqui esta comparando se entra no padrao
    const pathRegex = new RegExp(`${withParams}(?<query>\\?(.*))?$`)//1nao nomeado 2nomeado
    

    return pathRegex
}
// parametros nao nomeados /products/:id

// parametro nomeda /products?page=4&category=computer