import { Box, Text, Heading, Button, Input, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import MedicationIcon from "@mui/icons-material/Medication";
import UploadIcon from "@mui/icons-material/Upload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import React from "react";
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionIcon = motion(MedicationIcon);

export default function Home() {
  const inputRef = React.createRef();
  const router = useRouter();
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [spin, setSpin] = React.useState(false);
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
    setSpin(true);
    await axios
      .post("http://127.0.0.1:5000/api/images", {
        name: "image",
        url: imageUrl,
      })
      .then((res) => {
        console.log(res.data);
        //pos_val = Math.round(parseFloat(res.data.pos) * 100)
        //neg_val = Math.round(parseFloat(res.data.neg) * 100)
        localStorage.setItem("neg", res.data.neg);
        localStorage.setItem("pos", res.data.pos);
      })
      .catch((err) => console.log(err));
    setSpin(false);
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
      <MotionIcon
        sx={{
          fontSize: 150,
          color: "#013B92",
          marginTop: 15,
          cursor: "pointer",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1,
          repeatDelay: 1,
          ease: 'easeInOut'
        }}
      />
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
          <MotionBox
            w={[220, 250, 300, 350, 400]}
            h={[90, 110, 130, 150]}
            borderRadius={15}
            marginTop={40}
            bg="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
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
          </MotionBox>

          <MotionButton
            fontFamily="Montserrat Alternates"
            marginTop={7}
            bg="#000"
            color="#fff"
            _hover={{ bg: "gray" }}
            onClick={handleClick}
            disabled={spin}
            whileHover={{ scale: 1.2 }}
          >
            Start with AI
          </MotionButton>
          {spin && (
            <>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                my={5}
              />
              <Text fontFamily="Montserrat Alternates" color="#fff">
                We are trying hard to make prediction
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                >
                  ...
                </motion.span>
              </Text>
            </>
          )}
        </>
      ) : (
        <>
          <MotionButton
            width={[220, 250, 300, 350, 400]}
            height={[90, 110, 130, 150]}
            borderRadius={15}
            marginTop={40}
            onClick={() => {
              const input = inputRef.current;
              input.click();
            }}
            whileHover={{ scale: 1.1, marginBottom: 15 }}
            _hover={{ bg: "gray.400" }}
          >
            <UploadIcon sx={{ fontSize: 100 }} />
          </MotionButton>
          <Text fontFamily="Montserrat Alternates" marginTop={5} color="#fff">
            Upload Image(png, jpg, jpeg)
          </Text>
        </>
      )}
    </Box>
  );
}
