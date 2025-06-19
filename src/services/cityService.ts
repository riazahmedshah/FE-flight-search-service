import { CityRepository } from "../repositories";

export class cityService{
    static async createCity(name:string){
        try {
            return await CityRepository.createCity(name)
        } catch (error) {
            console.error(error)
        }
    }

    static async deleteCity(cityId:number){
        try {
            return await CityRepository.deleteCity(cityId)
        } catch (error) {
            console.error(error)
        }
    }

    static async getCity(cityId:number){
        try {
            return await CityRepository.getCity(cityId)
        } catch (error) {
            console.error(error)
        }
    }

    static async updateCity(cityId:number, data:{name:string}){
        try {
            return await CityRepository.updateCity(cityId, data)
        } catch (error) {
            console.error(error)
        }
    }
}