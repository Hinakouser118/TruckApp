// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   Modal,
//   Button,
// } from "react-native";
// import axios from "axios";

// const SearchItems = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [truckData, setTruckData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [newTruckData, setNewTruckData] = useState({
//     id: "",
//     truckId: "",
//     name: "",
//     cargoType: "",
//     loaded: "",
//   });

//   const fetchTruckData = () => {
//     const apiUrl = `http://192.168.1.7:3000/leads`;

//     axios
//       .get(apiUrl)
//       .then((response) => {
//         const data = response.data;
//         setTruckData(data);
//         filterData(data, searchQuery);
//       })
//       .catch((error) => {
//         console.error("Error fetching truck data:", error);
//       });
//   };

//   const filterData = (data, query) => {
//     const filtered = data.filter((item) => {
//       const searchQuery = query.toLowerCase();
//       return (
//         item.id.toString().toLowerCase().includes(searchQuery) ||
//         item.name.toLowerCase().includes(searchQuery)
//       );
//     });
//     setFilteredData(filtered);
//   };

//   const saveTruckData = () => {
//     const apiUrl = `http://192.168.1.7:3000/leads`;

//     axios
//       .post(apiUrl, newTruckData)
//       .then((response) => {
//         setNewTruckData({
//           id: "",
//           truckId: "",
//           name: "",
//           cargoType: "",
//           loaded: "", // Clear loaded field
//         });
//         // Data saved successfully, you can update the UI as needed
//         setModalVisible(false);

//         fetchTruckData(); // Refresh the truck data after saving
//       })
//       .catch((error) => {
//         console.error("Error saving truck data:", error);
//       });
//   };

//   const toggleFloatingButton = () => {
//     setModalVisible(!modalVisible);
//   };

//   useEffect(() => {
//     if (!modalVisible) {
//       // Fetch data when closing the modal
//       fetchTruckData();
//     }
//   }, [modalVisible]);
//   useEffect(() => {
//     filterData(truckData, searchQuery);
//   }, [searchQuery]);
//   return (
//     <View style={styles.container}>
//           <TextInput
//         style={styles.searchInput}
//         placeholder="Search by ID or Name..."
//         onChangeText={(text) => setSearchQuery(text)}
//         value={searchQuery}
//       />

//       {modalVisible ? (
//         <Modal visible={modalVisible} animationType="slide">
//           <View style={styles.modalContainer}>
//             <View style={styles.modalBox}>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Id"
//                 onChangeText={(text) =>
//                   setNewTruckData({ ...newTruckData, id: text })
//                 }
//                 value={newTruckData.id}
//               />
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Truck ID"
//                 onChangeText={(text) =>
//                   setNewTruckData({ ...newTruckData, truckId: text })
//                 }
//                 value={newTruckData.truckId}
//               />
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Name"
//                 onChangeText={(text) =>
//                   setNewTruckData({ ...newTruckData, name: text })
//                 }
//                 value={newTruckData.name}
//               />
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Cargo Type"
//                 onChangeText={(text) =>
//                   setNewTruckData({ ...newTruckData, cargoType: text })
//                 }
//                 value={newTruckData.cargoType}
//               />
//                 <TextInput
//                 style={styles.formInput}
//                 placeholder="Loaded"
//                 onChangeText={(text) =>
//                   setNewTruckData({ ...newTruckData, loaded: text })
//                 }
//                 value={newTruckData.loaded}
//               />
//               <View style={styles.buttonContainer}>
//                 <Button title="Save" onPress={saveTruckData} />
//                 <Button
//                   title="Close"
//                   onPress={() => {
//                     setModalVisible(false);
//                     setNewTruckData({
//                       id: "",
//                       truckId: "",
//                       name: "",
//                       cargoType: "",
//                       loaded: "",
//                     });
//                   }}
//                 />
//               </View>
//             </View>
//           </View>
//         </Modal>
//       ) : (
//         <View style={styles.truckDataContainer}>
//           <FlatList
//             data={filteredData}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.truckContainer}>
//                 <Text style={styles.truckText}>ID: {item.id}</Text>
//                 <Text style={styles.truckText}>Name: {item.name}</Text>
//                 <Text style={styles.truckText}>Cargo Type: {item.cargoType}</Text>
//                 <Text style={styles.truckText}>TruckId: {item.truckId}</Text>
//                 <Text style={styles.truckText}>
//                   {/* Load Status: {item.isLoaded ? "Loaded" : "Not Loaded"} */}
//                   Load Status: {item.loaded}
//                 </Text>
//               </View>
//             )}
//           />
//         </View>
//       )}
//         {!modalVisible && (
//         <TouchableOpacity
//           style={styles.floatingButton}
//           onPress={toggleFloatingButton}
//         >
//           <Text style={{ color: "#fff", fontSize: 28 }}>+</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     top: 20,
//   },
//   truckDataContainer: {
//     flex: 1,
//   },
//   truckContainer: {
//     backgroundColor: "#fff",
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     width: "90%",
//     left: 10,
//     padding: 12,
//   },
//   truckText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   floatingButton: {
//     backgroundColor: "blue",
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     alignItems: "center",
//     justifyContent: "center",
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//     elevation: 3,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchInput: {
//     height: 45,
//     borderColor: "gray",
//     borderWidth: 2,
//     marginRight: 15,
//     paddingLeft: 20,
//     borderRadius: 5,
//     marginBottom: 10,
//     bottom: 18,
//     width: "100%",
//     paddingHorizontal: 15,
//   },
//   modalBox: {
//     backgroundColor: "blue",
//     width: "80%",
//     padding: 20,
//     borderRadius: 5,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   formInput: {
//     width: "100%",
//     height: 40,
//     borderColor: "white",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   backgroundColor:'white'
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     backgroundColor:'blue',
//     justifyContent: "space-between",
//   },
// });

// export default SearchItems;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import axios from "axios";

const SearchItems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [truckData, setTruckData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTruckData, setNewTruckData] = useState({
    truckNo: "",
    truckName: "",
    driverName: "",
    phoneNumber: "",
    type: "",
    description: "",
  });

  const fetchTruckData = () => {
    const apiUrl = `http://192.168.1.6:3000/leads`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        setTruckData(data);
        filterData(data, searchQuery);
      })
      .catch((error) => {
        console.error("Error fetching truck data:", error);
      });
  };

  const filterData = (data, query) => {
    const filtered = data.filter((item) => {
      
      const searchQuery = query ? query.toLowerCase() : "";
      return (
        item.truckNo.toLowerCase().includes(searchQuery) ||
        item.truckName.toLowerCase().includes(searchQuery)
      );
    });
    setFilteredData(filtered);
  };

  const saveTruckData = () => {
    const apiUrl = `http://192.168.1.6:3000/leads`;

    axios
      .post(apiUrl, newTruckData)
      .then((response) => {
        setNewTruckData({
          truckNo: "",
          truckName: "",
          driverName: "",
          phoneNumber: "",
          type: "",
          description: "",
        });
        // Data saved successfully, you can update the UI as needed
        setModalVisible(false);

        fetchTruckData(); // Refresh the truck data after saving
      })
      .catch((error) => {
        console.error("Error saving truck data:", error);
      });
  };

  const toggleFloatingButton = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    if (!modalVisible) {
      // Fetch data when closing the modal
      fetchTruckData();
    }
  }, [modalVisible]);

  useEffect(() => {
    filterData(truckData, searchQuery);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Truck No or Truck Name..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />

      {modalVisible ? (
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <TextInput
                style={styles.formInput}
                placeholder="Truck No"
                onChangeText={(text) =>
                  setNewTruckData({ ...newTruckData, truckNo: text })
                }
                value={newTruckData.truckNo}
              />
              <TextInput
                style={styles.formInput}
                placeholder="Truck Name"
                onChangeText={(text) =>
                  setNewTruckData({ ...newTruckData, truckName: text })
                }
                value={newTruckData.truckName}
              />
              <TextInput
                style={styles.formInput}
                placeholder="Driver Name"
                onChangeText={(text) =>
                  setNewTruckData({ ...newTruckData, driverName: text })
                }
                value={newTruckData.driverName}
              />
              <TextInput
                style={styles.formInput}
                placeholder="Phone Number"
                onChangeText={(text) =>
                  setNewTruckData({ ...newTruckData, phoneNumber: text })
                }
                value={newTruckData.phoneNumber}
              />
              <TextInput
                style={styles.formInput}
                placeholder="Type"
                onChangeText={(text) =>
                  setNewTruckData({ ...newTruckData, type: text })
                }
                value={newTruckData.type}
              />
              <TextInput
                style={styles.formInput}
                placeholder="Description"
                onChangeText={(text) =>
                  setNewTruckData({ ...newTruckData, description: text })
                }
                value={newTruckData.description}
              />
              <View style={styles.buttonContainer}>
                <Button title="Save" onPress={saveTruckData} />
                <Button
                  title="Close"
                  onPress={() => {
                    setModalVisible(false);
                    setNewTruckData({
                      truckNo: "",
                      truckName: "",
                      driverName: "",
                      phoneNumber: "",
                      type: "",
                      description: "",
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        <View style={styles.truckDataContainer}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.truckContainer}>
                <Text style={styles.truckText}>Truck No: {item.truckNo}</Text>
                <Text style={styles.truckText}>Truck Name: {item.truckName}</Text>
                <Text style={styles.truckText}>Driver Name: {item.driverName}</Text>
                <Text style={styles.truckText}>Phone Number: {item.phoneNumber}</Text>
                <Text style={styles.truckText}>Type: {item.type}</Text>
                <Text style={styles.truckText}>Description: {item.description}</Text>
              </View>
            )}
          />
        </View>
      )}

      {!modalVisible && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={toggleFloatingButton}
        >
          <Text style={{ color: "#fff", fontSize: 28 }}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
  },
  truckDataContainer: {
    flex: 1,
  },
  truckContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "90%",
    left: 10,
    padding: 12,
  },
  truckText: {
    fontSize: 16,
    marginBottom: 5,
  },
  floatingButton: {
    backgroundColor: "blue",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    height: 45,
    borderColor: "gray",
    borderWidth: 2,
    marginRight: 15,
    paddingLeft: 20,
    borderRadius: 5,
    marginBottom: 10,
    bottom: 18,
    width: "100%",
    paddingHorizontal: 15,
  },
  modalBox: {
    backgroundColor: "blue",
    width: "80%",
    padding: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  formInput: {
    width: "100%",
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "blue",
    justifyContent: "space-between",
  },
});

export default SearchItems;
