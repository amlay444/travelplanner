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
      <Text style={styles.title}>Welcome Back</Text>
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
    padding: SPACING * 2,
  },
  title: {
    fontSize: SPACING * 4,
    fontWeight: 'bold',
    marginBottom: SPACING * 2,
    color: COLORS.dark,
  },
  input: {
    width: '100%',
    height: SPACING * 4.5,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: SPACING,
    paddingLeft: SPACING,
    marginBottom: SPACING,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING * 1.5,
    paddingHorizontal: SPACING * 2,
    borderRadius: SPACING,
    width: '100%',
    alignItems: 'center',
    marginTop: SPACING,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SPACING * 2,
    fontWeight: 'bold',
  },
  link: {
    color: COLORS.primary,
    marginTop: SPACING,
    textDecorationLine: 'underline',
  },
  error: {
    color: COLORS.error,
    fontSize: SPACING * 1.5,
    marginBottom: SPACING,
    textAlign: 'center',
  },
});

export default LoginScreen;