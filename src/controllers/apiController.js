import prisma from '../utils/prismaClient.js';  // Add .js extension

// --------------------

export const getFacts = async (req, res) => {
    try {
        const facts = await prisma.product.findMany();
        return res.json(facts);
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({error: "Database error"});
    }
}

export const createFacts = async (req, res) => {
    try {
        const { faction, character, fact } = req.body;

        const newFact = await prisma.product.create({
            data: {
                faction,
                character,
                fact,
                image: "",
            }
        })

        return res.json({
            message: "Successfully created fact!",
            data: newFact
        });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({error: "Database error"});
    }

}

export const deleteFacts = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const facts = await prisma.product.delete({where: { id: id }});

        return res.json({
            message: "Successfuly deleted fact!"
        });
        
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({error: "Database error"});
    }
};