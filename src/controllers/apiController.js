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
};

export const createFacts = async (req, res) => {
    try {
        const { faction, character, fact, image } = req.body;

        const newFact = await prisma.product.create({
            data: {
                faction,
                character,
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
        const { faction, character, fact, image } = req.body;

        const newFact = await prisma.product.update({
            where: { id : id },
            data: {
                faction: faction,
                character: character,
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
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded "});
        }

        return res.json({
            message: "Image uploaded successfully",
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`
        });
    } catch (err) {
        console.error("Upload error", err);
        return res.status(500).json({
            error: "Upload failed"
        });
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