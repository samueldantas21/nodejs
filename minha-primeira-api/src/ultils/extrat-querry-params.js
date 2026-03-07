export function extractQueryParams(query){
    // esse 1 para pular uma casa vai aparecer sem interrogacao
    // split ta tirando o &
    
    
    return query.slice(1).split("&").reduce((queryParams,param) => {
        // eliminando o sinal de =
        const [ key,value ] = param.split("=")
        
        queryParams[key]=value
        return queryParams
    } ,{})
}
// recuperando os paramentros nomeados