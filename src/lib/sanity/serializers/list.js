import { List } from "@chakra-ui/layout"
import * as React from "react"

const list = ({ children, type }) => {
  return (
    <List pb="1rem" styleType={type} stylePosition="inside">
      {children}
    </List>
  )
}

export default list
