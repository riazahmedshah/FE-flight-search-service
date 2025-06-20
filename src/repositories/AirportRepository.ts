import { prisma } from "../config/db";

export class AirportRepository {
    static async createAirport(name: string, address: string, city_id: number) {
        try {
            return await prisma.airport.create({
                data: {
                    name,
                    address,
                    city_id
                }
            });
        } catch (error) {
            console.error("Error creating airport:", error);
        }
    }

    static async updateAirport(id: number, name: string, address:string) {
        try {
            return await prisma.airport.update({
                where: { id },
                data: { name, address }
            });
        } catch (error) {
            console.error("Error updating airport:", error);
        }
    }

    static async deleteAirport(id: number) {
        try {
            return await prisma.airport.delete({
                where: { id }
            });
        } catch (error) {
            console.error("Error deleting airport:", error);
        }
    }

    static async getAirport(id: number) {
        try {
            return await prisma.airport.findUnique({
                where: { id },
                include: { city: true }
            });
            
        } catch (error) {
            console.error("Error fetching airport:", error);
        }
    }

    static async findAirportByName(name: string) {
        try {
            return await prisma.airport.findFirst({
                where: {
                    name: {
                        equals: name,
                        mode: 'insensitive'
                    }
                }
            });
        } catch (error) {
            console.error("Error finding airport by name:", error);
        }
    }

    static async getAllAirports() {
        try {
            return await prisma.airport.findMany({
                include: { city: true },
                orderBy: { name: 'asc' }
            });
        } catch (error) {
            console.error("Error fetching all airports:", error);
        }
    }
}