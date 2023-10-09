import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
 } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from "@expo/vector-icons";

import Modal from "react-native-modal";

export default function Applyleave() {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [isLeaveTypeDropdownOpen, setIsLeaveTypeDropdownOpen] = useState(false);
  const [isFromDatePickerVisible, setFromDatePickerVisible] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const leaveTypes = ["Consolidated Leave", "Sick Leave", "LOP"];


  const handleLeaveTypeSelection = (type) => {
    setLeaveType(type);
    setIsLeaveTypeDropdownOpen(false);
  };

  const handleFromDateConfirm = (selectedDate) => {
    setFromDatePickerVisible(false);
    setFromDate(selectedDate.toDateString());
  };

  const handleToDateConfirm = (selectedDate) => {
    setToDatePickerVisible(false);
    setToDate(selectedDate.toDateString());
  };

  const handleSubmit = () => {
    if (!leaveType || !fromDate || !toDate || !reason) {
      setIsModalVisible(true);
    } else {
      console.log("Leave Type:", leaveType);
      console.log("From Date:", fromDate);
      console.log("To Date:", toDate);
      console.log("Reason:", reason);
      setLeaveType("");
      setFromDate("");
      setToDate("");
      setReason("");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
  
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.leaveTypeDropdown}
            onPress={() => setIsLeaveTypeDropdownOpen(!isLeaveTypeDropdownOpen)}
          >
            <Text>{leaveType || "Select Leave Type"}</Text>
            <Text>{isLeaveTypeDropdownOpen ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {isLeaveTypeDropdownOpen && (
            <View style={styles.leaveTypeOptions}>
              {leaveTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.leaveTypeOption}
                  onPress={() => handleLeaveTypeSelection(type)}
                >
                  <Text>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <Text>From:</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setFromDatePickerVisible(true)}
        >
          <View style={styles.inputContainer}>
            <Text>{fromDate || "Select From Date"}</Text>
            <FontAwesome
              name="calendar"
              size={24}
              color="black"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        <Text>To:</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setToDatePickerVisible(true)}
        >
          <View style={styles.inputContainer}>
            <Text>{toDate || "Select To Date"}</Text>
            <FontAwesome
              name="calendar"
              size={24}
              color="black"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        <Text>Reason:</Text>
        <TextInput
          style={styles.input}
          placeholder="Reason for Leave"
          value={reason}
          onChangeText={(text) => setReason(text)}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text>Apply</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isFromDatePickerVisible}
        mode="date"
        onConfirm={handleFromDateConfirm}
        onCancel={() => setFromDatePickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isToDatePickerVisible}
        mode="date"
        onConfirm={handleToDateConfirm}
        onCancel={() => setToDatePickerVisible(false)}
      />
      {/* Modal */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text>Please fill in all the information.</Text>
          <Button title="OK" onPress={closeModal} />
        </View>
      </Modal>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    bottom: 30,

  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginLeft: 10,
  },

  formContainer: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    alignItems: "left",
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 10,
  },
  leaveTypeDropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "left",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  leaveTypeOptions: {
    flexDirection: "column",
    borderColor: "#ccc",
    borderRadius: 5,
  },
  leaveTypeOption: {
    padding: 10,
    alignItems: "left",
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: "70%",
    borderRadius: 5,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: "80%",
  },
  // Modal styles
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
});
