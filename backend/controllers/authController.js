const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    console.log("MASUK LOGIN CONTROLLER");
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    if (!username || !password) {
        return res.status(400).json({ 
            success: false, 
            message: "Username and password are required" 
        });
    }

    try {
        const user = await authModel.getUserByUsername(username);
        console.log("STEP 1 - User:");
        console.log(user);
        const invalidLoginResponse = () =>
            res.status(401).json({ 
                success: false, 
                message: "Invalid username or password" 
            }); 


        if (!user) {
            return invalidLoginResponse();
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("STEP 2 - Password Validity:");
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return invalidLoginResponse();
        }

        console.log("STEP 3 - Token Payload:");
        console.log(process.env.JWT_SECRET);

        const token = jwt.sign(
            
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log("STEP 4 - Token Berhasil Dibuat:");
        console.log(token);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                fullname: user.fullname,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = {
    login
};