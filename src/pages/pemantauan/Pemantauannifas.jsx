import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  Heading,
  Layout,
  Input,
  Select,
  Modalcomp,
  Tablepemantauannifas,
} from "../../components";
import { reqGetibuhamilFc } from "../../features/ibuhamil/reqGetibuhamilFc";
import { reqCreatepemantauannifas } from "../../features/pemantauannifas/reqCreatepemantauannifas";
import { Button } from "@chakra-ui/react";

const Pemantauannifas = () => {
  const [id, setId] = useState(null);
  const handleId = async (id) => {
    await setId(id);
    await toggleModal();
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const [data, setData] = useState();
  const navigate = useNavigate();
  const toast = useToast();

  useQuery({
    queryKey: ["reqGetibuhamilFc"],
    queryFn: reqGetibuhamilFc,
    onSuccess: (res) => {
      setData(res);
    },
  });
  const options =
    data?.response?.map((item) => ({
      value: item.id,
      label: item.nama,
    })) || [];
  const optionsPem = [
    {
      value: "kunjungan 1",
      label: "kunjungan 1",
    },
    {
      value: "kunjungan 2",
      label: "kunjungan 2",
    },
    {
      value: "kunjungan 3",
      label: "kunjungan 3",
    },
    {
      value: "kunjungan 4",
      label: "kunjungan 4",
    },
  ];

  const { mutate } = useMutation({
    mutationKey: ["reqCreatepemantauannifas"],
    mutationFn: reqCreatepemantauannifas,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Create success",
        status: "success",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
      navigate("/pemantauan/nifas");
    },
  });

  const formik = useFormik({
    initialValues: {
      status: "",
      keadaan_umum: "",
      kesadaran: "",
      status_emosional: "",
      tekanan_darah: "",
      suhu_tubuh: "",
      pernafasan: "",
      denyut_nadi: "",
      konjungtiva: "",
      puting_susu: "",
      asi: "",
      tfu: "",
      kontraksi_uterus: "",
      kandung_kemih: "",
      jahitan: "",
      oedema: "",
      hematoma: "",
      warna_lochea: "",
      banyak_lochea: "",
      bau_lochea: "",
      robekan_anus: "",
      hemorid_anus: "",
      varises: "",
      oedema_ekstermitasbawah: "",
      golongan_darah: "",
      hemoglobin: "",
      hematorit: "",
      ibuhamilId: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Heading>Tabel Masa Nifas</Heading>
        <Button onClick={toggleModal} colorScheme="teal">
          Tambah
        </Button>
      </div>
      <Tablepemantauannifas setId={handleId} />
      {isModalOpen && (
        <Modalcomp
          onClose={toggleModal}
          label="Form Pemantauan Masanifas"
          onSubmit={formik.handleSubmit}
        >
          <div className="grid grid-cols-1 gap-5 rounded-sm pt-2 md:grid-cols-2">
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Status Pemeriksaan</p>
              <div>
                <Select
                  name="ibuhamilId"
                  value={formik.values.ibuhamilId}
                  onChange={formik.handleChange}
                  label="nama ibu"
                  placeholder="nama ibu"
                  options={options}
                  pilih="pilih nama ibu"
                />
                <Select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  label="status"
                  placeholder="status"
                  type="text"
                  options={optionsPem}
                  pilih="status pemantauan"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Pemeriksaan secara umum</p>
              <div>
                <Input
                  name="keadaan_umum"
                  value={formik.values.keadaan_umum}
                  onChange={formik.handleChange}
                  label="keadaan umum"
                  placeholder="keadaan umum"
                  type="text"
                />
                <Input
                  name="kesadaran"
                  value={formik.values.kesadaran}
                  onChange={formik.handleChange}
                  label="kesadaran"
                  placeholder="kesadaran"
                  type="text"
                />
                <Input
                  name="status_emosional"
                  value={formik.values.status_emosional}
                  onChange={formik.handleChange}
                  label="status emosional"
                  placeholder="status emosional"
                  type="text"
                />
                <div className="mt-2 rounded-md border-2 p-2">
                  <p className="text-2xl">Tanda tanda vita</p>
                  <Input
                    name="tekanan_darah"
                    value={formik.values.tekanan_darah}
                    onChange={formik.handleChange}
                    label="tekanan darah"
                    placeholder="tekanan darah"
                    type="text"
                  />
                  <Input
                    name="suhu_tubuh"
                    value={formik.values.suhu_tubuh}
                    onChange={formik.handleChange}
                    label="suhu tubuh"
                    placeholder="suhu tubuh"
                    type="text"
                  />
                  <Input
                    name="pernafasan"
                    value={formik.values.pernafasan}
                    onChange={formik.handleChange}
                    label="pernafasan"
                    placeholder="pernafasan"
                    type="text"
                  />
                  <Input
                    name="denyut_nadi"
                    value={formik.values.denyut_nadi}
                    onChange={formik.handleChange}
                    label="denyut nadi"
                    placeholder="denyut nadi"
                    type="text"
                  />
                </div>
                <Input
                  name="konjungtiva"
                  value={formik.values.konjungtiva}
                  onChange={formik.handleChange}
                  label="konjungtiva"
                  placeholder="konjungtiva"
                  type="text"
                />
                <div className="mt-2 rounded-md border-2 p-2">
                  <p className="text-2xl">Mammae</p>
                  <Input
                    name="puting_susu"
                    value={formik.values.puting_susu}
                    onChange={formik.handleChange}
                    label="puting susu"
                    placeholder="puting susu"
                    type="text"
                  />
                  <Input
                    name="asi"
                    value={formik.values.asi}
                    onChange={formik.handleChange}
                    label="asi"
                    placeholder="asi"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Abdomen</p>
              <div>
                <Input
                  name="tfu"
                  value={formik.values.tfu}
                  onChange={formik.handleChange}
                  label="tfu"
                  placeholder="tfu"
                  type="text"
                />
                <Input
                  name="kontraksi_uterus"
                  value={formik.values.kontraksi_uterus}
                  onChange={formik.handleChange}
                  label="kontraksi uterus"
                  placeholder="kontraksi uterus"
                  type="text"
                />
                <Input
                  name="kandung_kemih"
                  value={formik.values.kandung_kemih}
                  onChange={formik.handleChange}
                  label="kandung kemih"
                  placeholder="kandung kemih"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Genetalia</p>
              <div>
                <div className="mt-2 rounded-md border-2 p-2">
                  <p className="text-2xl">Perineum</p>
                  <Input
                    name="jahitan"
                    value={formik.values.jahitan}
                    onChange={formik.handleChange}
                    label="jahitan"
                    placeholder="jahitan"
                    type="text"
                  />
                  <Input
                    name="oedema"
                    value={formik.values.oedema}
                    onChange={formik.handleChange}
                    label="oedema"
                    placeholder="oedema"
                    type="text"
                  />
                  <Input
                    name="hematoma"
                    value={formik.values.hematoma}
                    onChange={formik.handleChange}
                    label="oedema"
                    placeholder="oedema"
                    type="text"
                  />
                </div>
                <div className="mt-2 rounded-md border-2 p-2">
                  <p className="text-2xl">Lochea</p>
                  <Input
                    name="warna_lochea"
                    value={formik.values.warna_lochea}
                    onChange={formik.handleChange}
                    label="warna lochea"
                    placeholder="warna lochea"
                    type="text"
                  />
                  <Input
                    name="banyak_lochea"
                    value={formik.values.banyak_lochea}
                    onChange={formik.handleChange}
                    label="banyak lochea"
                    placeholder="banyak lochea"
                    type="text"
                  />
                  <Input
                    name="bau_lochea"
                    value={formik.values.bau_lochea}
                    onChange={formik.handleChange}
                    label="bau lochea"
                    placeholder="bau lochea"
                    type="text"
                  />
                </div>
                <div className="mt-2 rounded-md border-2 p-2">
                  <p className="text-2xl">Anus</p>
                  <Input
                    name="robekan_anus"
                    value={formik.values.robekan_anus}
                    onChange={formik.handleChange}
                    label="robekan anus"
                    placeholder="robekan anus"
                    type="text"
                  />
                  <Input
                    name="hemorid_anus"
                    value={formik.values.hemorid_anus}
                    onChange={formik.handleChange}
                    label="hemorid anus"
                    placeholder="hemorid anus"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Ekstermitas bawah</p>
              <div>
                <Input
                  name="varises"
                  value={formik.values.varises}
                  onChange={formik.handleChange}
                  label="varises"
                  placeholder="varises"
                  type="text"
                />
                <Input
                  name="oedema_ekstermitasbawah"
                  value={formik.values.oedema_ekstermitasbawah}
                  onChange={formik.handleChange}
                  label="oedema ekstermitas bawah"
                  placeholder="oedema ekstermitas bawah"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Pemeriksaan laboratorium</p>
              <div>
                <Input
                  name="golongan_darah"
                  value={formik.values.golongan_darah}
                  onChange={formik.handleChange}
                  label="golongan darah"
                  placeholder="golongan darah"
                  type="text"
                />
                <Input
                  name="hemoglobin"
                  value={formik.values.hemoglobin}
                  onChange={formik.handleChange}
                  label="hemoglobin"
                  placeholder="hemoglobin"
                  type="text"
                />
                <Input
                  name="hematorit"
                  value={formik.values.hematorit}
                  onChange={formik.handleChange}
                  label="hemotorit"
                  placeholder="hemotorit"
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

export default Pemantauannifas;
