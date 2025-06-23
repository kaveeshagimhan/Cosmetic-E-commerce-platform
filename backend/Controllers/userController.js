import User from "../Models/user.js";
import bcrypt from "bcryptjs";

export function createUser(req, res) {

    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword,
        role: req.body.role,
        isBlocked: req.body.isBlocked,
        img: req.body.img
    })
    user.save()
        .then(() => {
            res.json({
                message: "User created successfully",
            });
        })
        .catch(() => {
            res.json({
                massage: "Failed to create user",
            });
        });

}