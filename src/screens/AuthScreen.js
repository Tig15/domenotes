import React from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../assets/Colors";
import { createUser, loginUser } from "../services/firebaseAuth";

const windowWidth = Dimensions.get("window").width;

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const AuthScreen = () => {
  const navigation = useNavigation();

  const handleLogin = async (values) => {
    try {
      await loginUser(values.email, values.password); 
      navigation.reset({
        index: 0,
        routes: [{ name: 'Todo' }],
      });
    } catch (error) {
      console.error('Sign-in error:', error.message);
    }
  };

  const handleSignUp = async (values) => {
    try {
      await createUser(values.email, values.password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Todo' }],
      });
    } catch (error) {
      console.error('Sign-up error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {/* <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
 
  input: {
    width: windowWidth * 0.75,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: Colors.text,
  },
  error: {
    fontSize: 12,
    color: Colors.button,
    marginBottom: 5,
  },
  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.button,
    borderRadius: 8,
    padding: 10,
    marginTop:8
  },
  buttonText: {
    color: Colors.background,
    fontSize:15,
    textTransform:'uppercase'
  },
  signupButton: {
    backgroundColor: Colors.secondButton,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    width: windowWidth * 0.75,
    alignItems: 'center',
  },
 
});

export default AuthScreen;
