import Icon from "@chakra-ui/icon"
import { Box } from "@chakra-ui/layout"
import * as React from "react"
import { FiMenu } from "react-icons/fi"
import { IoClose } from "react-icons/io5"

const ToggleButton = ({ isOpen, clickHandler }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={clickHandler}>
      <Icon as={isOpen ? IoClose : FiMenu} color="white" />
    </Box>
  )
}

export default ToggleButton
