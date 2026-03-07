export async function jsonBodyHandler(request,response) {

    // adicionar cada chunk.
    const buffers=[]   
    
    
    // recuperando os pedacos da requisicao
    // coleta os chunk de dados da requisicao
    for await (const chunk of request){
        buffers.push(chunk)

    }
    try {   
        // contatenar os chunk e converte para string. Em seguida converte a string para json
        // Buffer.concat junta os pedaços recebidos em um único buffer,o conteudo do body
        request.body = JSON.parse(Buffer.concat(buffers).toString())

    } catch (error) {
        request.body = null
     
    }
    //definindo a propriedade de Content-Type,application/json pra dizer q o conteudo e json
    // define o header de resposta com JSON
    response.setHeader("Content-Type","application/json")



} 
