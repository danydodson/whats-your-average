require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const stripe = require("stripe")(process.env.GATSBY_STRIPE_SECRET_KEY)

exports.handler = async ({ body }) => {
  const { subtotal, shipping, total, values, cartDetails } = JSON.parse(body)

  const cartArray = Object.values(cartDetails)

  const line_items = JSON.stringify(
    cartArray.map(item => {
      const { name, price, description, product_data, quantity } = item
      return {
        name: `${name} || ${description}`,
        quantity,
        variant_id: product_data.metadata.variant_id,
        files: [{ url: product_data.metadata.imageUrl }],
        retail_price: (price / 100).toFixed(2),
      }
    })
  )

  const retail_costs = JSON.stringify({
    subtotal,
    shipping,
    total,
  })

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "cad",
    payment_method_types: ["card"],
    receipt_email: values.email || null,
    shipping: {
      name: values.name || null,
      phone: values.phone || null,
      address: {
        city: values.city || null,
        country: values.country || null,
        line1: values.address || null,
        line2: values.address_2 || null,
        postal_code: values.postal_code || null,
        state: values.state || null,
      },
    },
    metadata: {
      line_items,
      retail_costs,
    },
  })

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify({
      clientSecret: paymentIntent.client_secret,
    }),
  }
}
