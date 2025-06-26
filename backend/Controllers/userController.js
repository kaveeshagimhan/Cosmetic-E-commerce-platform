import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function createUser(req, res) {
    if (req.body.role == "admin") {
        if (req.user != null) {
            if (req.user.role != "admin") {
                res.staus(403).json({
                    message: "You are not authorized to create an admin account"
                })
                return;
            }
        } else {
            res.status(403).json({
                message: "You are not authorized to create an admin account, please login first"
            })
            return;
        }
    }

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

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(
        (user) => {
            if (!user) {
                res.status(404).json({
                    message: "User not found"
                })
            } else {
                const isPasswordCorect = bcrypt.compareSync(password, user.password);
                if (isPasswordCorect) {
                    const token = jwt.sign({
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            img: user.img
                        },
                        "gg-got-gg"
                    )
                    res.json({
                        message: "Login successful",
                        token: token
                    })
                } else {
                    res.status(401).json({
                        message: "Invalid Password"
                    })
                }
            }
        })
}

export function isAdmin(req) {
    if (req.user == null) {
        return false;
    }
    if (req.user.role !== "admin") {
        return false;
    } else {
        return true;
    }
}