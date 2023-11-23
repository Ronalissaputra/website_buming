import React, { useState } from "react";
import {
  Heading,
  Modalcomp,
  Tableibuhamil,
  Input,
  Layout,
} from "../../components";
import { Button, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reqCreateibuhamil } from "../../features/ibuhamil/reqCreateibuhamil";
import { reqUpdateibuhamil } from "../../features/ibuhamil/reqUpdateibuhamil";
import { reqGetibuhamilbyid } from "../../features/ibuhamil/reqGetibuhamilbyid";
const Tambahibuhamil = () => {
  const [id, setId] = useState(null);
  const handleId = async (id) => {
    await setId(id);
    await toggleModal();
  };
  const toast = useToast();
  const queryClient = useQueryClient();
  const [ibuhamilbyid, setIbuhamilbyid] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useQuery({
    queryKey: ["reqGetibuhamilbyid", id],
    queryFn: () => reqGetibuhamilbyid(id),
    onSuccess: (res) => {
      setIbuhamilbyid(res);
    },
  });

  const { mutate: Create } = useMutation({
    mutationKey: ["reqCrateibuhamil"],
    mutationFn: reqCreateibuhamil,
    onSuccess: () => {
      toggleModal();
      toast({
        title: "Success",
        description: "Create success",
        status: "success",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
      queryClient.refetchQueries("reqGetibuhamil");
      formik.resetForm();
    },
  });

  const { mutate: Edit } = useMutation({
    mutationKey: ["reqUpdateibuhamil", id],
    mutationFn: (values) => reqUpdateibuhamil(id, values),
    onSuccess: () => {
      toggleModal();
      toast({
        title: "Success",
        description: "Updated success",
        status: "success",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
      queryClient.refetchQueries("reqGetibuhamil");
      formik.resetForm();
    },
    onerror: () => {
      toggleModal();
      toast({
        title: "Error",
        description: "Updated failed",
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
      nama: ibuhamilbyid?.nama || "",
      umur: ibuhamilbyid?.umur || "",
      lama_nikah: ibuhamilbyid?.lama_nikah || "",
      suku: ibuhamilbyid?.suku || "",
      agama: ibuhamilbyid?.agama || "",
      pendidikan: ibuhamilbyid?.pendidikan || "",
      pekerjaan: ibuhamilbyid?.pekerjaan || "",
      alamat: ibuhamilbyid?.alamat || "",
      nomor_hp: ibuhamilbyid?.nomor_hp || "",
      golongan_darah: ibuhamilbyid?.golongan_darah || "",
      nomor_bpjs: ibuhamilbyid?.nomor_bpjs || "",
      tempat_periksa: ibuhamilbyid?.tempat_periksa || "",
      nama_suami: ibuhamilbyid?.nama_suami || "",
      umur_suami: ibuhamilbyid?.umur_suami || "",
      agama_suami: ibuhamilbyid?.agama_suami || "",
      suku_suami: ibuhamilbyid?.suku_suami || "",
      pendidikan_suami: ibuhamilbyid?.pendidikan_suami || "",
      pekerjaan_suami: ibuhamilbyid?.pekerjaan_suami || "",
      alamat_suami: ibuhamilbyid?.alamat_suami || "",
      nomorhp_suami: ibuhamilbyid?.nomorhp_suami || "",
      hamil_ke: ibuhamilbyid?.hamil_ke || "",
      jumlah_anak: ibuhamilbyid?.jumlah_anak || "",
      siklus: ibuhamilbyid?.siklus || "",
      lama_haid: ibuhamilbyid?.lama_haid || "",
      hptp: ibuhamilbyid?.hptp || "",
      hpl: ibuhamilbyid?.hpl || "",
      email: ibuhamilbyid?.email || "",
      password: ibuhamilbyid?.password || "",
      role: "pasien",
    },
    onSubmit: async (values) => {
      if (id) {
        await Edit(values);
      } else {
        await Create(values);
      }
    },
  });

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Heading>Tabel ibu hamil</Heading>
        <Button onClick={toggleModal} colorScheme="teal">
          Tambah
        </Button>
      </div>
      <Tableibuhamil setId={handleId} />
      {isModalOpen && (
        <Modalcomp
          onClose={toggleModal}
          labelbtn={id ? "Edit" : "Submit"}
          label={id ? "Form Edit Ibuhamil" : "Form Ibuhamil"}
          onSubmit={formik.handleSubmit}
        >
          <div className="grid grid-cols-1 gap-2 rounded-sm pt-2 md:grid-cols-2">
            <div className="rounded-md border-2 p-2">
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
            <div className="rounded-md border-2 p-2">
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
            <div className="rounded-md border-2 p-2">
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
            <div className="rounded-md border-2 p-2">
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
        </Modalcomp>
      )}
    </Layout>
  );
};

export default Tambahibuhamil;
