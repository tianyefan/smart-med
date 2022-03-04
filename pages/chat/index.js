import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import styles from "../../styles/Chat.module.css";
import axios from "axios";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const UserInput = (props) => {
  const handleClick = async (e) => {
    e.preventDefault();

    //props.setNewMsg("");
    const pos = localStorage.getItem("pos");
    const neg = localStorage.getItem("neg");

    await axios
      .post("http://127.0.0.1:5000/api/chat", {
        msg: props.newMsg,
        pos: pos,
        neg: neg,
      })
      .then((res) => {
        console.log(res.data.reply);
        props.setAllMsgs([...props.allmsgs, props.newMsg, res.data.reply]);
        props.setNewMsg("");
      })
      .catch((err) => console.log(err));
  };

  const hanldeKey = async (e) => {
    if (e.key === "Enter" && props.newMsg) {
      //props.setAllMsgs([...props.allmsgs, props.newMsg]);
      //props.setNewMsg("");
      const pos = localStorage.getItem("pos");
      const neg = localStorage.getItem("neg");

      await axios
        .post("http://127.0.0.1:5000/api/chat", {
          msg: props.newMsg,
          pos: pos,
          neg: neg,
        })
        .then((res) => {
          console.log(res.data.reply);
          props.setAllMsgs([...props.allmsgs, props.newMsg, res.data.reply]);
          props.setNewMsg("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.200"
      w="100vw"
      py="0.5rem"
      opacity={0.65}
    >
      <Input
        type="text"
        placeholder="Type your sentence here..."
        w="50vw"
        mx="1em"
        border="2px solid #ccc7b6"
        py="1rem"
        bg="gray.100"
        fontFamily="Montserrat Alternates"
        onChange={(e) => props.setNewMsg(e.target.value)}
        value={props.newMsg}
        onKeyDown={hanldeKey}
        _focus={{ opacity: 1 }}
      />
      <MotionButton
        bg="#000"
        color="#fff"
        _hover={{ bg: "gray.500" }}
        onClick={handleClick}
        whileHover={{ scale: 1.2 }}
      >
        Send
      </MotionButton>
    </Box>
  );
};

const ChatFeed = (props) => {
  return (
    <ScrollableFeed>
      {props.allmsgs.map((text, i) => (
        <MotionBox
          mx={i % 2 == 1 ? ["5vw", "10vw", "15vw"] : ["55vw", "60vw", "65vw"]}
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
          whileHover={{ scale: 1.1 }}
        >
          {i % 2 == 1 && <SmartToyIcon />}
          <Text
            key={i}
            textAlign={i % 2 == 1 ? "right" : "left"}
            bg={i % 2 == 1 ? "gray.500" : "green.500"}
            my="1rem"
            px="1rem"
            py="1rem"
            w={[140, 180, 220, 260, 300]}
            borderRadius={[6, 9, 12]}
            fontFamily="Montserrat Alternates"
            fontSize={["xs", "sm", "md", "lg"]}
          >
            {text}
          </Text>
        </MotionBox>
      ))}
    </ScrollableFeed>
  );
};

function Chat() {
  const [allmsgs, setAllMsgs] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  return (
    <div className={styles.chatBody}>
      <ChatFeed allmsgs={allmsgs} setAllMsgs={setAllMsgs} />
      <UserInput
        newMsg={newMsg}
        setNewMsg={setNewMsg}
        setAllMsgs={setAllMsgs}
        allmsgs={allmsgs}
      />
    </div>
  );
}

export default Chat;
