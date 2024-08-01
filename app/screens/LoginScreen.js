import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { AuthContext } from '../AuthContext';
import COLORS from '../config/COLORS';
import SPACING from '../config/SPACING';

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Invalid input', 'Please enter both username and password');
      return;
    }

    try {
      await login(username, password);
      navigation.navigate('Welcome to Itinera');
    } catch (error) {
      setError(error.message);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover with Itinera</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
    padding: SPACING * 3,
  },
  title: {
    fontSize: SPACING * 4.5,
    fontWeight: '700',
    marginBottom: SPACING * 3,
    color: COLORS.dark,
    textAlign: 'center',
    letterSpacing: 1.5,
    fontFamily: 'Roboto', // Default font provided by Expo
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
    fontFamily: 'Roboto', // Default font provided by Expo
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
    fontWeight: '700',
    fontFamily: 'Roboto', // Default font provided by Expo
  },
  link: {
    color: COLORS.primary,
    marginTop: SPACING * 2,
    textDecorationLine: 'underline',
    fontSize: SPACING * 1.8,
    fontFamily: 'Roboto', // Default font provided by Expo
  },
  error: {
    color: COLORS.error,
    fontSize: SPACING * 1.6,
    marginBottom: SPACING * 2,
    textAlign: 'center',
    fontFamily: 'Roboto', // Default font provided by Expo
  },
});

export default LoginScreen;
