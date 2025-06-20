import { prisma } from "../config/db";

async function main(){
    const seedData = await prisma.airport.createMany({
        data:[
            {
                name:"Rajiv Gandhi International Airport",
                address:"Hyderabad",
                city_id:2
            },
            {
                name:"Warangal Airport",
                address:"Warangal",
                city_id:2
            },
            {
                name:"Begumpet Airport ",
                address:"Begumpet",
                city_id:2
            },
            {
                name:"Nizamabad Airport",
                address:"Nizamabad",
                city_id:2
            },
        ]
    })
    console.log(seedData)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })