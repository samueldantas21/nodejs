// para fazer a conexao com o banco de dados

// usa desse geito pq se usar usando o as vai da errado 

import knex from "knex"
import config from "../../knexfile"

export const database = knex(config)
