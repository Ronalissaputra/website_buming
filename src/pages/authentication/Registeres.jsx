import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { reqRegister } from "../../features/authentication/reqRegister";
import { useNavigate } from "react-router-dom";
import { Spinner, useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import { BsFillEyeFill, BsFillEyeSlashFill, BsArrowLeft } from "react-icons/bs";

const Registeres = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationKey: "reqRegister",
    mutationFn: reqRegister,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Register success",
        status: "success",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `${error.response.data.message}`,
        status: "error",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const registerSchema = Yup.object().shape({
    nama: Yup.string().min(3).required("Nama harus diisi"),
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email harus diisi"),
    password: Yup.string()
      .required("Password harus diisi")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Password harus terdiri dari minimal 8 karakter dan mengandung setidaknya satu huruf dan satu angka"
      ),
    confPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Konfirmasi password harus sesuai dengan password"
      )
      .required("Konfirmasi password harus diisi"),
  });

  const formik = useFormik({
    initialValues: {
      nama: "",
      email: "",
      password: "",
      confPassword: "",
      role: "admin",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100">
      <div>
        <p className="py-5 text-center text-3xl">Daftar</p>
        <div className="h-auto w-[360px] rounded-md bg-slate-300 md:w-[420px]">
          <form onSubmit={formik.handleSubmit}>
            <div className="px-5 py-7">
              <Input
                label="Username"
                name="nama"
                value={formik.values.nama}
                onChange={formik.handleChange}
                type="text"
                placeholder="username"
              />
              {formik.touched.nama && formik.errors.nama && (
                <div className="text-red-500">{formik.errors.nama}</div>
              )}
              <Input
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                type="text"
                placeholder="example@gmail.com"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type={eye1 ? "text" : "password"}
                  placeholder="password"
                />
                {eye1 ? (
                  <BsFillEyeFill
                    onClick={() => setEye1(!eye1)}
                    className="absolute right-3 top-[50px] cursor-pointer"
                  />
                ) : (
                  <BsFillEyeSlashFill
                    onClick={() => setEye1(!eye1)}
                    className="absolute right-3 top-[50px] cursor-pointer"
                  />
                )}
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
              <div className="relative">
                <Input
                  label="Confirmasi password"
                  name="confPassword"
                  value={formik.values.confPassword}
                  onChange={formik.handleChange}
                  type={eye2 ? "text" : "password"}
                  placeholder="confirmasi password"
                />
                {eye2 ? (
                  <BsFillEyeFill
                    onClick={() => setEye2(!eye2)}
                    className="absolute right-3 top-[50px] cursor-pointer"
                  />
                ) : (
                  <BsFillEyeSlashFill
                    onClick={() => setEye2(!eye2)}
                    className="absolute right-3 top-[50px] cursor-pointer"
                  />
                )}
              </div>
              {formik.touched.confPassword && formik.errors.confPassword && (
                <div className="text-red-500">{formik.errors.confPassword}</div>
              )}
              <button
                type="submit"
                className="mt-4 inline-block w-full rounded-lg bg-blue-500 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 hover:shadow-md focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <span className="mr-2 inline-block">
                  {isLoading ? <Spinner /> : "Register"}
                </span>
              </button>
              <div className="flex cursor-pointer items-center space-x-3 pt-4 text-xl font-light">
                <BsArrowLeft />
                <Link to="/masuk">Masuk</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registeres;
