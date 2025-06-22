export interface flightProps{
    flight_number?:string
    departure_airport_id:number
    destination_airport_id:number
    airplane_id:number
    departure:Date
    arrival:Date
    price: number
    totalSeats?:number
    boardingGate?:string
}

export interface flightFilterProps{
    minPrice?:number,
    maxPrice?:number,
}