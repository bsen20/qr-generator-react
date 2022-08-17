import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Container,
  Input,
  VStack,
  useToast,
  Button,
  HStack,
} from "@chakra-ui/react";
const CreatorForm = ({
  qrSize,
  qrText,
  setQrSize,
  setQrText,
  handleSubmit,
}) => {
  const toast = useToast();

  return (
    <Container
      border="5px solid black"
      p={2}
      borderRadius="10px"
      marginTop={20}
    >
      <VStack p={4}>
        <FormControl>
          <FormLabel>Enter text</FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              setQrText(e.target.value);
              console.log(qrText);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Enter Size of QR</FormLabel>
          <Input
            type="number"
            onChange={(e) => {
              setQrSize(e.target.value);
              console.log(qrSize);
            }}
          />
        </FormControl>
        <HStack>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              window.location.reload(false);
            }}
          >
            Refresh
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default CreatorForm;
