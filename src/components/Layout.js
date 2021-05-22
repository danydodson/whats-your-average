import * as React from "react"
import PropTypes from "prop-types"
import Fonts from "@/fonts"
import { Box, Flex, Text } from "@chakra-ui/layout"
import Navbar from "@/components/Navbar"
import { HStack } from "@chakra-ui/layout"
import Icon from "@chakra-ui/icon"
import { FaTwitter } from "react-icons/fa"
import { FiInstagram } from "react-icons/fi"
import { Link } from "@chakra-ui/layout"

const Layout = ({ children }) => {
  return (
    <>
      <Fonts />
      <Flex direction="column" minW="100%" minH="100vh">
        <Navbar />
        <Box
          as="main"
          flex={1}
          p={{ base: "3rem 1.25rem", md: "9rem 3rem" }}
          mt="75px"
        >
          {children}
        </Box>
        <Flex direction="column" as="footer" align="center" justify="center">
          <HStack pb="1rem" spacing={0}>
            <Link
              href="https://www.instagram.com/whatsyouraverage/"
              isExternal
              _hover={{ bg: "white", color: "black" }}
              p="0.5rem"
            >
              <Icon as={FiInstagram} boxSize={10} />
            </Link>
            <Link
              href="https://twitter.com/wyaverage"
              isExternal
              _hover={{ bg: "white", color: "black" }}
              p="0.5rem"
            >
              <Icon as={FaTwitter} boxSize={10} />
            </Link>
          </HStack>
          <Text>© {new Date().getFullYear()} Really Awesome Doings</Text>
        </Flex>
      </Flex>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
