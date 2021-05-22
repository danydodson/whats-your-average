const React = require("react")
const { loadStripe } = require("@stripe/stripe-js")
const { CartProvider } = require("use-shopping-cart")
const { Elements } = require("@stripe/react-stripe-js")

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY)

exports.wrapRootElement = ({ element }) => {
  return (
    <CartProvider
      stripe={stripePromise}
      successUrl={
        process.env.GATSBY_STRIPE_SUCCESS_URL || "http://localhost:8000/success"
      }
      cancelUrl={
        process.env.GATSBY_STRIPE_CANCEL_URL || "http://localhost:8000"
      }
      currency="CAD"
      allowedCountries={["US", "CA"]}
    >
      <Elements stripe={stripePromise}>{element}</Elements>
    </CartProvider>
  )
}
