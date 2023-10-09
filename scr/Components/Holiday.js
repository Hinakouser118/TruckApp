import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const Holidays = () => {
  const years = [2023, 2024, 2025];
  const allEvents = [];

  const getSundaysForYears = (years) => {
    const sundays = [];

    years.forEach((year) => {
      const date = new Date(year, 0, 1);

      while (date.getFullYear() === year) {
        if (date.getDay() === 0) {
          sundays.push({ name: "Sunday", date: date.toDateString() });
        }
        date.setDate(date.getDate() + 1);
      }
    });

    return sundays;
  };

  // Add holidays for each year
  years.forEach((year) => {
    const holidays = [
      { name: "New Year", date: "January 1, " + year, day: "Sunday" },
      { name: "Valentine's Day", date: "February 14, " + year, day: "Tuesday" },
      {
        name: "International Women's Day",
        date: "March 8, " + year,
        day: "Wednesday",
      },
      { name: "Easter Sunday", date: "April 9, " + year, day: "Sunday" },
      { name: "Labor Day", date: "May 1, " + year, day: "Monday" },
      {
        name: "Thanksgiving Day",
        date: "November 23, " + year,
        day: "Thursday",
      },
      { name: "Christmas", date: "December 25, " + year, day: "Monday" },
      // Add more holidays as needed for each year
    ];

    allEvents.push({ year, events: holidays });
  });

  const sundays = getSundaysForYears(years);
  allEvents.push({ year: "Sundays", events: sundays });

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.eventYear}>{item.year}</Text>
      {item.events.map((event, index) => (
        <View key={index}>
          <Text style={styles.eventName}>{event.name}</Text>
          {event.day && event.name !== "Sunday" && (
            <Text style={styles.eventDate}>
              {event.date} ({event.day})
            </Text>
          )}
          {!event.day && <Text style={styles.eventDate}>{event.date}</Text>}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Yearly Events and Holidays</Text>
      <FlatList
        data={allEvents}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  eventYear: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: 16,
  },
});

export default Holidays;
