const express = require('express')
const router = express.Router()

const {getPerfumes, createPerfume, updatePerfume, deletePerfume, getLimitedPerfumes, getPerfumeById} = require("../models/PerfumesModel")
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')


router.get("/", async (req, res)=>{
    try{
        const { limit } = req.query;
        const perfumes = limit ? await getLimitedPerfumes(limit) : await getPerfumes();
        res.status(200).json(perfumes)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch perfumes" });
    }
})
router.get("/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const perfume = await getPerfumeById(id);
        res.status(200).json(perfume)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch perfume" });
    }
})



router.post("/",verifyToken,isAdmin, async (req, res)=>{
    try{
        
        const {name, stockQuantity, price, gender, sizeMl, pictureUrl} = req.body;
        const perfume = await createPerfume(name, stockQuantity, price, gender, sizeMl, pictureUrl)
        res.status(201).json(perfume)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

router.put("/:id",verifyToken , isAdmin, async(req, res)=>{
    try{
        const {name, stockQuantity, price, gender, sizeMl, pictureUrl} = req.body;
        const {id} = req.params
        const updatedPerfume = await updatePerfume(name, stockQuantity, price, gender, sizeMl, pictureUrl, id)
        res.status(201).json(updatedPerfume)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

router.delete("/:id",verifyToken, isAdmin, async(req, res)=>{
    try{

        const {id} = req.params
        const deletedPerfume = await deletePerfume(id)
        res.status(201).json(deletedPerfume)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = router;
