import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { AuthContext } from '../AuthContext';
import COLORS from '../config/COLORS';
import SPACING from '../config/SPACING';

const SignUpScreen = ({ navigation }) => {
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      Alert.alert('Invalid input', 'Please enter all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Invalid input', 'Passwords do not match');
      return;
    }

    try {
      await signup(email, password, firstName, lastName);
      Alert.alert('Sign Up Successful', 'You can now login with your credentials');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Travel with Itinera</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={setFirstName}
        value={firstName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={setLastName}
        value={lastName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING * 2,
  },
  banner: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING,
    paddingHorizontal: SPACING * 2,
    borderRadius: SPACING * 1.5,
    marginBottom: SPACING * 2,
    width: '100%',
    alignItems: 'center',
  },
  bannerText: {
    color: COLORS.white,
    fontSize: SPACING * 2,
    fontWeight: 'bold',
    fontFamily: 'Roboto', // Consistent font family
  },
  input: {
    width: '100%',
    height: SPACING * 5,
    borderColor: COLORS.primary,
    borderWidth: 1.5,
    borderRadius: SPACING * 1.5,
    paddingLeft: SPACING,
    marginBottom: SPACING * 2,
    fontSize: SPACING * 1.8,
    fontFamily: 'Roboto', // Consistent font family
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING * 1.8,
    paddingHorizontal: SPACING * 3,
    borderRadius: SPACING * 1.5,
    width: '100%',
    alignItems: 'center',
    marginTop: SPACING * 2,
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SPACING * 2.2,
    fontWeight: 'bold',
    fontFamily: 'Roboto', // Consistent font family
  },
  link: {
    color: COLORS.primary,
    marginTop: SPACING * 2,
    textDecorationLine: 'underline',
    fontSize: SPACING * 1.8,
    fontFamily: 'Roboto', // Consistent font family
  },
});

export default SignUpScreen;
