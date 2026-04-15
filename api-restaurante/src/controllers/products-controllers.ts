import { NextFunction, Request, Response } from "express"
import { z} from "zod"
import { database } from "../database/knex.ts"

import { AppError } from "../utils/AppEror"


class ProductController{
    async index(request:Request, response: Response, next:NextFunction){
        try {
            const { name } = request.query

            const products = await database<ProductRepository>("products")
            .select()
            .whereLike("name",`%${name ?? ""}%`)
            .orderBy("name")
            
        

            return response.json(products)
        } catch (error) {
            next(error)   
        }
    }

    // criando 
    async create(request:Request, response: Response, next:NextFunction){
        try {
            const bodySchema = z.object({
                name:z.string().trim().min(6),
                price:z.number().gt(0,)
            })

            const {name,price} = bodySchema.parse(request.body)

            await database<ProductRepository>("products").insert({name,price}) //se de erro olhar aqui o "ProductRepository"

            return response.status(201).json()

        } catch (error) {
            next(error)
        }
    }

    async update(request:Request, response: Response, next:NextFunction){

        try {

            // convertndo o id do upadate so pra receber numero 
            const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), {message:"id must be a number"})
            .parse(request.params.id)


            const bodySchema = z.object({
                name:z.string().trim().min(5),
                price: z.number().gt(0),
            })

            const {name,price} = bodySchema.parse(request.body)
            
            const product = await database<ProductRepository>("products")
            .select()
            .where({ id })
            .first()

            if(!product){
                throw new AppError("product not found")
            }

            await database<ProductRepository>("products")
                .update({name,price,updated_at: database.fn.now()})
                .where({id})

            return response.json()
        } catch (error) {
            next(error)
        }
    }

    async remove(request:Request, response: Response, next:NextFunction){
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), {message:"id must be a number"})
                .parse(request.params.id)

                const products = await database<ProductRepository>("products")
                .select()
                .where({ id })
                .first()

                if(!products){
                    throw new AppError("Product not found")
                }
                
                await database<ProductRepository>("products").delete().where({id})
            
            return response.json()
        } catch (error) {
            next(error)
        }
    }


}
export {ProductController}