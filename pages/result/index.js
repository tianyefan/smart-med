import React from "react";
import MedicationIcon from "@mui/icons-material/Medication";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Text, Button, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionIcon = motion(CheckCircleIcon);
const MotionButton = motion(Button);
const MotionBox = motion(Box);

function Result() {
  const pos = localStorage.getItem("pos");
  const neg = localStorage.getItem("neg");
  //console.log('pos val: ' + pos)
  //console.log('neg val: ' + neg)
  //pos_val = Math.round(parseFloat(res.data.pos) * 100)
  //neg_val = Math.round(parseFloat(res.data.neg) * 100)
  const pos_val = Math.round(parseFloat(pos) * 100);
  const neg_val = Math.round(parseFloat(neg) * 100);
  console.log("pos :" + pos_val.toString());
  console.log("neg :" + neg_val.toString());
  return (
    <>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        marginBottom={15}
      >
        <MedicationIcon
          sx={{ fontSize: 80, color: "#013B92", marginRight: 3 }}
        />
        <Text fontSize={26} fontFamily="Montserrat" color="#013B92">
          Smart Med
        </Text>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        marginTop={30}
      >
        <MotionIcon
          w={40}
          h={40}
          color="green.300"
          initial={{ marginTop: -50, marginBottom: -50 }}
          animate={{ marginTop: 15, marginBottom: 15 }}
          transition={{ duration: 1.5 }}
        />
        <Text
          fontFamily="Montserrat Alternates"
          fontSize={[18, 20, 25, 30, 35]}
          textAlign="center"
          h={[45, 50, 55, 58, 65]}
          my={10}
        >
          Congrates. All Done...
        </Text>

        <MotionBox
          bg="#FFE5CC"
          my="3em"
          py="3em"
          px={["2em", "2.5em", "3em"]}
          borderRadius={[15, 18, 20]}
          border="3px solid #FF6666"
          whileHover={{ scale: 1.2 }}
        >
          <Text
            fontSize={[12, 16, 20, 24]}
            fontFamily="Montserrat"
            fontWeight="bold"
          >
            Based on our AI model, we think you have:
            <br />
            <br />
            Probability of getting Breast Cancer: {pos_val} %
            <br />
            Probability of <motion.span>NOT</motion.span> getting Breast Cancer:{" "}
            {neg_val} %
          </Text>
        </MotionBox>

        <Link href="/chat" textDecoration="none">
          <MotionButton
            w={[200, 250, 300, 350, 400]}
            h={[75, 90, 100, 120, 140]}
            fontFamily="Montserrat Alternates"
            bg="#000"
            color="#fff"
            _hover={{ bg: "gray" }}
            fontSize={[18, 21, 24, 27, 30]}
            borderRadius={[15, 20, 25, 30]}
            whileHover={{ scale: 1.1 }}
          >
            Talk with AI
            <LiveHelpIcon sx={{ fontSize: 45 }} />
          </MotionButton>
        </Link>
      </Box>
    </>
  );
}

export default Result;
