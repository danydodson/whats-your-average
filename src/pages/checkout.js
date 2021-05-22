import React, { useState } from "react"
import { navigate } from "gatsby"
import { useShoppingCart } from "use-shopping-cart"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { Box, Container, Heading, VStack, useToast } from "@chakra-ui/react"
import Layout from "@/components/Layout"
import CheckoutForm from "@/components/CheckoutForm"
import OrderSummaryTable from "@/components/OrderSummaryTable"
import Seo from "@/components/Seo"
import Link from "@/components/Link"
import { useForm } from "react-hook-form"
import shipping from "@/util/shipping"
import fbTrack from "@/util/fbTrack"
import countries from "@/lib/countries.json"
import states from "@/lib/states.json"

const Checkout = () => {
  const [country, setCountry] = useState("CA")
  const [state, setState] = useState("")
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const toast = useToast()
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const countryInfo = countries[country]
  console.log({ countries })

  fbTrack("track", "PageView")

  const countryHandler = e => {
    const stateVal = states[e.target.value][0].isoCode
    setValue("country", e.target.value)
    setCountry(e.target.value)
    setValue("state", stateVal)
    setState(stateVal)
  }
  const stateHandler = e => {
    setValue("state", e.target.value)
    setState(e.target.value)
  }

  const onSubmit = async values => {
    try {
      const subtotal = (totalPrice / 100).toFixed(2)
      const shipping = (addedShipping / 100).toFixed(2)
      const total = totalPrice + addedShipping
      const cardElement = elements.getElement(CardElement)
      setLoading(true)

      await fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subtotal,
          shipping,
          total,
          values,
          cartDetails,
        }),
      })
        .then(res => res.json())
        .then(data => {
          stripe
            .confirmCardPayment(data.clientSecret, {
              payment_method: {
                card: cardElement,
              },
            })
            .then(result => {
              if (result.error) {
                setLoading(false)
                return toast({
                  title: "UH OH, SOMETHING WENT WRONG.",
                  description: result.error.message,
                  status: "error",
                  duration: 10000,
                  isClosable: true,
                })
              } else {
                setLoading(false)
                navigate("/success")
              }
            })
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
          return toast({
            title: "UH OH, SOMETHING WENT WRONG.",
            description: err.message,
            status: "error",
            duration: 10000,
            isClosable: true,
          })
        })
    } catch (error) {
      return toast({
        title: "UH OH, SOMETHING WENT WRONG.",
        description: error.message,
        status: "error",
        duration: 10000,
        isClosable: true,
      })
    }
  }

  const submitHandler = handleSubmit(onSubmit)

  const { cartDetails, cartCount, totalPrice, removeItem } = useShoppingCart()
  const tableDetails = Object.values(cartDetails)
  const addedShipping = shipping(country, cartCount)

  return (
    <Layout>
      <Seo title="Checkout" />
      <Container maxW="container.md" m="0 auto">
        <VStack alignItems="stretch" justifyContent="stretch" spacing={12}>
          <Box>
            <Heading size="xl" pb="1rem" textTransform="uppercase">
              Order Summary:
            </Heading>
            <OrderSummaryTable
              details={tableDetails}
              addedShipping={addedShipping}
              cartCount={cartCount}
              totalPrice={totalPrice}
              removeItem={removeItem}
            />
          </Box>
          <Box border="1px solid white" p="1.25rem">
            <Heading size="md" pb="1rem" textTransform="uppercase">
              Checkout:
            </Heading>
            {cartCount > 0 ? (
              <CheckoutForm
                country={country}
                countries={countries}
                state={state}
                states={states}
                countryHandler={countryHandler}
                stateHandler={stateHandler}
                countryInfo={countryInfo}
                totalPrice={totalPrice}
                addedShipping={addedShipping}
                cartDetails={cartDetails}
                register={register}
                submitHandler={submitHandler}
                errors={errors}
                loading={loading}
                stripe={stripe}
              />
            ) : (
              <Link to="/">
                <Heading
                  size="md"
                  textDecoration="underline"
                  textTransform="uppercase"
                >
                  Your cart can't be empty
                </Heading>
              </Link>
            )}
          </Box>
        </VStack>
      </Container>
    </Layout>
  )
}

export default Checkout
