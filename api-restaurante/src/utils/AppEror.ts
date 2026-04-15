class AppError{
    message: string
    statusCode:number

    constructor(message:string, statuCode: number = 400){

        this.message = message
        this.statusCode = statuCode
    }
}
export {AppError}