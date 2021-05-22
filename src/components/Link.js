import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Link as ChakraLink } from "@chakra-ui/react"

const Link = props => (
  <ChakraLink as={GatsbyLink} to={props.to} {...props}>
    {props.children}
  </ChakraLink>
)

export default Link
