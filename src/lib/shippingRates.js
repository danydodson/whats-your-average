const shippingRates = {
  US: {
    region: "USA",
    isoCode: "US",
    first_product: 530,
    additional_product: 165,
  },
  EU: {
    region: "EUROPE",
    isoCode: "EU",
    first_product: 580,
    additional_product: 145,
  },
  CA: {
    region: "CANADA",
    isoCode: "CA",
    first_product: 795,
    additional_product: 165,
  },
  AU: {
    region: "AUSTRALIA / NZ",
    isoCode: "AU",
    first_product: 925,
    additional_product: 165,
  },
  JP: {
    region: "JAPAN",
    isoCode: "JP",
    first_product: 580,
    additional_product: 145,
  },
  WW: {
    region: "WORLDWIDE",
    isoCode: "",
    first_product: 795,
    additional_product: 165,
  },
}

export default shippingRates
