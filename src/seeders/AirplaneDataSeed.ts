import { prisma } from "../config/db";

async function main(){
    const seedData = await prisma.airplane.createMany({
        data:[
            {
                model_number:"Boeing 747",
                capacity:400
            },
            {
                model_number:"Boeing 737 MAX",
                capacity:350
            },
            {
                model_number:"Airbus A350-900",
                capacity:700
            },
            {
                model_number:"Boeing 777-300ER"
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