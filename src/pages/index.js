import React, { useReducer, useState } from "react"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useShoppingCart } from "use-shopping-cart"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import { StaticImage } from "gatsby-plugin-image"
import {
  variantIDs,
  quantities,
  variantsBySize,
  costBySize,
} from "@/lib/shirtDetails"
import { FiShoppingCart } from "react-icons/fi"
import {
  tickerStyles,
  averageStyles,
  inputStyles,
  inputFieldStyles,
  headingStyles,
} from "@/lib/indexStyles"
import fbTrack from "@/util/fbTrack"

const initState = {
  ticker: "WYA",
  average: "10.00",
  size: variantIDs[1].size,
  variant_id: variantIDs[1].variant_id,
  cost: variantIDs[1].cost,
  quantity: 1,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ticker":
      return { ...state, ticker: action.e.target.value.toUpperCase() }
    case "average":
      return { ...state, average: action.value }
    case "size":
      return {
        ...state,
        size: action.e.target.value,
        variant_id: variantsBySize[action.e.target.value],
        cost: costBySize[action.e.target.value],
      }
    case "quantity":
      return { ...state, quantity: action.e.target.value }
    default:
      throw new Error()
  }
}

const IndexPage = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  const { ticker, average, size, quantity, cost, variant_id } = state
  const [isLoading, setLoading] = useState(false)
  const { addItem } = useShoppingCart()

  fbTrack("track", "PageView")

  return (
    <Layout>
      <Seo title="Home" />
      <Container maxW="container.md">
        <Heading as="h1" size="2xl" textAlign="center" pb="1rem">
          WHAT'S YOUR AVERAGE?
        </Heading>
        <VStack align="center" spacing={{ base: 4, md: 24 }}>
          <VStack align="flex-start" spacing={1}>
            <Flex {...inputFieldStyles}>
              <Text {...headingStyles}>TICKER:</Text>
              <InputGroup>
                <InputLeftElement>$</InputLeftElement>
                <Input
                  maxLength={4}
                  textTransform="uppercase"
                  variant="flushed"
                  value={ticker}
                  {...inputStyles}
                  onChange={e => dispatch({ type: "ticker", e })}
                />
              </InputGroup>
            </Flex>
            <Flex {...inputFieldStyles}>
              <Text {...headingStyles}>AVERAGE COST:</Text>
              <NumberInput
                precision={2}
                variant="flushed"
                value={average}
                onChange={value => dispatch({ type: "average", value })}
              >
                <NumberInputField maxLength={7} {...inputStyles} />
                <InputRightElement>AVG</InputRightElement>
              </NumberInput>
            </Flex>
          </VStack>
          <Flex direction={{ base: "column", md: "row" }} align="center">
            <Box pos="relative" m={{ base: "1.25rem 0", md: 0 }} bg="white">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                w="50%"
                zIndex={10}
                pos="absolute"
                top="25%"
                left="50%"
                transform="translateX(-50%)"
              >
                <Box textAlign="center">
                  <Heading fontSize={tickerStyles(ticker).fontSize}>
                    ${ticker}
                  </Heading>
                  <Heading fontSize={averageStyles(average).fontSize}>
                    {average} AVG
                  </Heading>
                </Box>
              </Box>
              <Box maxW="100%" p="1.25rem">
                <StaticImage
                  src="../images/t-shirt.png"
                  alt={`Custom "What's Your Average" t-shirt.`}
                  layout="constrained"
                  placeholder="blurred"
                  width={400}
                />
              </Box>
            </Box>
            <VStack align="flex-start" spacing={2} pl={{ base: 0, md: "2rem" }}>
              <Flex align="center">
                <Text {...headingStyles}>SIZE:</Text>
                <Select
                  variant="flushed"
                  textTransform="uppercase"
                  defaultValue={size}
                  onChange={e => dispatch({ type: "size", e })}
                >
                  {variantIDs.map((variant, i) => {
                    return (
                      <Box
                        as="option"
                        color="black"
                        key={i}
                        value={variant.size}
                      >
                        {variant.size}
                      </Box>
                    )
                  })}
                </Select>
              </Flex>
              <Flex align="center">
                <Text {...headingStyles}>QUANTITY:</Text>
                <Select
                  variant="flushed"
                  textTransform="uppercase"
                  onChange={e => dispatch({ type: "quantity", e })}
                >
                  {quantities.map((quantity, i) => (
                    <Box as="option" color="black" key={i} value={quantity}>
                      {quantity}
                    </Box>
                  ))}
                </Select>
              </Flex>
              <Flex align="center" pb="2rem">
                <Text {...headingStyles}>
                  COST: ${(cost * quantity).toFixed(2)}
                </Text>
              </Flex>
              <VStack>
                <Button
                  isLoading={isLoading}
                  loadingText="Generating Design"
                  variant="outline"
                  fontSize="xl"
                  fontWeight={600}
                  _loading={{
                    bg: "white",
                    color: "black",
                  }}
                  _hover={{
                    bg: "white",
                    color: "black",
                  }}
                  _focus={{
                    bg: "white",
                    color: "black",
                  }}
                  _disabled={{
                    bg: "white",
                    color: "black",
                  }}
                  onClick={async () => {
                    try {
                      setLoading(true)
                      const image = await fetch(
                        "/.netlify/functions/make-a-da-image",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            ticker,
                            average,
                          }),
                        }
                      ).then(res => res.blob())
                      const url = new URL("https://api.imgbb.com/1/upload")
                      url.search = new URLSearchParams({
                        key: process.env.GATSBY_IMGBB_API_KEY,
                        expiration: 600,
                      })
                      const body = new FormData()

                      body.append("image", image)

                      const imageUrl = await fetch(url, {
                        method: "POST",
                        body,
                      })
                        .then(res => res.json())
                        .then(({ data }) => {
                          setLoading(false)
                          return data.url
                        })
                      addItem(
                        {
                          name: "Custom WYA T-shirt",
                          description: `Customized t-shirt. Reads: $${ticker} / ${average} AVG`,
                          id: "",
                          price: cost * 100,
                          currency: "CAD",
                          image: "",
                          sku:
                            variant_id + size + Math.floor(Math.random() * 99),
                          product_data: {
                            metadata: {
                              variant_id,
                              imageUrl,
                            },
                          },
                        },
                        parseInt(quantity)
                      )
                      fbTrack("track", "AddToCart", {
                        content_ids: [`${variant_id + size}WYA-SHIRT`],
                        content_name: `Customized t-shirt. Reads: $${ticker} / ${average} AVG`,
                        content_type: "product",
                        currency: "CAD",
                      })
                    } catch (err) {
                      console.log(err)
                    }
                  }}
                >
                  ADD TO CART
                  <Icon as={FiShoppingCart} ml="0.5rem" />
                </Button>
              </VStack>
            </VStack>
          </Flex>
        </VStack>
      </Container>
    </Layout>
  )
}

export default IndexPage
