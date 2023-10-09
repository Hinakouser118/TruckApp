import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoginScreen from "./LoginScreen.test";

describe("LoginScreen Component", () => {
  test("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("LOGIN");

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  test("allows entering email and password", () => {
    const { getByPlaceholderText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(emailInput, "user@example.com");
    fireEvent.changeText(passwordInput, "password");

    expect(emailInput.props.value).toBe("user@example.com");
    expect(passwordInput.props.value).toBe("password");
  });

  test("handles login with valid credentials", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("LOGIN");

    fireEvent.changeText(emailInput, "user@example.com");
    fireEvent.changeText(passwordInput, "password");
    fireEvent.press(loginButton);

    // You may want to check if navigation.navigate is called correctly here
  });

  test("handles login with invalid credentials", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("LOGIN");

    fireEvent.changeText(emailInput, "invalid@example.com");
    fireEvent.changeText(passwordInput, "invalidpassword");
    fireEvent.press(loginButton);

    // You can check if an error message is displayed
    expect(queryByText("Invalid email or password. Please try again.")).toBeTruthy();
  });
});
