import shippingRates from "@/lib/shippingRates"

const shipping = (isoCode, cartCount) => {
  /**
   * 1) ingest isoCode from shipping details, get line_items from cartDetails
   * 2) for first item in cart, apply first_product price
   * 3) for every concurrent item, apply the additional_product price
   * 4) return a total for shipping and add it to the cart to adjust totalPrice
   */
  if (cartCount === 1) {
    return shippingRates[isoCode].first_product
  } else if (cartCount > 1) {
    const initItem = shippingRates[isoCode].first_product
    const additionalItems =
      (cartCount - 1) * shippingRates[isoCode].additional_product

    return initItem + additionalItems
  } else {
    return 0
  }
}

export default shipping
