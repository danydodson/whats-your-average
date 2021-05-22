import * as React from "react"
import Layout from "@/components/Layout"
import { Heading, Container } from "@chakra-ui/react"
import { useShoppingCart } from "use-shopping-cart"
import fbTrack from "@/util/fbTrack"

const Success = () => {
  const { formattedTotalPrice } = useShoppingCart()
  fbTrack("track", "PageView")
  fbTrack("track", "Purchase", {
    currency: "CAD",
    value: formattedTotalPrice,
  })

  return (
    <Layout>
      <Container maxW="container.md">
        <Heading>HEY, YOU DID IT. THANKS FOR THE MONEY!</Heading>
      </Container>
    </Layout>
  )
}

export default Success
