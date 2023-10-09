import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Modal, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from "native-base";
export default function DrawerContent(props) {
  const navigation = useNavigation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const closeDrawerAndNavigateHome = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate("Home");
  };
  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  const confirmLogout = () => {
    navigation.navigate("LoginScreen");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={closeDrawerAndNavigateHome}
        >
          <FontAwesome name="close" size={35} color="black" />
        </TouchableOpacity>
        <View style={styles.profile}>
          <FontAwesome name="user-circle-o" size={100} color="black" />
          <Text style={styles.profileName}>Ghousiya</Text>
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.text}>
            <MaterialCommunityIcons
              name="card-account-phone"
              size={24}
              color="black"
            />{" "}
            E01242
          </Text>
          <Text style={styles.text}>
            <Ionicons name="mail" size={24} color="black" /> ghousiya.s@fr8.in
          </Text>
          <Text style={styles.text}>
            <Entypo name="phone" size={24} color="black" />
            9380804050
          </Text>
          <Text style={styles.text}>
            <FontAwesome name="building" size={24} color="black" /> Sales(A)
          </Text>
          <Text style={styles.text}>
            <Entypo name="suitcase" size={24} color="black" /> Chennai
          </Text>
        </View>
        <View style={styles.contentBox}>
          <Text style={[styles.text, { fontWeight: "bold", color: "black" }]}>
            Personal Details
          </Text>
          <Text style={styles.text}>Gender Female</Text>
          <Text style={styles.text}>otherEmail gghousiya786@gmail.com</Text>
          <Text style={styles.text}>MartialStatus Single</Text>
          <Text style={styles.text}>
            Address Door 9, ward no 15, Near Society Rice mill, Ballari,
            Karnataka-583101
          </Text>
        </View>
        <View style={{ flex: 1, bottom: 3 }}>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              props.navigation.navigate("ApplyLeaves");
            }}
          >
            <Text style={styles.drawerItemText}>
              <FontAwesome name="calendar" size={24} color={"black"} /> {"  "}
              Apply Leaves
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              props.navigation.navigate("Expenses");
            }}
          >
            <Text style={styles.drawerItemText}>
              <FontAwesome name="dollar" size={24} color={"black"} /> {"  "}
              Expenses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              props.navigation.navigate("Holidays");
            }}
          >
            <Text style={styles.drawerItemText}>
              <FontAwesome name="calendar-check-o" size={24} color={"black"} />{" "}
              {"  "}
              Holidays
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              props.navigation.navigate("Loads");
            }}
          >
            <Text style={styles.drawerItemText}>
            <FontAwesome5 name="cubes" size={24} color="black" />{" "}
              {"  "}
              Loads
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
            <Text style={styles.drawerItemText}>
              <FontAwesome name="sign-out" size={24} color="black" /> Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={showLogoutModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to logout?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={confirmLogout}
              >
                <Text style={styles.buttonText2}>Confirm</Text>
              </TouchableOpacity>
              <View style={{ width: 20 }} />
              <TouchableOpacity
                style={styles.smallButton}
                onPress={cancelLogout}
              >
                <Text style={styles.buttonText2}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  profile: {
    alignItems: "center",
    marginBottom: 20,
    top: 35,
  },
  profileName: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  contentBox: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    top: 25,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 3,
    top: 10,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  buttonText2: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  smallButton: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
});
