import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Input from "../../components/input/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reqLogin } from "../../features/authentication/reqLogin";
import { reqToken } from "../../features/refreshtoken/reqToken";
import { Spinner, useToast } from "@chakra-ui/react";
import { BsFillEyeFill, BsFillEyeSlashFill, BsArrowLeft } from "react-icons/bs";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);

  useQuery({
    queryKey: ["reqToken"],
    queryFn: reqToken,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: "reqLogin",
    mutationFn: reqLogin,
    onSuccess: () => {
      navigate("/dashboard");
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await mutate(values);
    },
  });

  return (
    <div className="fixed flex min-h-screen w-full items-center justify-center bg-slate-100">
      <div>
        <p className="py-5 text-center text-3xl">Masuk</p>
        <div className="h-auto w-[360px] rounded-md bg-slate-300 md:w-[420px]">
          <form onSubmit={formik.handleSubmit}>
            <div className="px-5 py-7">
              <Input
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                type="email"
                required
                placeholder="example@gmail.com"
              />
              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type={eye ? "text" : "password"}
                  placeholder="password"
                  required
                />
                {eye ? (
                  <BsFillEyeFill
                    onClick={() => setEye(!eye)}
                    className="absolute right-3 top-[50px] cursor-pointer"
                  />
                ) : (
                  <BsFillEyeSlashFill
                    onClick={() => setEye(!eye)}
                    className="absolute right-3 top-[50px] cursor-pointer"
                  />
                )}
              </div>
              <button
                type="submit"
                className="mt-4 inline-block w-full rounded-lg bg-blue-500 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 hover:shadow-md focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <span className="mr-2 inline-block">
                  {isLoading ? <Spinner /> : "Login"}
                </span>
              </button>
              <div className="flex cursor-pointer items-center space-x-2 pt-4 text-xl font-light">
                <BsArrowLeft />
                <Link to="/daftar">Daftar</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
