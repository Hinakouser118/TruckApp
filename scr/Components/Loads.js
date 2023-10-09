import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const places = [
  "Bagalkot",
  "Ballari",
  "Belagavi (Belgaum)",
  "Bengaluru (Bangalore)",
  "Bidar",
  "Vijayapura (Bijapur)",
  "Chamarajanagar",
  "Chikballapur",
  "Chikkamagaluru (Chikmagalur)",
  "Chitradurga",
  "Dakshina Kannada",
  "Davangere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi (Gulbarga)",
  "Kodagu (Coorg)",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru (Mysore)",
  "Raichur",
  "Ramanagara",
  "Shivamogga (Shimoga)",
  "Tumakuru (Tumkur)",
  "Udupi",
  "Uttara Kannada",
  "Yadgir",
];

const goodsTypes = [
  "Construction Materials",
  "Agricultural Products",
  "Consumer Goods",
  "Food and Beverages",
  "Chemicals",
  "Raw Materials",
  "Machinery and Equipment",
  "Retail Merchandise",
  "Paper and Printing",
  "Pharmaceuticals",
  "Medical Supplies",
];

const truckOptions = [
  { name: "Truck 1", icon: "truck" },
  { name: "Truck 2", icon: "truck" },
  { name: "Truck 3", icon: "truck" },
  { name: "Lorry 1", icon: "truck" },
  { name: "Lorry 2", icon: "truck" },
  { name: "Lorry 3", icon: "truck" },
];

const Loads = () => {
  const [goodsTypeDropdownOpen, setGoodsTypeDropdownOpen] = useState(false);
  const [fromPlaceDropdownOpen, setFromPlaceDropdownOpen] = useState(false);
  const [toPlaceDropdownOpen, setToPlaceDropdownOpen] = useState(false);
  const [fromPlace, setFromPlace] = useState("");
  const [toPlace, setToPlace] = useState("");
  const [goodsType, setGoodsType] = useState("");
  const [price, setPrice] = useState("");
  const [tons, setTons] = useState("");
  const [selectedTruck, setSelectedTruck] = useState("");
  const [savedDetails, setSavedDetails] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [name, setName] = useState("");

  const showFillDetailsAlert = () => {
    Alert.alert(
      "Incomplete Submission",
      "Please fill in all the details before submitting.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const handleDropdownSelect = (itemValue, dropdownStateSetter) => {
    dropdownStateSetter(false);
    switch (dropdownStateSetter) {
      case setFromPlaceDropdownOpen:
        setFromPlace(itemValue);
        break;
      case setToPlaceDropdownOpen:
        setToPlace(itemValue);
        break;
      case setGoodsTypeDropdownOpen:
        setGoodsType(itemValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (
      !fromPlace ||
      !toPlace ||
      !goodsType ||
      !selectedTruck ||
      !price ||
      !tons
    ) {
      showFillDetailsAlert();
    } else {
      // Save the details to the state
      const newDetail = {
        name,
        fromPlace,
        toPlace,
        goodsType,
        selectedTruckName: selectedTruck ? selectedTruck.name : "",
        price,
        tons,
      };
      setSavedDetails([newDetail, ...savedDetails]);

      // Clear the form fields
      setName("");
      setFromPlace("");
      setToPlace("");
      setGoodsType("");
      setSelectedTruck("");
      setPrice("");
      setTons("");
    }
  };

  return (
    <View style={styles.container}>
      {isFormVisible ? (
        <ScrollView>
          <View style={styles.shadowBox}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
              placeholder="Enter Name"
            />
            <Text style={styles.label}>From:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setFromPlaceDropdownOpen(!fromPlaceDropdownOpen)}
            >
              <View style={styles.inputContainer}>
                <Text>{fromPlace || "Select From Place"}</Text>
                <Text>{fromPlaceDropdownOpen ? "▲" : "▼"}</Text>
              </View>
            </TouchableOpacity>

            {fromPlaceDropdownOpen && (
              <ScrollView style={styles.dropdownOptions}>
                {places.map((place, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownOption}
                    onPress={() =>
                      handleDropdownSelect(place, setFromPlaceDropdownOpen)
                    }
                  >
                    <Text>{place}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <Text style={styles.label}>To:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setToPlaceDropdownOpen(!toPlaceDropdownOpen)}
            >
              <View style={styles.inputContainer}>
                <Text>{toPlace || "Select To Place"}</Text>
                <Text>{toPlaceDropdownOpen ? "▲" : "▼"}</Text>
              </View>
            </TouchableOpacity>

            {toPlaceDropdownOpen && (
              <ScrollView style={styles.dropdownOptions}>
                {places.map((place, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownOption}
                    onPress={() =>
                      handleDropdownSelect(place, setToPlaceDropdownOpen)
                    }
                  >
                    <Text>{place}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <Text style={styles.label}>Material Type:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setGoodsTypeDropdownOpen(!goodsTypeDropdownOpen)}
            >
              <View style={styles.inputContainer}>
                <Text>{goodsType || "Select Goods Type"}</Text>
                <Text>{goodsTypeDropdownOpen ? "▲" : "▼"}</Text>
              </View>
            </TouchableOpacity>

            {goodsTypeDropdownOpen && (
              <ScrollView style={styles.dropdownOptions}>
                {goodsTypes.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownOption}
                    onPress={() =>
                      handleDropdownSelect(type, setGoodsTypeDropdownOpen)
                    }
                  >
                    <Text>{type}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            {/* Truck options */}
            <Text style={styles.label}>Truck Type:</Text>
            <View style={styles.truckOptions}>
              {truckOptions.map((truck, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.truckOption,
                    {
                      backgroundColor:
                        selectedTruck === truck ? "blue" : "white",
                      borderColor: selectedTruck === truck ? "blue" : "black",
                      zIndex: selectedTruck === truck ? 1 : 0,
                    },
                  ]}
                  onPress={() =>
                    setSelectedTruck(selectedTruck === truck ? null : truck)
                  }
                >
                  <Icon
                    name={truck.icon}
                    size={24}
                    color={selectedTruck === truck ? "white" : "black"}
                  />
                  <Text
                    style={{
                      color: selectedTruck === truck ? "white" : "black",
                    }}
                  >
                    {truck.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Price (in Rupees):</Text>
            <TextInput
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType="numeric"
              style={styles.input}
              placeholder="₹ Enter Expected Price"
            />

            <Text style={styles.label}>Weight:</Text>
            <TextInput
              value={tons}
              onChangeText={(text) => setTons(text)}
              keyboardType="numeric"
              style={styles.input}
              placeholder="₹ Enter weight (in truck)"
            />
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          {savedDetails.map((detail, index) => (
            <View key={index} style={styles.savedDetail}>
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>
                <MaterialCommunityIcons name="rename-box" size={20} color="black" />
                {" "}Name: {detail.name}</Text>
                <View style={styles.horizontalLine} />
                <View style={styles.addressTop}>
                  <View style={styles.greenDot} />
                  <Text style={styles.addressText}>
                    From Place: {detail.fromPlace}
                  </Text>
               </View>
              </View>

              <View style={styles.addressContainer}>
                <View style={styles.addressTop}>
                  <Icon
                    name="map-marker"
                    size={20}
                    color="red"
                    style={styles.locationIcon}
                  />
                  <Text style={styles.addressText}>
                    To Place: {detail.toPlace}
                  </Text>
                </View>
                <View style={styles.horizontalLine} />
              </View>

              <View style={styles.iconAndGoodsContainer}>
                <View style={styles.iconContainer}>
                  <Text style={styles.label}>
                    <Icon name="truck" size={24} color="blue" /> Truck:{" "}
                    {detail.selectedTruckName}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.label}>
                    <Icon name="cubes" size={24} color="green" /> Material:{" "}
                    {detail.goodsType}
                  </Text>
                </View>
                <View style={styles.horizontalLine} />
              </View>

              <View style={styles.amountAndTunsContainer}>
                <View style={styles.amountContainer}>
                  <Text style={styles.label}>Price Expected:</Text>
                  <Text style={styles.amountText}>₹ {detail.price}</Text>
                </View>
                <View style={styles.tunsContainer}>
                  <Text style={styles.label}>Weight:</Text>
                  <Text style={styles.tunsText}>{detail.tons}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => setIsFormVisible(!isFormVisible)}
      >
        <Icon name={isFormVisible ? "times" : "plus"} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  floatButton: {
    width: 50,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  shadowBox: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    elevation: 4,
    margin: 20,
  },
  label: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 18,
    color: "black",
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
  },
  dropdownOptions: {
    maxHeight: 150,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  addressContainer: {
    marginTop: 10,
    bottom: 10,
  },
  addressTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  greenDot: {
    width: 12,
    height: 12,
    backgroundColor: "green",
    borderRadius: 6,
    marginRight: 10,
  },
  locationIcon: {
    marginRight: 10,
  },
  addressText: {
    fontSize: 18,
  },
  iconAndGoodsContainer: {
    marginTop: 10,
    bottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  iconNameText: {
    fontSize: 16,
  },
  amountAndTunsContainer: {
    marginTop: 10,
    justifyContent: "space-between",
    
    bottom:15
  },
  amountContainer: {},
  tunsContainer: {},
  amountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tunsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  horizontalLine: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  dropdownOption: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  truckOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  truckOption: {
    width: "48%",
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    marginBottom: 4,
    borderRadius: 3,
    alignItems: "center",
  },
  savedDetail: {
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  savedDetailText: {
    fontSize: 16,
  },
});

export default Loads;
