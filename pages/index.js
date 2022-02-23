import Head from "next/head";
import {
  Box,
  VStack,
  Image,
  HStack,
  Text,
  Heading,
  Button,
  Input,
  Link,
} from "@chakra-ui/react";
import MedicationIcon from "@mui/icons-material/Medication";
import UploadIcon from "@mui/icons-material/Upload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import React from "react";

export default function Home() {
  const inputRef = React.createRef();
  const [file, setFile] = React.useState(null);
  const handleClick = () => {};
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop={50}
      flexDir="column"
    >
      <MedicationIcon sx={{ fontSize: 150, color: "#013B92" }} />
      <Heading
        color="#013B92"
        marginTop={15}
        fontFamily="Montserrat"
        fontSize={50}
      >
        Smart Med
      </Heading>
      <Text fontFamily="Montserrat Alternates" marginBottom={10}>
        AI Powered Cancer Diagnosis
      </Text>
      <Input
        type="file"
        display="none"
        ref={inputRef}
        onChange={(e) => {
          setFile(e.target.files[0]);
          console.log(file);
        }}
      />
      {file ? (
        <>
          <Box
            w={[220, 250, 300, 350, 400]}
            h={[90, 110, 130, 150]}
            borderRadius={15}
            bg="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 50, color: "green", fontWeight: "bold" }}
            />
            <Text
              fontFamily="Montserrat"
              color="green.500"
              fontSize={[12, 15, 18]}
              marginLeft={5}
            >
              Upload Successfully!
            </Text>
          </Box>
          <Link href="/result">
            <Button
              fontFamily="Montserrat Alternates"
              marginTop={7}
              bg="#000"
              color="#fff"
              _hover={{ bg: "gray" }}
              onClick={handleClick}
            >
              Start with AI
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Button
            width={[220, 250, 300, 350, 400]}
            height={[90, 110, 130, 150]}
            borderRadius={15}
            onClick={() => {
              const input = inputRef.current;
              input.click();
            }}
          >
            <UploadIcon sx={{ fontSize: 100 }} />
          </Button>
          <Text fontFamily="Montserrat Alternates" marginTop={5}>
            Upload Image(png, svg, jpeg)
          </Text>
        </>
      )}
    </Box>
  );
}
