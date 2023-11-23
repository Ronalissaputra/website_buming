import React, { useState } from "react";
import { Layout, Input, Button } from "../../components";
import Heading from "../../components/heading/Heading";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reqGetadminbyid } from "../../features/admin/reqGetadminbyid";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { reqUpdateadmin } from "../../features/admin/reqUpdateadmin";
import { Spinner, useToast } from "@chakra-ui/react";

const Formprofile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [data, setData] = useState("");

  useQuery({
    queryKey: ["reqGetadminbyid"],
    queryFn: () => reqGetadminbyid(id),
    onSuccess: (res) => {
      setData(res);
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["reqUpdateadmin", id],
    mutationFn: (values) => reqUpdateadmin(id, values),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Updated success",
        status: "success",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
      navigate("/dashboard");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Updated Failed",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nama: data?.nama || "",
      umur: data?.umur || "",
      prodi: data?.prodi || "",
      semester: data?.semester || "",
      nomor_hp: data?.nomor_hp || "",
      alamat: data?.alamat || "",
      email: data?.email || "",
      password: data?.password || "",
    },
    onSubmit: (values) => {
      mutate(values);
      console.log(values);
    },
  });

  return (
    <Layout>
      <Heading>Form biodata</Heading>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-5 rounded-sm border-t-2 border-red-500 pt-2 md:grid-cols-2">
          <div className="rounded-md border-2 p-4">
            <p className="text-2xl">Input biodata</p>
            <div>
              <Input
                name="nama"
                value={formik.values.nama}
                onChange={formik.handleChange}
                label="nama"
                placeholder="nama"
              />
              <Input
                name="umur"
                value={formik.values.umur}
                onChange={formik.handleChange}
                label="umur"
                placeholder="umur"
                type="umur"
              />
              <Input
                name="prodi"
                value={formik.values.prodi}
                onChange={formik.handleChange}
                label="prodi"
                placeholder="prodi"
                type="text"
              />
              <Input
                name="semester"
                value={formik.values.semester}
                onChange={formik.handleChange}
                label="semester"
                placeholder="semester"
                type="text"
              />
              <Input
                name="nomor_hp"
                value={formik.values.nomor_hp}
                onChange={formik.handleChange}
                label="nomor hp"
                placeholder="nomor hp"
                type="text"
              />
              <Input
                name="alamat"
                value={formik.values.alamat}
                onChange={formik.handleChange}
                label="alamat"
                placeholder="alamat"
                type="text"
              />
            </div>
          </div>
          <div className="rounded-md border-2 p-4">
            <p className="text-2xl">Input Akun</p>
            <div>
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                label="email"
                placeholder="email"
                type="text"
              />
              <Input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                label="password"
                placeholder="password"
                type="text"
              />
            </div>
          </div>
        </div>
        <Button type="submit">{isLoading ? <Spinner /> : "Update"}</Button>
      </form>
    </Layout>
  );
};

export default Formprofile;
