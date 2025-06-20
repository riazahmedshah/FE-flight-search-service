import { prisma } from "../config/db";

export class CityRepository {
    static async createCity(name:string){
        try {
            return await prisma.city.create({
                data:{
                    name
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    static async deleteCity(cityId:number){
        try {
            await prisma.city.delete({
                where:{
                    id:cityId
                }
            })
            return true
        } catch (error) {
            console.error(error)
        }
    }

    static async getCity(cityId:number){
        try {
            return await prisma.city.findFirst({
                where:{
                    id:cityId,
                },
                include:{airports:true}
            })
        } catch (error) {
            console.error(error)
        }
    }

    static async findCityByCityName(name:string){
        try {
            return await prisma.city.findFirst({
                where:{
                    name:{
                        equals: name,
                        mode:'insensitive'
                    }
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    static async updateCity(cityId:number, data:{name:string}){
        try {
            return await prisma.city.update({
                where:{
                    id:cityId,
                },
                data:data,
            })
        } catch (error) {
            console.error(error)
        }
    }

    static async getAllCities(filter: string){
        try {
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

        } catch (error) {
            console.error("REPOSITORY_LAYER",error)
        }
    }
}