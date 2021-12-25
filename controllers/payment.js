const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "useYourMerchantId",
    publicKey: "useYourPublicKey",
    privateKey: "useYourPrivateKey"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}).then((err, response) => {
        if(err) {
            res.status(500).json(err)
        }
        res.send(response);
    });
}

exports.processPayment = (req, res) => {
    const {amount, paymentMethodNonce} = req.body;
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: paymentMethodNonce,
        options: {
            submitForSettlement: true
        }
    }).then((err, result) => {
        if(err) {
            res.status(500).json(err)
        }
        res.send(result);
    });
}