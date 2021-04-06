import { useState } from "react";
export default function useInput() {
  const [data, setData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: ""
  });
  const [errors, setErrors] = useState({
    passwordMissmatch: false,
    passwordLength: false
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });

    if ((name === "password") | (name === "confirmPassword")) {
      if (name === "password") {
        setErrors({
          passwordLength: value.length < 6,
          passwordMissmatch: !(data.confirmPassword === value)
        });
      }
      if (name === "confirmPassword") {
        setErrors({ ...errors, passwordMissmatch: !(data.password === value) });
      }
    }
  }
  return [data, handleChange, errors];
}
