import express, { response } from "express";
import {users} from "../models/userSchema.model.js"; // Ensure correct import

const router = express.Router();

//register user
router.post("/register", async (req, res) => {
    try {
        const { name, email, age, mobile, work, address, description } = req.body;

        // Validate required fields
        if (!name || !email || !age || !mobile || !work || !address || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const preuser = await users.findOne({ email });
        if (preuser) {
            return res.status(400).json({ message: "This user already exists" });
        }

        // Create and save new user
        const adduser = new users({ name, email, age, mobile, work, address, description });
        await adduser.save();

        return res.status(201).json({ message: "User registered successfully", user: adduser });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "User registration failed", error: error.message });
    }
});


// Get user data
router.get("/getdata", async (req, res) => {
    try {
        const userdata = await users.find();
        res.status(200).json(userdata); // Changed status to 200 for success
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Failed to fetch user data" });
    }
});


// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

export default router;
