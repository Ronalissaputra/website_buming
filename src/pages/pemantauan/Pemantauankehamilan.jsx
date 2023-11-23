import React, { useState } from "react";
import {
  Heading,
  Input,
  Select,
  Layout,
  Modalcomp,
  Tablepemantauankehamilan,
} from "../../components";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { reqGetibuhamilFc } from "../../features/ibuhamil/reqGetibuhamilFc";
import { reqCreatepemantauankehamilan } from "../../features/pemantauankehamilan/reqCreatepemantauankehamilan";
import { reqGetpemantauankehamilanbyid } from "../../features/pemantauankehamilan/reqGetpemantauankehamilanbyid";
import { reqUpdatepemantauankehamilan } from "../../features/pemantauankehamilan/reqUpdatepemantauankehamilan";

const Pemantauankehamilan = () => {
  const [id, setId] = useState(null);
  const handleId = async (id) => {
    await setId(id);
    await toggleModal();
  };
  const [kehamilanbyid, setKehamilanbyid] = useState("");
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState();
  const toast = useToast();
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

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
    {
      value: "kunjungan 5",
      label: "kunjungan 5",
    },
    {
      value: "kunjungan 6",
      label: "kunjungan 6",
    },
  ];

  useQuery({
    queryKey: ["reqGetpemantauankehamilanbyid", id],
    queryFn: () => reqGetpemantauankehamilanbyid(id),
    onSuccess: (res) => {
      setKehamilanbyid(res);
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      status: kehamilanbyid?.status || "",
      tanggal: kehamilanbyid?.tanggal || "",
      tempat: kehamilanbyid?.tempat || "",
      keluhan: kehamilanbyid?.keluhan || "",
      pola_makan: kehamilanbyid?.pola_makan || "",
      pola_istrahat: kehamilanbyid?.pola_istrahat || "",
      pola_seksual: kehamilanbyid?.pola_seksual || "",
      aktifitas_fisik: kehamilanbyid?.aktifitas_fisik || "",
      tinggi_badan: kehamilanbyid?.tinggi_badan || "",
      berat_badan: kehamilanbyid?.berat_badan || "",
      lingkaran_lengan_atas: kehamilanbyid?.lingkaran_lengan_atas || "",
      tekanan_darah: kehamilanbyid?.tekanan_darah || "",
      suhu: kehamilanbyid?.suhu || "",
      nadi: kehamilanbyid?.nadi || "",
      pernafasan: kehamilanbyid?.pernafasan || "",
      conjungtiva: kehamilanbyid?.conjungtiva || "",
      sclera: kehamilanbyid?.sclera || "",
      udema_wajah: kehamilanbyid?.udema_wajah || "",
      kesehatan_gigi_dan_mulut: kehamilanbyid?.kesehatan_gigi_dan_mulut || "",
      kelenjar_tiroid: kehamilanbyid?.kelenjar_tiroid || "",
      kelenjar_limfe: kehamilanbyid?.kelenjar_limfe || "",
      vena_jugularis: kehamilanbyid?.vena_jugularis || "",
      payudarah: kehamilanbyid?.payudarah || "",
      pembesaran_perut: kehamilanbyid?.pembesaran_perut || "",
      luka_bekas_operasi: kehamilanbyid?.luka_bekas_operasi || "",
      leopold_1: kehamilanbyid?.leopold_1 || "",
      leopold_2: kehamilanbyid?.leopold_2 || "",
      leopold_3: kehamilanbyid?.leopold_3 || "",
      leopold_4: kehamilanbyid?.leopold_4 || "",
      ekstermitas: kehamilanbyid?.ekstermitas || "",
      kondisi_vulva: kehamilanbyid?.kondisi_vulva || "",
      kadar_haemoglobin: kehamilanbyid?.kadar_haemoglobin || "",
      protein_urine: kehamilanbyid?.protein_urine || "",
      glukosa_urine: kehamilanbyid?.glukosa_urine || "",
      hbsag: kehamilanbyid?.hbsag || "",
      rapid_test_hiv: kehamilanbyid?.rapid_test_hiv || "",
      usg: kehamilanbyid?.usg || "",
      pemberian_tablet_tambah_darah:
        kehamilanbyid?.pemberian_tablet_tambah_darah || "",
      status_imunisasi_tt: kehamilanbyid?.status_imunisasi_tt || "",
      konseling: kehamilanbyid?.konseling || "",
      layanan_dokter: kehamilanbyid?.layanan_dokter || "",
      ibuhamilId: kehamilanbyid?.ibuhamilId || "",
    },
    onSubmit: async (values) => {
      if (id) {
        await Edit(values);
      } else {
        await Create(values);
      }
    },
  });

  const { mutate: Create } = useMutation({
    mutationKey: ["reqCreatepemantauankehamilan"],
    mutationFn: reqCreatepemantauankehamilan,
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
    mutationKey: ["reqUpdatepemantauankehamilan", id],
    mutationFn: (values) => reqUpdatepemantauankehamilan(id, values),
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

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Heading>Tabel Pemantauan Kehamilan</Heading>
        <Button onClick={toggleModal} colorScheme="teal">
          Tambah
        </Button>
      </div>
      <Tablepemantauankehamilan setId={handleId} />
      {isModalOpen && (
        <Modalcomp
          labelbtn={id ? "Edit" : "Submit"}
          label={
            id ? "Form Edit Pemantauan Kehamilan" : "Form Pemantauan Kehamilan"
          }
          onClose={toggleModal}
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
              <p className="text-2xl">Tanggal dan tempat</p>
              <div>
                <Input
                  name="tanggal"
                  value={formik.values.tanggal}
                  onChange={formik.handleChange}
                  label="tanggal"
                  placeholder="tanggal"
                  type="date"
                />
                <Input
                  name="tempat"
                  value={formik.values.tempat}
                  onChange={formik.handleChange}
                  label="tempat"
                  placeholder="tempat"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Hasil anamnesis</p>
              <div>
                <Input
                  name="keluhan"
                  value={formik.values.keluhan}
                  onChange={formik.handleChange}
                  label="keluhan"
                  placeholder="keluhan"
                  type="text"
                />
                <Input
                  name="pola_makan"
                  value={formik.values.pola_makan}
                  onChange={formik.handleChange}
                  label="pola makan"
                  placeholder="pola makan"
                  type="text"
                />
                <Input
                  name="pola_istrahat"
                  value={formik.values.pola_istrahat}
                  onChange={formik.handleChange}
                  label="pola istrahat"
                  placeholder="pola istrahat"
                  type="text"
                />
                <Input
                  name="pola_seksual"
                  value={formik.values.pola_seksual}
                  onChange={formik.handleChange}
                  label="pola seksual"
                  placeholder="pola seksual"
                  type="text"
                />
                <Input
                  name="aktifitas_fisik"
                  value={formik.values.aktifitas_fisik}
                  onChange={formik.handleChange}
                  label="aktifitas fisik"
                  placeholder="aktifitas fisik"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Hasil pemeriksaan fisik</p>
              <div>
                <Input
                  name="tinggi_badan"
                  value={formik.values.tinggi_badan}
                  onChange={formik.handleChange}
                  label="tinggi badan"
                  placeholder="tinggi badan"
                  type="text"
                />
                <Input
                  name="berat_badan"
                  value={formik.values.berat_badan}
                  onChange={formik.handleChange}
                  label="berat badan"
                  placeholder="berat badan"
                  type="text"
                />
                <Input
                  name="lingkaran_lengan_atas"
                  value={formik.values.lingkaran_lengan_atas}
                  onChange={formik.handleChange}
                  label="linkaran lengan atas"
                  placeholder="linkaran lengan atas"
                  type="text"
                />
                <Input
                  name="tekanan_darah"
                  value={formik.values.tekanan_darah}
                  onChange={formik.handleChange}
                  label="tekanan darah"
                  placeholder="tekanan darah"
                  type="text"
                />
                <Input
                  name="suhu"
                  value={formik.values.suhu}
                  onChange={formik.handleChange}
                  label="suhu"
                  placeholder="suhu"
                  type="text"
                />
                <Input
                  name="nadi"
                  value={formik.values.nadi}
                  onChange={formik.handleChange}
                  label="nadi"
                  placeholder="nadi"
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
                  name="conjungtiva"
                  value={formik.values.conjungtiva}
                  onChange={formik.handleChange}
                  label="conjungtiva"
                  placeholder="conjungtiva"
                  type="text"
                />
                <Input
                  name="sclera"
                  value={formik.values.sclera}
                  onChange={formik.handleChange}
                  label="sclera"
                  placeholder="sclera"
                  type="text"
                />
                <Input
                  name="udema_wajah"
                  value={formik.values.udema_wajah}
                  onChange={formik.handleChange}
                  label="udema wajah"
                  placeholder="udema wajah"
                  type="text"
                />
                <Input
                  name="kesehatan_gigi_dan_mulut"
                  value={formik.values.kesehatan_gigi_dan_mulut}
                  onChange={formik.handleChange}
                  label="kesehatan gigi dan mulut"
                  placeholder="kesehatan gigi dan mulut"
                  type="text"
                />
                <Input
                  name="kelenjar_tiroid"
                  value={formik.values.kelenjar_tiroid}
                  onChange={formik.handleChange}
                  label="kelenjar tiroid"
                  placeholder="kelenjar tiroid"
                  type="text"
                />
                <Input
                  name="kelenjar_limfe"
                  value={formik.values.kelenjar_limfe}
                  onChange={formik.handleChange}
                  label="kelenjar limfe"
                  placeholder="kelenjar limfe"
                  type="text"
                />
                <Input
                  name="vena_jugularis"
                  value={formik.values.vena_jugularis}
                  onChange={formik.handleChange}
                  label="vena jugularis"
                  placeholder="vena jugularis"
                  type="text"
                />
                <Input
                  name="payudarah"
                  value={formik.values.payudarah}
                  onChange={formik.handleChange}
                  label="payudara"
                  placeholder="payudara"
                  type="text"
                />
                <Input
                  name="pembesaran_perut"
                  value={formik.values.pembesaran_perut}
                  onChange={formik.handleChange}
                  label="pembesaran perut"
                  placeholder="pembesaran perut"
                  type="text"
                />
                <Input
                  name="luka_bekas_operasi"
                  value={formik.values.luka_bekas_operasi}
                  onChange={formik.handleChange}
                  label="luka bekas operasi"
                  placeholder="luka bekas operasi"
                  type="text"
                />
                <div className="mt-2 rounded-md border-2 p-2">
                  <p className="text-2xl">Palpasi leopold</p>
                  <Input
                    name="leopold_1"
                    value={formik.values.leopold_1}
                    onChange={formik.handleChange}
                    label="leopold 1"
                    placeholder="leopold 1"
                    type="text"
                  />
                  <Input
                    name="leopold_2"
                    value={formik.values.leopold_2}
                    onChange={formik.handleChange}
                    label="leopold 2"
                    placeholder="leopold 2"
                    type="text"
                  />
                  <Input
                    name="leopold_3"
                    value={formik.values.leopold_3}
                    onChange={formik.handleChange}
                    label="leopold 3"
                    placeholder="leopold 3"
                    type="text"
                  />
                  <Input
                    name="leopold_4"
                    value={formik.values.leopold_4}
                    onChange={formik.handleChange}
                    label="leopold 4"
                    placeholder="leopold 4"
                    type="text"
                  />
                </div>
                <Input
                  name="ekstermitas"
                  value={formik.values.ekstermitas}
                  onChange={formik.handleChange}
                  label="ekstermitas"
                  placeholder="ekstermitas"
                  type="text"
                />
                <Input
                  name="kondisi_vulva"
                  value={formik.values.kondisi_vulva}
                  onChange={formik.handleChange}
                  label="kondisi vulva"
                  placeholder="kondisi vulva"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Hasil pemeriksaan penunjang</p>
              <div>
                <Input
                  name="kadar_haemoglobin"
                  value={formik.values.kadar_haemoglobin}
                  onChange={formik.handleChange}
                  label="kadar haemoglobin"
                  placeholder="kadar haemoglobin"
                  type="text"
                />
                <Input
                  name="protein_urine"
                  value={formik.values.protein_urine}
                  onChange={formik.handleChange}
                  label="protein urine"
                  placeholder="protein urine"
                  type="text"
                />
                <Input
                  name="glukosa_urine"
                  value={formik.values.glukosa_urine}
                  onChange={formik.handleChange}
                  label="glukosa urine"
                  placeholder="glukosa urine"
                  type="text"
                />
                <Input
                  name="hbsag"
                  value={formik.values.hbsag}
                  onChange={formik.handleChange}
                  label="hbsag"
                  placeholder="hbsag"
                  type="text"
                />
                <Input
                  name="rapid_test_hiv"
                  value={formik.values.rapid_test_hiv}
                  onChange={formik.handleChange}
                  label="rapid tes hiv"
                  placeholder="rapid tes hiv"
                  type="text"
                />
                <Input
                  name="usg"
                  value={formik.values.usg}
                  onChange={formik.handleChange}
                  label="usg"
                  placeholder="usg"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Penatalaksanaan</p>
              <div>
                <Input
                  name="pemberian_tablet_tambah_darah"
                  value={formik.values.pemberian_tablet_tambah_darah}
                  onChange={formik.handleChange}
                  label="pemberian tablet tambah darah"
                  placeholder="pemberian tablet tambah darah"
                  type="text"
                />
                <Input
                  name="status_imunisasi_tt"
                  value={formik.values.status_imunisasi_tt}
                  onChange={formik.handleChange}
                  label="status imunisasi tt"
                  placeholder="status imunisasi tt"
                  type="text"
                />
                <Input
                  name="konseling"
                  value={formik.values.konseling}
                  onChange={formik.handleChange}
                  label="konseling"
                  placeholder="konseling"
                  type="text"
                />
                <Input
                  name="layanan_dokter"
                  value={formik.values.layanan_dokter}
                  onChange={formik.handleChange}
                  label="layanan dokter"
                  placeholder="layanan dokter"
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

export default Pemantauankehamilan;
