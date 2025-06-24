import Product from "../Models/product.js";

export function getProduct(res, req) {
    Product.find().then(
        (data) => {
            res.json(data)
        }
    )
}

export function saveProduct(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "Unauthorized"
        })
        return;
    }
    if (req.user.role !== "admin") {
        res.status(403).json({
            message: "Only admin can add products"
        });
        return;
    }
    console.log(req.body);

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });

    product
        .save()
        .then(() => {
            res.json({
                message: "Product added successfully"
            });
        })
        .catch(() => {
            res.json({
                message: "Faile to add product"
            });
        });
}