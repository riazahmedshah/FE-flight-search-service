import { AirportRepository } from "../repositories/AirportRepository";

export class AirportService{
    static async createAirport(name:string, address:string, city_id:number,){
        try {
            return await AirportRepository.createAirport(name,address,city_id);
        } catch (error) {
            console.error("Error creating airport:", error);
        }
    }
    
    static async getAirport(id:number){
        try {
           const airport = await AirportRepository.getAirport(id);
           if (!airport) throw new Error("Airport not found");
           return airport;
        } catch (error) {
            console.error("Error fetching airport:", error);
        }
    }

    static async getAllAirports(){
        try {
            return await AirportRepository.getAllAirports();
        } catch (error) {
            console.error("Error fetching all airports:", error);
        }
    }

    static async updateAirport(id:number, name:string, address:string){
        try {
            return await AirportRepository.updateAirport(id, name, address,);
        } catch (error) {
            console.error("Error updating airport:", error);
        }
    }

    static async deleteAirport(id:number){
        try {
            return await AirportRepository.deleteAirport(id);
        } catch (error) {
            console.error("Error deleting airport:", error);
        }
    }

}