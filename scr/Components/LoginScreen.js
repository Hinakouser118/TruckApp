import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
const navigation = useNavigation();
const handleLogin = () => {
    // Implement your authentication logic here
    if (email === "user@example.com" && password === "password") {
      // Successful login
      setIsLogged(true);
      setEmail(""); // Clear email
      setPassword("");

      navigation.navigate("SearchItems"); // Navigate to the home screen
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };
return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
<View style={styles.buttonsContainer}>
          <Pressable style={styles.smallButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  smallButton: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  view: {
    position: "absolute",
    padding: 15,
    width: "100%",
    backgroundColor: "blue",
    justifyContent: "center",
    elevation: 2,
    shadowRadius: 10,
    borderRadius: 5,
    width: 350,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "white",
  },
});
