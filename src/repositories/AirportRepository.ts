import { prisma } from "../config/db";

export class AirportRepository{
    static async createAirport(name:string, address:string, city_id: number){
        return await prisma.airport.create({
            data:{
                name,
                address,
                city_id
            }
        })
    }

    static async updateAirposrt(id:number, name:string){
        return await prisma.airport.update({
            where: {
                id
            },
            data: {
                name
            }
        })
    }

    static async deleteAirport(id:number){
        return await prisma.airport.delete({
            where:{
                id
            }
        })
    }
}