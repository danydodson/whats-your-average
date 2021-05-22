import * as React from "react"
import { Icon, Stack } from "@chakra-ui/react"
import { useShoppingCart } from "use-shopping-cart"
import Link from "@/components/Link"
import siteRoutes from "@/lib/siteRoutes"

const linkStyles = {
  _hover: {
    bg: "white",
    color: "black",
  },
}

const NavbarLinks = ({ isOpen }) => {
  const { cartCount } = useShoppingCart()
  return (
    <Stack
      spacing={0}
      display={{ base: isOpen ? "flex" : "none", md: "flex" }}
      direction={{ base: "column", md: "row" }}
      wrap="wrap"
    >
      {siteRoutes.map((link, i) => (
        <Link key={i} to={link.slug} p="1.25rem" {...linkStyles}>
          {link.title}
          {link.icon && <Icon mx={2} as={link.icon} />}
          {link.hasCount && "(" + cartCount + ")"}
        </Link>
      ))}
    </Stack>
  )
}

export default NavbarLinks
