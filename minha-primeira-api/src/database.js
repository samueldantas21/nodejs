// criando o arquivo para salvar dados

import fs from "node:fs/promises"
const DATABASE_PATH = new URL("db.json",import.meta.url) 

export class Database{
    // pra deixa privado usa o #
    // ele so fica disponivel dentro da class
    #database = {}


    constructor(){
        // readfile e para ler o conteudo de um arquivo
        fs.readFile(DATABASE_PATH,"utf8")
        .then((data)=>{
            this.#database = JSON.parse(data)
        })
        .catch(() => this.persist())
       
    }
    

    persist() {
        fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
    }

    insert(table,data){
        // para verifcar se dentro do database tem a table
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }
        else{
            // aqui e pra caso nao tenha um produto ele vai criar um 
            this.#database[table] = [data]
        }
        this.persist()
    }
     
    
    select (table){
        // se tivver conteudo retor o conteudo da tabela se nao tem retorna uma lista vazia
        return this.#database[table] ?? []
    }
}


