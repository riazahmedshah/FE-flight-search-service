import { prisma } from "../config/db";

export class AirportRepository {
    static async createAirport(name: string, address: string, city_id: number) {
        return await prisma.airport.create({
            data: {
                name,
                address,
                city_id
            }
        });
    }

    static async updateAirport(id: number, name: string, address:string) {
        return await prisma.airport.update({
            where: { id },
            data: { name, address }
        });
    }

    static async deleteAirport(id: number) {
        return await prisma.airport.delete({
            where: { id }
        })
    }

    static async getAirport(id: number) {
        return await prisma.airport.findUnique({
            where: { id },
            include: { city: true }
        });
    }

    static async findAirportByName(name: string) {
        return await prisma.airport.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                }
            }
        });
    }

    static async getAllAirports() {
        return await prisma.airport.findMany({
            include: { city: true },
            orderBy: { name: 'asc' }
        });
    }
}