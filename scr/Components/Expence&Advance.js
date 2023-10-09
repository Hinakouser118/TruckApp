import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
const Expense = () => {
  const [selectedOption, setSelectedOption] = useState("Expense");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [claimedAmount, setClaimedAmount] = useState("");
  const [comments, setComments] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const expenseOptions = [
    "Bill Submission",
    "Client Meet",
    "Admin Work",
    "Food Expense",
    "Truck Struck",
    "medical insurance",
  ];
  const advanceOptions = ["Salary Advance"];
  const handleRadioChange = (option) => {
    setSelectedOption(option);
    setSelectedActivity(null);
    setSelectedImage(null);
    if (option === "Advance") {
      setClaimedAmount("");
      setComments("");
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    setSelectedActivity(option);
    setShowDropdown(false);
  };
  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("ImagePicker Error:", error);
    }
  };
  const handleConsoleLog = () => {
    if (claimedAmount.trim() === "" || comments.trim() === "") {
      Alert.alert("Error", "Please fill in all required fields.");
    } else {
      const maxAmount = selectedOption === "Advance" ? 50000 : 30000;
      const enteredAmount = parseInt(claimedAmount);

      if (enteredAmount > maxAmount) {
        Alert.alert(
          "Error",
          `Maximum ${maxAmount} INR is allowed for ${selectedOption}.`,
          [{ text: "OK", onPress: () => {} }]
        );
      } else {
        console.log("Selected Option:", selectedOption);
        console.log("Selected Activity:", selectedActivity);
        console.log("Claimed Amount:", claimedAmount);
        console.log("Comments:", comments);
        console.log("Image:",selectedImage )
        setSelectedOption("Expense");
        setSelectedActivity(null);
        setClaimedAmount("");
        setComments("");
        setSelectedImage(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.box}>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedOption === "Expense" && styles.radioSelected,
            ]}
            onPress={() => handleRadioChange("Expense")}
          >
            <View
              style={[
                styles.radioCircle,
                selectedOption === "Expense" && styles.selectedColor,
              ]}
            >
              <View
                style={[
                  styles.innerCircle,
                  selectedOption === "Expense" && styles.innerCircleSelected,
                ]}
              />
            </View>
            <Text style={styles.radioText}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedOption === "Advance" && styles.radioSelected,
            ]}
            onPress={() => handleRadioChange("Advance")}
          >
            <View
              style={[
                styles.radioCircle,
                selectedOption === "Advance" && styles.selectedColor,
              ]}
            >
              <View
                style={[
                  styles.innerCircle,
                  selectedOption === "Advance" && styles.innerCircleSelected,
                ]}
              />
            </View>
            <Text style={styles.radioText}>Advance</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            placeholder="Select Claim Category"
            onPress={handleDropdownToggle}
          >
            <Text>{selectedActivity || "Select Claim Category"}</Text>
          </TouchableOpacity>
          {showDropdown && (
            <View>
              {selectedOption === "Expense"
                ? expenseOptions.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.dropdownItem}
                      onPress={() => handleOptionSelect(item)}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))
                : advanceOptions.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.dropdownItem}
                      onPress={() => handleOptionSelect(item)}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
            </View>
          )}
        </View>
        <TextInput
          style={[
            styles.textInput,
            parseInt(claimedAmount) >
              (selectedOption === "Advance" ? 50000 : 30000) &&
              styles.redTextInput,
          ]}
          value={claimedAmount}
          placeholder={
            selectedOption === "Advance"
              ? "₹ Claimed Amount (Maximum 50,000)"
              : "₹ Claimed Amount (Maximum 30,000)"
          }
          onChangeText={(text) => setClaimedAmount(text)}
          keyboardType="numeric"
        />
        {parseInt(claimedAmount) >
          (selectedOption === "Advance" ? 50000 : 30000) && (
          <Text style={styles.redText}>
            {selectedOption === "Advance"
              ? `Maximum 50,000 INR is allowed for Salary Advance.`
              : `Maximum 30,000 INR is allowed for Expense.`}
          </Text>
        )}
        <TextInput
          style={styles.textInput}
          value={comments}
          placeholder="Comments"
          onChangeText={(text) => setComments(text)}
          multiline
        />

        {selectedOption === "Expense" && selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        )}

        {selectedOption === "Expense" && (
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={handleImagePicker}
          >
            <Text>Select Image</Text>
          </TouchableOpacity>
        )}
        <View style={styles.textContent}>
          <Text style={styles.contentHeading}>
            {selectedOption === "Advance"
              ? "Salary Advance Claim Details Required:"
              : "Expense Claim Details Required:"}
          </Text>

          <Text style={styles.contentText}>
            {selectedOption === "Advance"
              ? "1. Employee ID and Name."
              : "1. Client Meet (Client Name & Date of visit)."}
          </Text>
          <Text style={styles.contentText}>
            {selectedOption === "Advance"
              ? "2. Amount claimed with proper justification."
              : "2. Truck Struck - Truck No, Location, Date of Visit, From & To Date and No. of Persons."}
          </Text>
          <Text style={styles.contentText}>
            {selectedOption === "Advance"
              ? "3. Date of Advance and Purpose."
              : "3. Admin Work - Location & Date."}
          </Text>
          <Text style={styles.contentText}>
            {selectedOption === "Advance"
              ? "4. Indicate how the transaction was paid, whether by cash, credit card, company card, or another method."
              : "4. Travel Advance - Please provide location, Attach or reference any relevant receipts, invoices, bills, or supporting documents to substantiate the transaction."}
          </Text>
        </View>

        <Button title="Console Log Data" onPress={handleConsoleLog} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },

  box: {
    width: "100%",
    padding: 40,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
    top: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    bottom: 30,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  radioSelected: {
    backgroundColor: "transparent",
    borderRadius: 50,
  },
  radioCircle: {
    height: 25,
    width: 25,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: "white",
  },
  innerCircleSelected: {
    backgroundColor: "black",
  },
  radioText: {
    marginLeft: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
    fontSize: 15,
    bottom: 20,
  },
  redTextInput: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    fontSize: 15,
    bottom: 20,
  },
  dropdownContainer: {
    marginTop: 16,
    bottom: 30,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textContent: {
    marginTop: 24,
    bottom: 30,
  },
  contentHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 8,
  },
  redText: {
    fontSize: 16,
    color: "red",
    marginBottom: 8,
  },
  imagePickerButton: {
    marginTop: 16,
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    bottom: 20,
  },

  selectedImage: {
    marginTop: 16,
    width: 200,
    height: 200,
  },
});

export default Expense;
