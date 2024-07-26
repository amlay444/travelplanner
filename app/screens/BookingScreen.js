import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
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

const BookingScreen = ({ route, navigation }) => {
  const { tour } = route.params;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [editing, setEditing] = useState(null);

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
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleBooking = async () => {
    const newBooking = {
      tourId: tour.id,
      date: date.toISOString(),
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

    setDate(new Date());
    alert(`Booking ${editing ? "updated" : "added"} successfully.`);
  };

  const handleDelete = async (id) => {
    const bookingDoc = doc(firestore, "bookings", id);
    await deleteDoc(bookingDoc);
    setBookings(bookings.filter(b => b.id !== id));
    alert("Booking deleted successfully.");
  };

  const handleEdit = (booking) => {
    setDate(new Date(booking.date));
    setEditing(booking);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Select your date</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{tour.title}</Text>
        <Text style={styles.price}>{tour.price} /person</Text>
        <Text style={styles.label}>Select Date:</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
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
            <Text style={styles.bookingDate}>{new Date(item.date).toDateString()}</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING * 2,
  },
  headerText: {
    fontSize: SPACING * 2.5,
    fontWeight: "bold",
    marginLeft: SPACING,
  },
  content: {
    flex: 1,
    justifyContent: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  bookingDate: {
    fontSize: SPACING * 2,
  },
  bookingActions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: SPACING,
  },
});
