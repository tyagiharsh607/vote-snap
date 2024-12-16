import { registerSchema, loginSchema, forgetPasswordSchema, resetPasswordSchema, } from "../validation/authValidation.js";
import { ZodError } from "zod";
import { checkDateHourDifference, formatError, renderEmailEjs, } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        const { email, name, password, confirm_password } = payload;
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) {
            res.status(422).json({ errors: { email: "Email already taken" } });
            return;
        }
        // Encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        const token = await bcrypt.hash(uuid4(), salt);
        const url = `${process.env.APP_URL}/verify/email?email=${email}&token=${token}`;
        const emailBody = await renderEmailEjs("email-verify", {
            name,
            url,
        });
        // send email
        await emailQueue.add(emailQueueName, {
            to: email,
            subject: "Vote Snap Email Verification",
            body: emailBody,
        });
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashed_password,
                email_verify_token: token,
            },
        });
        res.json({
            message: "Please check your email, we have sent a verification code",
        });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
            return;
        }
        console.log(error);
        res
            .status(500)
            .json({ message: "something went wrong, please try again!!" });
        return;
    }
};
const loginUser = async (req, res) => {
    // console.log(process.env.JWT_SECRET);
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        // * Check if user exist
        let user = await prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (!user) {
            res.status(404).json({ message: "No user found with this email." });
            return;
        }
        // * Check email verified or not
        if (user.email_verified_at === null) {
            res.status(422).json({
                errors: {
                    email: "Email is not verified yet.please check your email and verify your email.",
                },
            });
            return;
        }
        // Check password
        const compare = await bcrypt.compare(payload.password, user.password);
        if (!compare) {
            res.status(422).json({
                errors: {
                    password: "Incorrect Password.",
                },
            });
            return;
        }
        const JWTPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
            expiresIn: "365d",
        });
        const resPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            token: `Bearer ${token}`,
        };
        res.json({
            message: "Logged in successfully!",
            data: resPayload,
        });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
            return;
        }
        console.log(error);
        res
            .status(500)
            .json({ message: "something went wrong, please try again!!" });
        return;
    }
};
const getUser = async (req, res) => {
    try {
        const user = req.user; // This should be set by authMiddleware
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Respond with user data
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const checkLogin = async (req, res) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        // * Check if user exist
        let user = await prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (!user) {
            res.status(422).json({
                errors: {
                    email: "No user found with this email.",
                },
            });
            return;
        }
        // * Check email verified or not
        if (user.email_verified_at === null) {
            res.status(422).json({
                errors: {
                    email: "Email is not verified yet.please check your email and verify your email.",
                },
            });
            return;
        }
        // Check password
        if (!bcrypt.compareSync(payload.password, user.password)) {
            res.status(422).json({
                errors: {
                    password: "Incorrect Password.",
                },
            });
            return;
        }
        res.json({
            message: "Logged in successfully!",
            data: null,
        });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid login data", errors });
        }
        else {
            // logger.error({ type: "Auth Error", body: error });
            res.status(500).json({
                error: "Something went wrong.please try again!",
                data: error,
            });
        }
    }
};
const forgetPassword = async (req, res) => {
    try {
        const body = req.body;
        const { email } = forgetPasswordSchema.parse(body);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(422).json({ message: "User doesn't exist" });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const token = await bcrypt.hash(uuid4(), salt);
        await prisma.user.update({
            data: {
                password_reset_token: token,
                token_sent_at: new Date().toISOString(),
            },
            where: { email },
        });
        const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${email}&token=${token}`;
        const html = await renderEmailEjs("forget-password", {
            name: user.name,
            url: url,
        });
        await emailQueue.add(emailQueueName, {
            to: email,
            subject: "Reset your Password",
            body: html,
        });
        res.json({
            message: "Email sent successfully!! please check your email.",
        });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid login data", errors });
        }
        else {
            // logger.error({ type: "Auth Error", body: error });
            res.status(500).json({
                error: "Something went wrong.please try again!",
                data: error,
            });
        }
    }
};
const resetPassword = async (req, res) => {
    try {
        const body = req.body;
        const payload = resetPasswordSchema.parse(body);
        const user = await prisma.user.findUnique({
            select: {
                email: true,
                password_reset_token: true,
                token_sent_at: true,
            },
            where: { email: payload.email },
        });
        if (!user) {
            res.status(422).json({
                errors: {
                    email: "No Account found with this email.",
                },
            });
            return;
        }
        // * Check token
        if (payload.token !== user.password_reset_token) {
            res.status(422).json({
                errors: {
                    email: "Please make sure you are using correct url.",
                },
            });
            return;
        }
        const hoursDiff = checkDateHourDifference(user.token_sent_at);
        if (hoursDiff > 2) {
            res.status(422).json({
                errors: {
                    email: "Password Reset token got expire.please send new token to reset password.",
                },
            });
            return;
        }
        // * Update the password
        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(payload.password, salt);
        await prisma.user.update({
            data: {
                password: newPass,
                password_reset_token: null,
                token_sent_at: null,
            },
            where: { email: payload.email },
        });
        res.json({
            message: "Password reset successfully! please try to login now.",
        });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
            return;
        }
        else {
            res.status(500).json({
                error: "Something went wrong.please try again!",
                data: error,
            });
            return;
        }
    }
};
export { registerUser, loginUser, getUser, checkLogin, forgetPassword, resetPassword, };
