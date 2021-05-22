import { extendTheme } from "@chakra-ui/react"
import breakpoints from "./breakpoints"
import fonts from "./fonts"
import styles from "./styles"
import components from "./components"

const theme = extendTheme({
  breakpoints,
  fonts,
  styles,
  components,
})

export default theme
