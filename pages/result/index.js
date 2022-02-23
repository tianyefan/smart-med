import React from "react";
import MedicationIcon from "@mui/icons-material/Medication";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import {
  Box,
  Text,
  Heading,
  Button,
  Input,
  Link,
  Image,
} from "@chakra-ui/react";

function Result() {
  return (
    <>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        marginBottom={15}
      >
        <MedicationIcon
          sx={{ fontSize: 50, color: "#013B92", marginRight: 3 }}
        />
        <Text fontSize={18} fontFamily="Montserrat" color="#013B92">
          Smart Med
        </Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <Text
          fontFamily="Montserrat Alternates"
          fontSize={[18,20,25,30,35]}
          bg="#98F4E4"
          w={[400,450,500,550,600]}
          textAlign="center"
          h={[45,50,55,58,65]}
          borderRadius={10}
          marginTop={10}
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: 30, color: "green", marginRight: 10 }}
          />
          Training Model...
        </Text>
        <Text
          fontFamily="Montserrat Alternates"
          fontSize={[18,20,25,30,35]}
          bg="#98F4E4"
          w={[400,450,500,550,600]}
          textAlign="center"
          h={[45,50,55,58,65]}
          borderRadius={10}
          marginTop={10}
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: 30, color: "green", marginRight: 5 }}
          />
          Analysing Image...
        </Text>
        <Text
          fontFamily="Montserrat Alternates"
          fontSize={[18,20,25,30,35]}
          bg="#98F4E4"
          w={[400,450,500,550,600]}
          textAlign="center"
          h={[45,50,55,58,65]}
          borderRadius={10}
          marginTop={10}
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: 30, color: "green", marginRight: 25 }}
          />
          All Done...
        </Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        marginTop={40}
      >
        <Link
          href="/chat"
        >
          <Button
            w={[300,350,400,450,500]}
            h={[75,90,100,120,140]}
            fontFamily="Montserrat Alternates"
            bg="#000"
            color="#fff"
            _hover={{ bg: "gray" }}
            fontSize={[18,21,24,27,30]}
            borderRadius={[10,15,20,25,30]}
          >
            Talk with AI for details.
            <LiveHelpIcon sx={{ fontSize: 45 }} />
          </Button>
        </Link>

        <Button marginTop={20} w={[150,180,200]} h={[50,55,70]} borderRadius={[10,12,15]}>
          <DownloadForOfflineIcon sx={{ fontSize: 50 }} />
        </Button>
        <Text
          fontFamily="Montserrat Alternates"
          fontSize={[12,15,18]}
          marginTop={3}
          color="#fff"
        >
          Download Result
        </Text>
      </Box>
    </>
  );
}

export default Result;
