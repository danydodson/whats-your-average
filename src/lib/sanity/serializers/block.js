import * as React from "react"
import { Heading, Text } from "@chakra-ui/layout"

const block = props => {
  const { style = "normal" } = props.node
  if (/^h\d/.test(style)) {
    return (
      <Heading
        as={style}
        fontFamily="body"
        fontSize={style === "h1" ? "4xl" : style === "h2" ? "2xl" : "xl"}
        pb="0.5rem"
      >
        {props.children}
      </Heading>
    )
  }

  if (style === "blockquote") {
    return (
      <Text
        as="blockquote"
        p="0.5rem 1rem"
        mb="1.25rem"
        bg="gray.50"
        borderLeft="4px solid blue.200"
      >
        {props.children}
      </Text>
    )
  }

  return <Text pb="1rem">{props.children}</Text>
}

export default block
