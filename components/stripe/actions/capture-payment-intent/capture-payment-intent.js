const pick = require("lodash.pick");
const stripe = require("../../stripe.app.js");

module.exports = {
  key: "stripe-capture-payment-intent",
  name: "Capture a Payment Intent",
  type: "action",
  version: "0.0.1",
  description: "Capture the funds of an existing uncaptured payment intent.",
  props: {
    stripe,
    id: {
      propDefinition: [
        stripe,
        "payment_intent",
      ],
      optional: false,
    },
    amount_to_capture: {
      propDefinition: [
        stripe,
        "amount",
      ],
      description: "The amount to capture, which must be less than or equal to the original " +
        "amount. Any additional amount will be automatically refunded. Defaults to the full " +
        "`amount_capturable` if not provided.",
    },
    advanced: {
      propDefinition: [
        stripe,
        "advanced",
      ],
      description: "Specify less-common options that you require. See [Capture a PaymentIntent]" +
        "(https://stripe.com/docs/api/payment_intents/capture) for a list of supported options.",
    },
  },
  async run() {
    const params = pick(this, [
      "amount_to_capture",
    ]);
    return await this.stripe.sdk().paymentIntents.capture(this.id, {
      ...params,
      ...this.advanced,
    });
  },
};
