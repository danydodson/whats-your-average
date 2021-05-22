require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

const stripe = require("stripe")(process.env.GATSBY_STRIPE_SECRET_KEY)
const fetch = require("node-fetch")

exports.handler = async ({ body, headers }) => {
  try {
    // check the webhook to make sure it’s valid
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // only do stuff if this is a successful Stripe Checkout purchase
    if (stripeEvent.type === "charge.succeeded") {
      const auth = Buffer.from(process.env.PRINTFUL_API_KEY).toString("base64")
      const eventObject = stripeEvent.data.object
      const email = eventObject.receipt_email
      const items = JSON.parse(eventObject.metadata.line_items)
      const retail_costs = JSON.parse(eventObject.metadata.retail_costs)
      const shippingDetails = eventObject.shipping
      const { name, phone, address } = shippingDetails
      const { city, country, line1, line2, postal_code, state } = address

      // Create order on Printful
      await fetch("https://api.printful.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          recipient: {
            name,
            address1: line1,
            address2: line2,
            city,
            state_code: state,
            country_code: country,
            zip: postal_code,
            phone,
            email,
          },
          items,
          retail_costs,
          confirm: true,
        }),
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    }
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`)

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    }
  }
}
