import "dotenv/config";
console.log("DATABASE_URL Loaded:", process.env.DATABASE_URL);

import { PrismaClient } from '@prisma/client';

import { readFileSync } from 'fs';
import path from 'path';
import 'dotenv/config';

const filePath = path.join(process.cwd(), "data", "data.json");
const data = JSON.parse(readFileSync(filePath, "utf-8"));

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.product.deleteMany();
        await prisma.faction.deleteMany();

        await prisma.faction.createMany({
            data: [
                { name: "Autobot" },
                { name: "Decepticon" },
                { name: "Insecticon" }
            ]
        });

        const factions = await prisma.faction.findMany();

        for (let product of data) {
            const matchingFaction = factions.find(f => f.name === product.faction);

            await prisma.product.create({
                data: {
                    charName: product.charName,
                    fact: product.fact,
                    image: product.image || null,
                    faction: product.faction,
                    factionId: matchingFaction?.id
                }
            });
        }
        console.log(`Successfully seeded ${data.length} products!`);
    } catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();