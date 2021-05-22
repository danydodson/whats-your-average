import { FiShoppingCart } from "react-icons/fi"

const siteRoutes = [
  {
    title: "Home",
    slug: "/",
  },
  {
    title: "FAQ",
    slug: "/faq",
  },
  {
    title: "Checkout",
    slug: "/checkout",
    icon: FiShoppingCart,
    hasCount: true,
  },
]

export default siteRoutes
