import React from "react";
import { Formik } from "formik";
import Register from "./Register";
import { Heading, Input, Button, Select } from "../../components";

const Registeribuhamil = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };
  return (
    <Register>
      <Heading>Register Ibu hamil</Heading>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, values, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Select label="Pilih ibu hamil" />
            <Input
              name="username"
              label="username"
              onChange={handleChange}
              value={values.username}
              placeholder="username"
            />
            <Input
              name="email"
              label="email"
              onChange={handleChange}
              value={values.email}
              placeholder="example@gmail.com"
              type="email"
            />
            <Input
              name="password"
              label="password"
              onChange={handleChange}
              value={values.password}
              placeholder="password"
              type="text"
            />
            <Button type="submit">Register</Button>
          </form>
        )}
      </Formik>
    </Register>
  );
};

export default Registeribuhamil;
