// criando o serve
// "node:http" aqui esta dizendo q e do proprio node
import http from "node:http"
import {jsonBodyHandler} from "./middleweres/jsonHandler.js"
import { routHandler } from "./middleweres/routHandler.js"
// aqui ta pegando a solicitacao e devolvendo a resposta
const server = http.createServer(async(request, response)=>{
    // para passa a mesmo requisicao la pro jsonHandler
    // aqui vai aguarda a requisicao antes de segui o fluxo
    await jsonBodyHandler( request,response)
    routHandler(request,response)

})

// porta do servidor
server.listen(3333)












// os status do http

// 200 → deu certo (OK)

// 201 → algo foi criado

// 400 → requisição inválida

// 401 → não autorizado

// 404 → não encontrado

// 500 → erro interno do servidor





// http.createServer() → cria o servidor.

// (request, response) → recebe a requisição do cliente e permite enviar a resposta.

// response.end() → finaliza a resposta.

// server.listen(3000) → faz o servidor escutar na porta 3333.






// node src/serve.js usar no terminal para aparecer o console sem precisar ir na pagina html