import * as React from "react"
import { CardElement } from "@stripe/react-stripe-js"
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react"

const formLabelStyles = {
  flex: 1,
  minw: "10ch",
  marginBottom: 0,
}

const inputStyles = {
  variant: "flushed",
  p: "0.5rem",
}

const CheckoutForm = ({
  country,
  countries,
  state,
  states,
  countryHandler,
  stateHandler,
  countryInfo,
  totalPrice,
  addedShipping,
  cartDetails,
  register,
  submitHandler,
  errors,
  loading,
  stripe,
  ...rest
}) => {
  const countryOptions = Object.values(countries)
  return (
    <VStack
      as="form"
      align="stretch"
      spacing={8}
      {...rest}
      onSubmit={submitHandler}
    >
      <FormControl isInvalid={errors.name}>
        <FormLabel {...formLabelStyles}>Name</FormLabel>
        <Input
          name="name"
          {...inputStyles}
          {...register("name", { required: true })}
        />
        <FormErrorMessage>
          {errors.name && "This field is required."}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.email}>
        <FormLabel {...formLabelStyles}>Email</FormLabel>
        <Input
          type="email"
          name="email"
          {...inputStyles}
          {...register("email", { required: true })}
        />
        <FormErrorMessage>
          {errors.email && "This field is required."}
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel {...formLabelStyles}>Phone</FormLabel>
        <Input name="phone" {...inputStyles} {...register("phone")} />
      </FormControl>
      <Heading size="md">Address:</Heading>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 8, md: 4 }}
      >
        <FormControl isInvalid={errors.country}>
          <FormLabel {...formLabelStyles}>Country</FormLabel>
          <Select
            variant="flushed"
            name="country"
            value={country}
            {...register("country", { required: true })}
            onChange={countryHandler}
          >
            {countryOptions.map((country, i) => {
              const { name, isoCode } = country
              return (
                <Box key={i} as="option" value={isoCode} color="black">
                  {name}
                </Box>
              )
            })}
          </Select>
          <FormErrorMessage>
            {errors.country && "This field is required."}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.state}>
          <FormLabel {...formLabelStyles}>State/Province Code</FormLabel>
          <Select
            name="state"
            value={state}
            variant="flushed"
            {...register("state", { required: true })}
            onChange={stateHandler}
          >
            {states[country].map((state, i) => {
              const { name, isoCode } = state
              return (
                <Box key={i} as="option" value={isoCode} color="black">
                  {name}
                </Box>
              )
            })}
          </Select>
          <FormErrorMessage>
            {errors.state && "This field is required."}
          </FormErrorMessage>
        </FormControl>
      </Stack>
      <FormControl isInvalid={errors.address}>
        <FormLabel {...formLabelStyles}>Line 1</FormLabel>
        <Input
          name="address"
          {...inputStyles}
          {...register("address", { required: true })}
        />
        <FormErrorMessage>
          {errors.address && "This field is required."}
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel {...formLabelStyles}>Line 2</FormLabel>
        <Input name="address_2" {...inputStyles} {...register("address_2")} />
      </FormControl>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 8, md: 4 }}
      >
        <FormControl isInvalid={errors.city}>
          <FormLabel {...formLabelStyles}>City</FormLabel>
          <Input
            name="city"
            {...inputStyles}
            {...register("city", { required: true })}
          />
          <FormErrorMessage>
            {errors.city && "This field is required."}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.postal_code}>
          <FormLabel {...formLabelStyles}>Postal Code</FormLabel>
          <Input
            name="postal_code"
            {...inputStyles}
            {...register("postal_code", { required: true })}
          />
          <FormErrorMessage>
            {errors.postal_code && "This field is required."}
          </FormErrorMessage>
        </FormControl>
      </Stack>
      <FormControl>
        <FormLabel {...formLabelStyles}>Card Details</FormLabel>
        <Box
          flex={1}
          minW="calc(100% - 6ch)"
          pb="0.5rem"
          borderBottom="1px solid white"
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "white",
                  iconColor: "white",
                  "::placeholder": {
                    color: "white",
                  },
                },
              },
            }}
          />
        </Box>
      </FormControl>
      <FormControl>
        <Button
          type="submit"
          disabled={!stripe}
          variant="outline"
          isLoading={loading}
        >
          Place Order
        </Button>
      </FormControl>
    </VStack>
  )
}

export default CheckoutForm
