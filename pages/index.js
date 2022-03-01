import { Box, Text, Heading, Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import MedicationIcon from "@mui/icons-material/Medication";
import UploadIcon from "@mui/icons-material/Upload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import React from "react";
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Home() {
  const inputRef = React.createRef();
  const router = useRouter();
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    const storageRef = ref(storage, `images/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
          setUploadSuccess(true);
        });
      }
    );
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:5000/api/images", {
        name: "another pic",
        url: "anotherpic.url",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    router.push("/result");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop={50}
      flexDir="column"
    >
      <MedicationIcon sx={{ fontSize: 150, color: "#013B92", marginTop: 15 }} />
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
        onChange={handleChange}
      />
      {uploadSuccess ? (
        <>
          <Box
            w={[220, 250, 300, 350, 400]}
            h={[90, 110, 130, 150]}
            borderRadius={15}
            marginTop={40}
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
        </>
      ) : (
        <>
          <Button
            width={[220, 250, 300, 350, 400]}
            height={[90, 110, 130, 150]}
            borderRadius={15}
            marginTop={40}
            onClick={() => {
              const input = inputRef.current;
              input.click();
            }}
          >
            <UploadIcon sx={{ fontSize: 100 }} />
          </Button>
          <Text fontFamily="Montserrat Alternates" marginTop={5} color="#fff">
            Upload Image(png, svg, jpeg)
          </Text>
        </>
      )}
    </Box>
  );
}
