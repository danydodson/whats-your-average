export const tickerStyles = ticker => {
  switch (ticker.length) {
    case 4:
      return {
        fontSize: { base: "28px", md: "48px" },
        y: 18,
      }
    case 3:
      return {
        fontSize: { base: "38px", md: "56px" },
        y: 24,
      }
    case 2:
      return {
        fontSize: { base: "52px", md: "64px" },
        y: 26,
      }
    default:
      return {
        fontSize: { base: "68px", md: "72px" },
        y: 32,
      }
  }
}

export const averageStyles = average => {
  switch (average.length) {
    case 7:
      return {
        fontSize: { base: "20px", md: "30px" },
      }
    case 6:
      return {
        fontSize: { base: "22px", md: "32px" },
        y: 34,
      }
    case 5:
      return {
        fontSize: { base: "24px", md: "34px" },
        y: 36,
      }
    default:
      return {
        fontSize: { base: "20px", md: "38px" },
        y: 26,
      }
  }
}

export const inputStyles = {
  variant: "flushed",
  _placeholder: {
    color: "gray.300",
  },
  maxW: "12ch",
}

export const inputFieldStyles = {
  align: "center",
  justify: "center",
}

export const headingStyles = {
  fontSize: "xl",
  fontWeight: 600,
  pr: "0.5rem",
}
