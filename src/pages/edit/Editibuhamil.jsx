/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useToast, Spinner } from "@chakra-ui/react";
import { Heading, Input, Button, Layout } from "../../components";
import { reqGetibuhamilbyid } from "../../features/ibuhamil/reqGetibuhamilbyid";
import { reqUpdateibuhamil } from "../../features/ibuhamil/reqUpdateibuhamil";

const Editibuhamil = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [data, setData] = useState("");
  const toast = useToast();

  useQuery({
    queryKey: ["reqGetibuhamilbyid", uuid],
    queryFn: () => reqGetibuhamilbyid(uuid),
    onSuccess: (res) => {
      setData(res);
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["reqUpdateibuhamil", uuid],
    mutationFn: (values) => reqUpdateibuhamil(uuid, values),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Updated success",
        status: "success",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
      navigate("/tambah/ibuhamil");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Updated failed",
        status: "error",
        position: "bottom-right",
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
      lama_nikah: data?.lama_nikah || "",
      suku: data?.suku || "",
      agama: data?.agama || "",
      pendidikan: data?.pendidikan || "",
      pekerjaan: data?.pekerjaan || "",
      alamat: data?.alamat || "",
      nomor_hp: data?.nomor_hp || "",
      golongan_darah: data?.golongan_darah || "",
      nomor_bpjs: data?.nomor_bpjs || "",
      tempat_periksa: data?.tempat_periksa || "",
      nama_suami: data?.nama_suami || "",
      umur_suami: data?.umur_suami || "",
      agama_suami: data?.agama_suami || "",
      suku_suami: data?.suku_suami || "",
      pendidikan_suami: data?.pendidikan_suami || "",
      pekerjaan_suami: data?.pekerjaan_suami || "",
      alamat_suami: data?.alamat_suami || "",
      nomorhp_suami: data?.nomorhp_suami || "",
      hamil_ke: data?.hamil_ke || "",
      jumlah_anak: data?.jumlah_anak || "",
      siklus: data?.siklus || "",
      lama_haid: data?.lama_haid || "",
      hptp: data?.hptp || "",
      hpl: data?.hpl || "",
      email: data?.email || "",
      password: data?.password || "",
      role: "pasien",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Layout>
      <Heading>Edit data Ibuhamil</Heading>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-5 rounded-sm border-t-2 border-red-500 pt-2 md:grid-cols-2">
          <div className="rounded-md border-2 p-4">
            <p className="text-2xl">Input data Ibu hamil</p>
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
                type="number"
              />
              <Input
                name="lama_nikah"
                value={formik.values.lama_nikah}
                onChange={formik.handleChange}
                label="lama nikah"
                placeholder="lama nikah"
                type="text"
              />
              <Input
                name="suku"
                value={formik.values.suku}
                onChange={formik.handleChange}
                label="suku"
                placeholder="suku"
                type="text"
              />
              <Input
                name="agama"
                value={formik.values.agama}
                onChange={formik.handleChange}
                label="agama"
                placeholder="agama"
                type="text"
              />
              <Input
                name="pendidikan"
                value={formik.values.pendidikan}
                onChange={formik.handleChange}
                label="pendidikan"
                placeholder="pendidikan"
                type="text"
              />
              <Input
                name="pekerjaan"
                value={formik.values.pekerjaan}
                onChange={formik.handleChange}
                label="pekerjaan"
                placeholder="pekerjaan"
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
              <Input
                name="nomor_hp"
                value={formik.values.nomor_hp}
                onChange={formik.handleChange}
                label="nomor hp"
                placeholder="nomor hp"
                type="text"
              />
              <Input
                name="golongan_darah"
                value={formik.values.golongan_darah}
                onChange={formik.handleChange}
                label="golongan darah"
                placeholder="golongan darah"
                type="text"
              />
              <Input
                name="nomor_bpjs"
                value={formik.values.nomor_bpjs}
                onChange={formik.handleChange}
                label="nomor bpjs"
                placeholder="nomor bpjs"
                type="text"
              />
              <Input
                name="tempat_periksa"
                value={formik.values.tempat_periksa}
                onChange={formik.handleChange}
                label="tempat periksa"
                placeholder="tempat periksa"
                type="text"
              />
            </div>
          </div>
          <div className="rounded-md border-2 p-4">
            <p className="text-2xl">Input data Suami</p>
            <div>
              <Input
                name="nama_suami"
                value={formik.values.nama_suami}
                onChange={formik.handleChange}
                label="nama suami"
                placeholder="nama suami"
                type="text"
              />
              <Input
                name="umur_suami"
                value={formik.values.umur_suami}
                onChange={formik.handleChange}
                label="umur suami"
                placeholder="umur suami"
                type="text"
              />
              <Input
                name="agama_suami"
                value={formik.values.agama_suami}
                onChange={formik.handleChange}
                label="agama suami"
                placeholder="agama suami"
                type="text"
              />
              <Input
                name="suku_suami"
                value={formik.values.suku_suami}
                onChange={formik.handleChange}
                label="suku suami"
                placeholder="suku suami"
                type="text"
              />
              <Input
                name="pendidikan_suami"
                value={formik.values.pendidikan_suami}
                onChange={formik.handleChange}
                label="pendidikan suami"
                placeholder="pendidikan suami"
                type="text"
              />
              <Input
                name="pekerjaan_suami"
                value={formik.values.pekerjaan_suami}
                onChange={formik.handleChange}
                label="pekerjaan suami"
                placeholder="pekerjaan suami"
                type="text"
              />
              <Input
                name="alamat_suami"
                value={formik.values.alamat_suami}
                onChange={formik.handleChange}
                label="alamat suami"
                placeholder="alamat suami"
                type="text"
              />
              <Input
                name="nomorhp_suami"
                value={formik.values.nomorhp_suami}
                onChange={formik.handleChange}
                label="nomorhp suami"
                placeholder="nomorhp suami"
                type="text"
              />
            </div>
          </div>
          <div className="rounded-md border-2 p-4">
            <p className="text-2xl">Identitas Reproduksi</p>
            <div>
              <Input
                name="hamil_ke"
                label="hamil ke"
                value={formik.values.hamil_ke}
                onChange={formik.handleChange}
                placeholder="hamil ke"
                type="text"
              />
              <Input
                name="jumlah_anak"
                label="jumlah anak"
                value={formik.values.jumlah_anak}
                onChange={formik.handleChange}
                placeholder="jumlah anak"
                type="text"
              />
              <div className="mt-2 rounded-md border-2 p-2">
                <p>Riwayat Menstruasi</p>
                <Input
                  name="siklus"
                  label="siklus"
                  value={formik.values.siklus}
                  onChange={formik.handleChange}
                  placeholder="siklus"
                  type="text"
                />
                <Input
                  name="lama_haid"
                  label="lama haid"
                  value={formik.values.lama_haid}
                  onChange={formik.handleChange}
                  placeholder="lama haid"
                  type="text"
                />
                <Input
                  name="hptp"
                  label="hptp"
                  value={formik.values.hptp}
                  onChange={formik.handleChange}
                  placeholder="text"
                  type="date"
                />
                <Input
                  name="hpl"
                  label="Hpl"
                  value={formik.values.hpl}
                  onChange={formik.handleChange}
                  placeholder="hpl"
                  type="date"
                />
              </div>
            </div>
          </div>
          <div className="rounded-md border-2 p-4">
            <p className="text-2xl">Register</p>
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

export default Editibuhamil;
