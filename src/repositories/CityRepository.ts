import { prisma } from "../config/db";

export class CityRepository {
    static async createCity(name:string){
        return await prisma.city.create({
            data:{
                name
            }
        })
    }

    static async deleteCity(id:number){
        return await prisma.city.delete({
            where:{
                id
            }
        })
    }
}