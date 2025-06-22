import { prisma } from "../config/db";

export class AirplaneRepository{
    static async createAirplane(model_number:string, capacity:number){
        return await prisma.airplane.create({
            data:{
                model_number,
                capacity
            }
        })
    }

    static async getAirplane(id:number){
        try {
            return await prisma.airplane.findFirst({
                where:{
                    id
                },
            })
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteAirplane(id:number){
        return await prisma.airplane.delete({
            where:{
                id
            }
        })
    }
}