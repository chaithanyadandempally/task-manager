const router = require("express").Router();
const User = require("../models/User");

// Signup (simple version)
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({
            name: name,
            email: email,
            password: password
        });

        await user.save();

        res.json("User Registered Successfully");
    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json("Error");
    }
});

// Login (simple version)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json("User not found");
        }

        if (user.password !== password) {
            return res.status(400).json("Wrong password");
        }

        res.json({ token: "dummy-token" });

    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json("Error");
    }
});
router.get("/create-test-user", async (req, res) => {
    try {
        const user = new User({
            name: "test",
            email: "test@gmail.com",
            password: "123456"
        });

        await user.save();

        res.send("Test user created");
    } catch (err) {
        res.send("Error creating user");
    }
});
module.exports = router;
