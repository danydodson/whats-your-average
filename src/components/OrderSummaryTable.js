import {
  Button,
  Heading,
  HStack,
  StackDivider,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react"
import * as React from "react"

const OrderSummaryTable = ({
  details,
  addedShipping,
  cartCount,
  totalPrice,
  removeItem,
  ...rest
}) => {
  return (
    <>
      <Table display={{ base: "none", md: "table" }} size="md" {...rest}>
        <Thead w="inherit" textTransform="uppercase">
          <Tr>
            <Th color="white">Product</Th>
            <Th color="white">Description</Th>
            <Th color="white">Quantity</Th>
            <Th color="white">Price</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody w="inherit">
          {details.map(item => {
            const { name, description, quantity, formattedValue, id } = item

            return (
              <Tr key={id}>
                <Td>{name}</Td>
                <Td>{description}</Td>
                <Td>{quantity}</Td>
                <Td>{formattedValue}</Td>
                <Td>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(id)}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
            )
          })}
          <Tr>
            <Td />
            <Td />
            <Td>Shipping:</Td>
            <Td>${(addedShipping / 100).toFixed(2)}</Td>
            <Td />
          </Tr>
          <Tr>
            <Td />
            <Td />
            <Td>Total:</Td>
            <Td>${((totalPrice + addedShipping) / 100).toFixed(2)}</Td>
            <Td />
          </Tr>
        </Tbody>
      </Table>
      <VStack
        align="flex-start"
        spacing={8}
        display={{ base: "flex", md: "none" }}
        divider={<StackDivider color="white" />}
      >
        {details.map(item => {
          const { name, description, quantity, formattedValue, id } = item
          return (
            <VStack align="flex-start" key={id} spacing={2}>
              <Heading size="md">{name}</Heading>
              <Text>{description}</Text>
              <Text>Quantity: {quantity}</Text>
              <Text>Price: {formattedValue}</Text>
              <Button
                flex={1}
                maxW="max-content"
                variant="outline"
                size="sm"
                onClick={() => removeItem(id)}
              >
                Remove
              </Button>
            </VStack>
          )
        })}
        <HStack align="flex-start" spacing={4}>
          <Heading size="md">Shipping</Heading>
          <Text>${(addedShipping / 100).toFixed(2)}</Text>
        </HStack>
        <HStack align="flex-start" spacing={4}>
          <Heading size="md">Total</Heading>
          <Text>${((totalPrice + addedShipping) / 100).toFixed(2)}</Text>
        </HStack>
      </VStack>
    </>
  )
}

export default OrderSummaryTable
