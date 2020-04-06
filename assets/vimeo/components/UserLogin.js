import React, { useState } from "react";
import { Box, Button } from "rebass";
import { Label, Input } from "@rebass/forms";

import { login } from "../api/user";

const UserLogin = ({ onLogin }) => {
  const initialValues = {
    email: "",
    password: ""
  };

  const [formData, changeFormData] = useState(initialValues);
  const [isSubmitting, setSubmitting] = useState(false);


  const [errorMessage, setErrorMessage] = useState(null);

  const updateFormData = (name, value) => {
    changeFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    setSubmitting(true);

    login(email, password)
      .then((userData) => {
        setSubmitting(false);
        onLogin(userData);
      })
      .catch(error => {
        setSubmitting(false);
        setErrorMessage(error);
      });
  };

  return (
    <Box
      as="form"
      py={3}
      onSubmit={handleSubmit}
      minWidth="300px"
      maxWidth="100%"
    >
      {errorMessage && <Box>{errorMessage}</Box>}
      <Box mb={3}>
        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => updateFormData("email", e.target.value)}
        />
      </Box>
      <Box mb={3}>
        <Label htmlFor="password">Password:</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={e => updateFormData("password", e.target.value)}
        />
      </Box>
      <Button
        as="input"
        type="submit"
        value={isSubmitting ? "Please wait..." : "Login"}
        disabled={isSubmitting}
        variant="primary"
        width="100%"
      />
    </Box>
  );
};

export default UserLogin;
