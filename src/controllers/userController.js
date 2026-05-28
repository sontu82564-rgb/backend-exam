import userSchema from "../models/userSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv/config"








export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const existing = await userSchema.findOne({ email });
        if (existing) {
            return res.status(401).json({
                success: false,
                message: "User already Registered",
            });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await userSchema.create({
            userName,
            email,
            password: hashpassword,
        });

        const token = jwt.sign({ userId: user._id }, process.env.secretKey, {
            expiresIn: "30m",
        });
        // verifyMail(token, email);
        // user.token = token;
        // await user.save();
        // return res.status(201).json({
        //     success: true,
        //     message: "User Registered Successfully",
        //     data: user,
        // });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User not Registered",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access",
            });
        } else {
            const passwordCheck = await bcrypt.compare(password, user.password);
            if (!passwordCheck) {
                return res.status(401).json({
                    success: false,
                    message: "Credentials Mismatch",
                });
            } else if (passwordCheck && user.isVerified === true) {
                const accessToken = await jwt.sign(
                    { id: user._id },
                    process.env.secretKey,
                    {
                        expiresIn: "10d",
                    },
                );
                const refreshToken = await jwt.sign(
                    { id: user._id },
                    process.env.secretKey,
                    {
                        expiresIn: "30d",
                    },
                );

                user.isLoggedIn = true;
                await user.save();
                return res.status(200).json({
                    success: true,
                    message: "Logged In Succesfully",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    data: user
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Please Verify first then login",
                });
            }
        }
    } catch (error) {
        return res.send(500).json({
            success: false,
            message: error.message,
        });
    }
};
