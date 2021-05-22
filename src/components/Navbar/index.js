import React, { useState } from "react"
import { Container, Flex, Heading, HStack, Icon } from "@chakra-ui/react"
import Link from "@/components/Link"
import NavbarLinks from "./NavbarLinks"
import ToggleButton from "./ToggleButton"
import { FiShoppingCart } from "react-icons/fi"
import { useShoppingCart } from "use-shopping-cart"

const linkStyles = {
  _hover: {
    bg: "white",
    color: "black",
  },
}

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const { cartCount } = useShoppingCart()
  return (
    <Flex>
      <Container
        bg="black"
        zIndex={11}
        position="fixed"
        flex={1}
        maxW="container.xl"
        left="50%"
        transform="translateX(-50%)"
      >
        <Flex direction={{ base: "column", md: "row" }} justify="space-between">
          <Flex justify="space-between" align="center">
            <Link to="/">
              <Heading fontWeight={600} p="0.5rem" {...linkStyles}>
                WYA?
              </Heading>
            </Link>
            <Flex display={{ base: "flex", md: "none" }} align="center">
              <Link to="/checkout">
                <HStack
                  p="0.25rem"
                  mr="0.75rem"
                  spacing={2}
                  _hover={{ bg: "white", color: "black" }}
                >
                  <Icon as={FiShoppingCart} />
                  <Flex>({cartCount})</Flex>
                </HStack>
              </Link>
              <ToggleButton
                isOpen={isOpen}
                clickHandler={() => setOpen(!isOpen)}
              />
            </Flex>
          </Flex>
          <NavbarLinks isOpen={isOpen} />
        </Flex>
      </Container>
    </Flex>
  )
}

export default Navbar
