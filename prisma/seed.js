import { PrismaClient } from '../src/generated/prisma/client.js';
import { readFileSync } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), "data", "data.json");
const data = JSON.parse(readFileSync(filePath, "utf-8"));

const prisma = new PrismaClient();

async function main() {
    await prisma.product.deleteMany();
    for (let product of data) {
        await prisma.product.create({
            data: {
                faction: product.faction,
                character: product.character,
                fact: product.fact,
                image: product.image || null,
            }
        });
    }
    console.log(`Seeded ${data.length} data`);
}

main().catch(err => {
    console.log(err);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})