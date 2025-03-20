// screens/ChatbotScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { getAIResponse } from "../api/gemini";

const ChatbotScreen = ({ navigation }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  const simulateTypingEffect = (response, callback) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < response.length) {
        callback(response.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1);
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    setIsTyping(true);
    const aiResponse = await getAIResponse(userInput);
    setChatHistory((prev) => [...prev, { role: "user", text: userInput }]);
    simulateTypingEffect(aiResponse, (partialResponse) => {
      setChatHistory((prev) => {
        const updatedHistory = [...prev];
        const lastMessage = updatedHistory[updatedHistory.length - 1];

        if (lastMessage && lastMessage.role === "ai") {
          updatedHistory[updatedHistory.length - 1] = {
            ...lastMessage,
            text: partialResponse,
          };
        } else {
          updatedHistory.push({ role: "ai", text: partialResponse });
        }

        return updatedHistory;
      });
    });

    setIsTyping(false);
    setUserInput("");
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatHistory]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>EcoFriend</Text>

      <ScrollView ref={scrollViewRef} style={styles.chatBox}>
        {chatHistory.map((msg, index) => (
          <View
            key={index}
            style={msg.role === "user" ? styles.userBubble : styles.aiBubble}
          >
            {msg.role === "ai" ? (
              <Markdown>{msg.text}</Markdown>
            ) : (
              <Text style={styles.text}>{msg.text}</Text>
            )}
          </View>
        ))}

        {/* 
        {isTyping && (
          <View style={styles.aiBubble}>
            <ActivityIndicator size="small" color="#000" />
            <Text style={styles.typingText}>Typing...</Text>
          </View>
        )} */}
      </ScrollView>

      {/* Input container */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask something..."
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={{
            backgroundColor: "#4CAF50",
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chatBox: { flex: 1, marginBottom: 10 },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#d1e7dd",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "95%",
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "95%",
  },
  text: {
    fontSize: 16,
  },
  typingText: {
    marginLeft: 5,
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default ChatbotScreen;
