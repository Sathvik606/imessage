import { getAuth } from "@clerk/express";
import User from "../models/user.model.js";

export async function protectRoute(req, res, next) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            console.log("No Clerk user found")
            return res.status(401).json({ message: "Unauthorized" });
        }

        console.log("Clerk ID:", userId);
        const user = await User.findOne({ clerkId: userId });
        console.log("Found User:", user);

        if (!user) {
            console.log("User not synced")
            return res.status(404).json({ message: "User profile is not synced yet" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}