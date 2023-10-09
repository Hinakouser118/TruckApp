import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  ScrollView,
} from "react-native";

const SearchItems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Define a static list of vehicles
  const staticVehicles = [
    {
      id: "1",
      name: "Vehicle 1",
      cargoType: "Cargo A",
      isLoaded: true,
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcD3rAJbGCGdrDGGzX1jhYd7YlLLLZtJ0bWQ&usqp=CAU",  // Replace with actual image URLs
    },
    {
      id: "2",
      name: "Vehicle 2",
      cargoType: "Cargo B",
      isLoaded: false,
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkYMu6DSIOdZquRzA2Iv79U_Z3pGsZ3hCblg&usqp=CAU",
    },
    {
      id: "3",
      name: "Vehicle 3",
      cargoType: "Cargo A",
      isLoaded: true,
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ03S8EY9cByjQNjZzyX0AGyD-RlRHZfrWBag&usqp=CAU",
    },
    {
      id: "4",
      name: "Vehicle 4",
      cargoType: "Cargo C",
      isLoaded: false,
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgz8MjJF36ajxzGtbzJaO4YCyfVKxukOHG6Q&usqp=CAU",
    },
    {
      id: "5",
      name: "Vehicle 5",
      cargoType: "Cargo B",
      isLoaded: true,
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9P3R7oaQO1_nfaJ5SNk69jKXfPfIYbHiSwQ&usqp=CAU",
    },
    // Add more vehicles as needed
  ];

  const filterData = (query) => {
    const filtered = staticVehicles.filter((vehicle) => {
      const searchQuery = query.toLowerCase();
      return (
        vehicle.id.toLowerCase().includes(searchQuery) ||
        vehicle.name.toLowerCase().includes(searchQuery)
      );
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData(searchQuery);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search by ID or Name..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
<View>
      <Text style={styles.resultHeader}>Static Vehicle Data:</Text>
      <ScrollView horizontal style={styles.vehicleImagesContainer}>
        {staticVehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleImageContainer}>
            <Image source={{ uri: vehicle.image_url }} style={styles.vehicleImage} />
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
          </View>
        ))}
      </ScrollView>
      </View>
      <View style={styles.truckDataContainer}>
        <Text style={styles.resultHeader}>Search Results:</Text>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.truckContainer}>
              <Text style={styles.truckText}>ID: {item.id}</Text>
              <Text style={styles.truckText}>Name: {item.name}</Text>
              <Text style={styles.truckText}>
                Cargo Type: {item.cargoType}
              </Text>
              <Text style={styles.truckText}>
                Load Status: {item.isLoaded ? "Loaded" : "Not Loaded"}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    marginRight: 15,
    paddingLeft: 20,
    borderRadius: 5,
    marginBottom: 10,
    bottom: 20,
    
    width: "100%",
    paddingHorizontal: 15,
  },
  truckDataContainer: {
    flex: 1,
    marginTop: 10,
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
  vehicleImagesContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  vehicleImageContainer: {
    marginRight: 10,
  },
  vehicleImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  vehicleName: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});

export default SearchItems;