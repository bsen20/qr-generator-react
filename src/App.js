import "./App.css";
// import { Box } from "@chakra-ui/react";
import { Container, Box, Text, useToast, VStack } from "@chakra-ui/react";
import CreatorForm from "./components/creatorForm";
import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
function App() {
  const toast = useToast();

  const [qrText, setQrText] = useState();
  const [qrSize, setQrSize] = useState();
  const [generatedUrl, setGeneratedUrl] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading === false)
      setInterval(() => {
        setLoading(!loading);
      }, 3000);
  }, [generatedUrl, loading]);

  const download = async () => {
    const originalImage = generatedUrl;
    const image = await fetch(originalImage);

    //Split image name
    const nameSplit = originalImage.split("/");
    const duplicateName = nameSplit.pop();

    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "" + duplicateName + "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = () => {
    setLoading(false);
    if (!qrText || !qrSize) {
      toast({
        title: "Fill all the fields",
        //   description: "We've created your account for you.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (qrSize < 10 || qrSize > 1000) {
      toast({
        title: "Invalid Size",
        description: "Size should be in range of[10 , 1000]",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const url = ` https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrText}`;
      setGeneratedUrl(url);

      toast({
        title: "Click on QR to download",
        status: "success",
        duration: 3000,
        // colorScheme: "blue",
        isClosable: true,
      });
    }
    setLoading(true);
  };
  return (
    <Container maxW="100%" maxH="100vh">
      <Box bg="tomato" w="100%" p={4} color="white">
        <Text textAlign={"center"} fontSize={22} fontWeight={500}>
          Qr-Generator-And-Scanner
        </Text>
      </Box>
      <CreatorForm
        qrSize={qrSize}
        qrText={qrText}
        setQrSize={setQrSize}
        setQrText={setQrText}
        handleSubmit={handleSubmit}
      />

      {generatedUrl && (
        <VStack m="20px auto">
          <Box boxSize="sm" alignItems={"center"} justifyContent="center">
            <Image
              src={generatedUrl}
              alt="image"
              maxW={300}
              maxH={300}
              onClick={download}
              border="3px solid #111"
              p={4}
            />
          </Box>
        </VStack>
      )}
    </Container>
  );
}

export default App;
