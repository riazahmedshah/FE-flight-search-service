import { prisma } from "../config/db";

export class CityRepository {
    static async createCity(name:string){
        return await prisma.city.create({
            data:{
                name
            }
        })
    }

    static async deleteCity(cityId:number){
        await prisma.city.delete({
            where:{
                id:cityId
            }
        })
        return true
        
    }

    static async getCity(cityId:number){
        return await prisma.city.findFirst({
            where:{
                id:cityId,
            },
            include:{airports:true}
        })
    }

    static async findCityByCityName(name:string){
        return await prisma.city.findFirst({
            where:{
                name:{
                    equals: name,
                    mode:'insensitive'
                }
            }
        })
    }

    static async updateCity(cityId:number, data:{name:string}){
        return await prisma.city.update({
            where:{
                id:cityId,
            },
            data:data,
        })
    }

    static async getAllCities(filter: string){
        if(filter){
            return await prisma.city.findMany({
                where:{
                    name:{
                        startsWith:filter,
                        mode:'insensitive'
                    }
                }
            })
        }
        return await prisma.city.findMany();
    }
}