import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ScrollableFeed from "react-scrollable-feed";
import styles from "../../styles/Chat.module.css";

const exampleText = [
  "We make predications based on your image provided.",
  "the result should be in 1 min",
  "Hi there.",
  "We have thousands of classified images of this type of cancer in our database",
  "No problem",
  "See you soon",
];

const UserInput = (props) => {
  const handleClick = (e) => {
    props.setAllMsgs([...props.allmsgs, props.newMsg]);
    props.setNewMsg("");
  };

  const hanldeKey = (e) => {
    if (e.key === "Enter" && props.newMsg) {
      props.setAllMsgs([...props.allmsgs, props.newMsg]);
      props.setNewMsg("");
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
      />
      <Button
        bg="#000"
        color="#fff"
        _hover={{ bg: "gray.500" }}
        onClick={handleClick}
      >
        Send
      </Button>
    </Box>
  );
};

const ChatFeed = (props) => {
  return (
    <ScrollableFeed>
      {props.allmsgs.map((text, i) => (
        <Box
          mx={i % 2 == 0 ? ["5vw", "10vw", "15vw"] : ["55vw", "60vw", "65vw"]}
          key={i}
        >
          <Text
            key={i}
            textAlign={i % 2 == 0 ? "right" : "left"}
            bg={i % 2 == 0 ? "gray.400" : "green.400"}
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
        </Box>
      ))}
    </ScrollableFeed>
  );
};

function Chat() {
  const [allmsgs, setAllMsgs] = useState(exampleText);
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
