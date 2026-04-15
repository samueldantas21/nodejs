
import { Request,Response,NextFunction} from "express"
import {z} from "zod"
import { database } from "../database/knex"
import { AppError} from "../utils/AppEror"
import knex from "knex"



class OrdersController{
    async create(request:Request,response:Response,next:NextFunction){

        try {
            // ele define um schema para validar os dados do body
            const bodySchema = z.object({
                table_session_id: z.number(),
                product_id: z.number(),
                quantity: z.number(),
            })
            
            const {table_session_id, product_id, quantity} = bodySchema.parse(request.body)

            const session = await database<TablesSessionsRepository>("tables_sessions").where({id:table_session_id}).first()

            if(!session){
                throw new AppError("session table not found")
            }

            if(session.closed_at){
                throw new AppError("this table ic closed")
            }

            const product = await database<ProductRepository>("products")
            .where({id:product_id})
            .first()

            if (!product){
                throw new AppError("product not found")
            }

            await database<OrderRepository>("orders").insert({
                product_id,
                table_session_id,
                quantity,
                price: product.price
            })

            return response.status(201).json()


        } catch (error) {
            next(error)
        }


    }

    async index(request:Request,response:Response,next:NextFunction){
        try {
            const { table_session_id } =  request.params

            // lembrar q pra fazer a conexao com o banco de dados tem q usar o nome q vc utilizou pra exporta
            const order = await database("orders")
            .select(
                "orders.id",
                "orders.table_session_id",
                "orders.product_id",
                "products.name",
                "orders.price",
                "orders.quantity",
                database.raw("(orders.price * orders.quantity) AS total"),
                "orders.created_at",
                "orders.updated_at"
            )
            .join(
                "products",
                "products.id",
                "orders.product_id"
            )//qual quer erro de nome vem aqui da uma olhada 
            .where({ table_session_id })
            .orderBy("orders.created_at","desc")
            


            return response.json(order)
        } catch (error) {
            next(error)
        }
    }

    async show (request:Request,response:Response,next:NextFunction){

        try {

            const { table_session_id } = request.params

            const order = await database("orders")
            .select(
                database.raw("COALESCE(SUM(orders.price * orders.quantity),0) AS TOTAL"),
                database.raw("COALESCE(SUM( orders.quantity),0) AS QUANTITY")
            )
            
            .where({table_session_id})
            .first()

            return response.json(order)
        } catch (error) {
            next(error)
        }
    }


}

export{ OrdersController }