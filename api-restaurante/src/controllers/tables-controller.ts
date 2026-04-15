import { Request, Response,NextFunction} from "express"
import {database} from "../database/knex.ts"

class TablesController{
    async index(request: Request,response:Response,next:NextFunction){
        try {
            const tables = await database<TableRepository>("tables").select().orderBy("table_number")     

            return response.json(tables)
        } catch (error) {
            next(error)
            
        }
    }
}

export {TablesController}