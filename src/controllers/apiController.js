import prisma from '../utils/prismaClient.js';

// --------------------

export const getFacts = async (req, res) => {
    try {
        const facts = await prisma.product.findMany();
        return res.json(facts);
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({error: "Database error"});
    }
};

export const createFacts = async (req, res) => {
    try {
        const { faction, charName, fact, image } = req.body;

        const newFact = await prisma.product.create({
            data: {
                faction,
                charName,
                fact,
                image: image || null,
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

};

export const updateFacts = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { faction, charName, fact, image } = req.body;

        const newFact = await prisma.product.update({
            where: { id : id },
            data: {
                faction: faction,
                charName: charName,
                fact: fact,
                image: image || null,
            }
        })

        return res.json({
            message: "Successfully updated fact!",
            data: newFact
        });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({error: "Database error"});
    }

};

export const deleteFacts = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const facts = await prisma.product.delete({where: { id: id }});

        return res.json({
            message: "Successfully deleted fact!"
        });
        
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({error: "Database error"});
    }
};

export const uploadImage = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.product.update({
            where: { id },
            data: { image: req.file.filename }
        });
        return res.json({ message: "Image uploaded", image: req.file.filename });
    } catch (err) {
        return res.status(500).json({ error: "Failed" });
    }
};


export const updateImage = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.product.update({
            where: { id },
            data: { image: req.file.filename }
        });
        return res.json({ message: "Image updated", image: req.file.filename });
    } catch (err) {
        return res.status(500).json({ error: "Failed" });
    }
};

export const deleteImage = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.product.update({
            where: { id },
            data: { image: null }
        });
        return res.json({ message: "Image deleted" });
    } catch (err) {
        return res.status(500).json({ error: "Failed" });
    }
};

/*
getimport fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "data.json");

const facts = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// --------------------

export const getFacts = (req, res) => {
    return res.json(facts);
}

export const createFacts = (req, res) => {
    const newId = facts[facts.length - 1].id + 1;
    const newFact = Object.assign({ id: newId }, req.body);
    facts.push(newFact);

    fs.writeFile(filePath, JSON.stringify(facts), (err) => {
        if (err) return res.json(err);
        return res.json({ Message: "Successfully created fact!" });
    });

}

export const deleteFacts = (req, res) => {
    const id = Number(req.params.id);
    const index = facts.findIndex(f => f.id === id);

    facts.splice(index, 1);

    fs.writeFile(filePath, JSON.stringify(facts), (err) => {
        if (err) return res.json(err);
        return res.json({ Message: "Successfully deleted fact!" });
    });
};
*/