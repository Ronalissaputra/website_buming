import React from "react";
import { Formik } from "formik";
import Register from "./Register";
import { Heading, Input, Button } from "../../components";

const Registersuperadmin = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confpassword: "",
  };
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };
  return (
    <Register>
      <Heading>Register Superadmin</Heading>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, values, handleChange }) => (
          <form onSubmit={handleSubmit}>
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
            <Input
              name="confpassword"
              label="confpassword"
              onChange={handleChange}
              value={values.confpassword}
              placeholder="confpassword"
              type="text"
            />
            <Button type="submit">Register</Button>
          </form>
        )}
      </Formik>
    </Register>
  );
};

export default Registersuperadmin;
