import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import SPACING from "../config/SPACING";
import COLORS from "../config/COLORS";
import { firestore } from "../config/FireBaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";

const BookingScreen = ({ route, navigation }) => {
  const { tour } = route.params;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [editing, setEditing] = useState(null);
  const [people, setPeople] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(collection(firestore, "bookings"), where("tourId", "==", tour.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
    };

    fetchBookings();
  }, [tour.id]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || (isStartDate ? startDate : endDate);
    setShow(false);
    if (isStartDate) {
      setStartDate(currentDate);
    } else {
      setEndDate(currentDate);
    }
  };

  const showMode = (currentMode, startDate) => {
    setShow(true);
    setMode(currentMode);
    setIsStartDate(startDate);
  };

  const showDatepicker = (startDate) => {
    showMode("date", startDate);
  };

  const handleBooking = async () => {
    const newBooking = {
      tourId: tour.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      people,
    };

    if (editing) {
      const bookingDoc = doc(firestore, "bookings", editing.id);
      await updateDoc(bookingDoc, newBooking);
      setBookings(bookings.map(b => (b.id === editing.id ? { ...b, ...newBooking } : b)));
      setEditing(null);
    } else {
      const docRef = await addDoc(collection(firestore, "bookings"), newBooking);
      setBookings([...bookings, { id: docRef.id, ...newBooking }]);
    }

    setStartDate(new Date());
    setEndDate(new Date());
    setPeople(1);
    alert(`Booking ${editing ? "updated" : "added"} successfully.`);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Booking",
      "Are you sure you want to delete this booking?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const bookingDoc = doc(firestore, "bookings", id);
            await deleteDoc(bookingDoc);
            setBookings(bookings.filter(b => b.id !== id));
            alert("Booking deleted successfully.");
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleEdit = (booking) => {
    setStartDate(new Date(booking.startDate));
    setEndDate(new Date(booking.endDate));
    setPeople(booking.people);
    setEditing(booking);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Fill in your details</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{tour.title}</Text>
          <Text style={styles.price}>{tour.price} /person</Text>
          <Text style={styles.label}>Select Start Date:</Text>
          <TouchableOpacity onPress={() => showDatepicker(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>{startDate.toDateString()}</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Select End Date:</Text>
          <TouchableOpacity onPress={() => showDatepicker(false)} style={styles.dateButton}>
            <Text style={styles.dateText}>{endDate.toDateString()}</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Select Number of People:</Text>
          <Picker
            selectedValue={people}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setPeople(itemValue)}
          >
            {[...Array(20).keys()].map(i => (
              <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
            ))}
          </Picker>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={isStartDate ? startDate : endDate}
              mode={mode}
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>{editing ? "Update Booking" : "Add Booking"}</Text>
        </TouchableOpacity>

        <FlatList
          data={bookings}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookingItem}>
              <Text style={styles.bookingDate}>{`${new Date(item.startDate).toDateString()} - ${new Date(item.endDate).toDateString()}`}</Text>
              <Text style={styles.bookingPeople}>People: {item.people}</Text>
              <View style={styles.bookingActions}>
                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
                  <Ionicons name="pencil" size={SPACING * 2} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
                  <Ionicons name="trash" size={SPACING * 2} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING * 2,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING * 2,
  },
  headerText: {
    fontSize: SPACING * 2.8,
    fontWeight: "bold",
    marginLeft: SPACING,
  },
  content: {
    marginBottom: SPACING * 2,
  },
  title: {
    fontSize: SPACING * 2,
    fontWeight: "bold",
    marginBottom: SPACING,
  },
  price: {
    fontSize: SPACING * 2,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: SPACING * 2,
  },
  label: {
    fontSize: SPACING * 2,
    marginBottom: SPACING,
  },
  dateButton: {
    padding: SPACING,
    backgroundColor: COLORS.light,
    borderRadius: SPACING,
    alignItems: "center",
    marginBottom: SPACING * 2,
  },
  dateText: {
    fontSize: SPACING * 2,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: SPACING * 2,
  },
  bookButton: {
    padding: SPACING * 1.5,
    backgroundColor: COLORS.primary,
    borderRadius: SPACING,
    alignItems: "center",
    marginBottom: SPACING * 2,
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: SPACING * 2,
    fontWeight: "bold",
  },
  bookingItem: {
    padding: SPACING,
    backgroundColor: COLORS.light,
    borderRadius: SPACING,
    marginBottom: SPACING * 2,
  },
  bookingDate: {
    fontSize: SPACING * 2,
    fontWeight: "bold",
  },
  bookingPeople: {
    fontSize: SPACING * 2,
  },
  bookingActions: {
    flexDirection: "row",
    marginTop: SPACING,
  },
  actionButton: {
    marginLeft: SPACING,
  },
});
