const mercadopago = require('mercadopago');
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;


mercadopago.configure({
    access_token: ACCESS_TOKEN,
});


const createOrder = (req, res) => {
    const { id, title, description, image, price } = req.body;

    const items = [
        {
            id,
            title,
            quantity: 1,
            unit_price: price,
            currency_id: "ARS",
            picture_url: image,
            description,
        }

    ];


    const preference = {
        items,
        back_urls: {
            success: "http://localhost:3001/payment/success",
            failure: "http://localhost:3001/payment/failure",
            pending: "http://localhost:3001/payment/pending",
        }
    };
    mercadopago.preferences.create(preference)
        .then((response) => {
            console.log("Respuesta de createOrder:", response);

            res.json(response);
        })
        .catch((error) => res.status(500).json({ error: error.message }));
};

const handleSuccess = (req, res) => {
    console.log(req.query);
    res.redirect("http://localhost:5173/1");
};

module.exports = {
    createOrder,
    handleSuccess,
};
