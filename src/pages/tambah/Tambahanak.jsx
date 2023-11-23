import React, { useState } from "react";
import {
  Heading,
  Tableanak,
  Modalcomp,
  Input,
  Select,
  Layout,
} from "../../components";
import { Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useToast, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { reqGetibuhamilFc } from "../../features/ibuhamil/reqGetibuhamilFc";
import { reqGetanakbyid } from "../../features/anak/reqGetanakbyid";
import { reqUpdateanak } from "../../features/anak/reqUpdateanak";
import { reqCreateanak } from "../../features/anak/reqCreateanak";

const Tambahanak = () => {
  const [id, setId] = useState(null);
  const handleId = async (id) => {
    await setId(id);
    await toggleModal();
  };
  const [anakbyid, setAnakbyid] = useState("");
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
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

  useQuery({
    queryKey: ["reqGetanakbyid", id],
    queryFn: () => reqGetanakbyid(id),
    onSuccess: (res) => {
      setAnakbyid(res);
    },
  });

  const options =
    data?.response?.map((item) => ({
      value: item.id,
      label: item.nama,
    })) || [];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nama: anakbyid?.nama || "",
      jenis_kelamin: anakbyid?.jenis_kelamin || "",
      tanggal_lahir: anakbyid?.tanggal_lahir || "",
      anak_ke: anakbyid?.anak_ke || "",
      keadaan_umum: anakbyid?.keadaan_umum || "",
      kesadaran: anakbyid?.kesadaran || "",
      kondisi_saat_lahir: anakbyid?.kondisi_saat_lahir || "",
      tekanan_darah: anakbyid?.tekanan_darah || "",
      suhu: anakbyid?.suhu || "",
      dja: anakbyid?.dja || "",
      hr: anakbyid?.hr || "",
      rr: anakbyid?.rr || "",
      saturasi_o2: anakbyid?.saturasi_o2 || "",
      capilary_refill: anakbyid?.capilary_refill || "",
      bb: anakbyid?.bb || "",
      pb: anakbyid?.pb || "",
      lila: anakbyid?.lila || "",
      lk: anakbyid?.lk || "",
      ld: anakbyid?.ld || "",
      apperance: anakbyid?.apperance || "",
      pulse: anakbyid?.pulse || "",
      grimace: anakbyid?.grimace || "",
      activity: anakbyid?.activity || "",
      respiration: anakbyid?.respiration || "",
      kepala: anakbyid?.kepala || "",
      uub: anakbyid?.uub || "",
      mata: anakbyid?.mata || "",
      tht: anakbyid?.tht || "",
      mulut: anakbyid?.mulut || "",
      thorax: anakbyid?.thorax || "",
      abdomen: anakbyid?.abdomen || "",
      tali_pusat: anakbyid?.tali_pusat || "",
      punggung: anakbyid?.punggung || "",
      genetalia: anakbyid?.genetalia || "",
      anus: anakbyid?.anus || "",
      ekstermitas: anakbyid?.ekstermitas || "",
      kulit: anakbyid?.kulit || "",
      moro: anakbyid?.moro || "",
      rooting: anakbyid?.rooting || "",
      sucking: anakbyid?.sucking || "",
      swallowing: anakbyid?.swallowing || "",
      wallking: anakbyid?.wallking || "",
      graphs: anakbyid?.graphs || "",
      babinski: anakbyid?.babinski || "",
      tonicneck: anakbyid?.tonicneck || "",
      miksi: anakbyid?.miksi || "",
      defekasi: anakbyid?.defekasi || "",
      laboratorium: anakbyid?.laboratorium || "",
      usg: anakbyid?.usg || "",
      rontgen: anakbyid?.rontgen || "",
      terapi: anakbyid?.terapi || "",
      perawatan_talipusat: anakbyid?.perawatan_talipusat || "",
      imd: anakbyid?.imd || "",
      vitamin_k1: anakbyid?.vitamin_k1 || "",
      imunisasi_hepatitis: anakbyid?.imunisasi_hepatitis || "",
      salep: anakbyid?.salep || "",
      kie: anakbyid?.kie || "",
      ppia: anakbyid?.ppia || "",
      pemantauan_tumbuh_kembang: anakbyid?.pemantauan_tumbuh_kembang || "",
      ibuhamilId: anakbyid?.ibuhamilId || "",
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
    mutationKey: ["reqCreateanak"],
    mutationFn: reqCreateanak,
    onSuccess: () => {
      toggleModal();
      toast({
        title: "Success",
        description: "Created success",
        status: "success",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
      navigate("/tambah/anak");
      queryClient.refetchQueries("reqGetibuhamil");
      formik.resetForm();
    },
  });

  const { mutate: Edit } = useMutation({
    mutationKey: ["reqUpdateanak", id],
    mutationFn: (values) => reqUpdateanak(id, values),
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
        <Heading>Tabel anak</Heading>
        <Button onClick={toggleModal} colorScheme="teal">
          Tambah
        </Button>
      </div>
      <Tableanak setId={handleId} />
      {isModalOpen && (
        <Modalcomp
          labelbtn={id ? "Edit" : "Submit"}
          onClose={toggleModal}
          label={id ? "Form Edit Anak" : "Form Anak"}
          onSubmit={formik.handleSubmit}
        >
          <div className="grid grid-cols-1 gap-5 rounded-sm pt-2 md:grid-cols-2">
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Data Anak</p>
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
                <Input
                  name="nama"
                  value={formik.values.nama}
                  onChange={formik.handleChange}
                  label="nama"
                  placeholder="nama"
                />
                <label className="mb-2 block text-lg font-light text-gray-900">
                  Jenis kelamin
                </label>
                <RadioGroup
                  name="jenis_kelamin"
                  value={formik.values.jenis_kelamin}
                  onChange={formik.handleChange}
                  className="mb-2"
                >
                  <Stack direction="row">
                    <Radio
                      type="radio"
                      name="jenis_kelamin"
                      value="Laki-laki"
                      onChange={formik.handleChange}
                      checked={formik.values.jenis_kelamin === "Laki-laki"}
                    >
                      Laki-laki
                    </Radio>
                    <Radio
                      type="radio"
                      name="jenis_kelamin"
                      value="Perempuan"
                      onChange={formik.handleChange}
                      checked={formik.values.jenis_kelamin === "Perempuan"}
                    >
                      Perempuan
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Input
                  name="tanggal_lahir"
                  value={formik.values.tanggal_lahir}
                  onChange={formik.handleChange}
                  label="tangal lahir"
                  placeholder="tanggal lahir"
                  type="date"
                />
                <Input
                  name="anak_ke"
                  value={formik.values.anak_ke}
                  onChange={formik.handleChange}
                  label="anak ke"
                  placeholder="anak ke"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Hasil pemeriksaan umum</p>
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
                  name="kondisi_saat_lahir"
                  value={formik.values.kondisi_saat_lahir}
                  onChange={formik.handleChange}
                  label="kondisi saat lahir"
                  placeholder="kondisi saat lahir"
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
                  name="dja"
                  value={formik.values.dja}
                  onChange={formik.handleChange}
                  label="dja"
                  placeholder="dja"
                  type="text"
                />
                <Input
                  name="hr"
                  value={formik.values.hr}
                  onChange={formik.handleChange}
                  label="hr"
                  placeholder="hr"
                  type="text"
                />
                <Input
                  name="rr"
                  value={formik.values.rr}
                  onChange={formik.handleChange}
                  label="rr"
                  placeholder="rr"
                  type="text"
                />
                <Input
                  name="saturasi_o2"
                  value={formik.values.saturasi_o2}
                  onChange={formik.handleChange}
                  label="saturasi o2"
                  placeholder="saturasi o2"
                  type="text"
                />
                <Input
                  name="capilary_refill"
                  value={formik.values.capilary_refill}
                  onChange={formik.handleChange}
                  label="capilary refill"
                  placeholder="capilary refill"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Hasil Pemeriksaan Ukuran Antropometri</p>
              <div>
                <Input
                  name="bb"
                  value={formik.values.bb}
                  onChange={formik.handleChange}
                  label="bb"
                  placeholder="bb"
                  type="text"
                />
                <Input
                  name="pb"
                  value={formik.values.pb}
                  onChange={formik.handleChange}
                  label="pb"
                  placeholder="bb"
                  type="text"
                />
                <Input
                  name="lila"
                  value={formik.values.lila}
                  onChange={formik.handleChange}
                  label="lila"
                  placeholder="bb"
                  type="text"
                />
                <Input
                  name="lk"
                  value={formik.values.lk}
                  onChange={formik.handleChange}
                  label="lk"
                  placeholder="bb"
                  type="text"
                />
                <Input
                  name="ld"
                  value={formik.values.ld}
                  onChange={formik.handleChange}
                  label="ld"
                  placeholder="bb"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Hasil Pemeriksaan APGAR SCORE </p>
              <div>
                <Input
                  name="apperance"
                  value={formik.values.apperance}
                  onChange={formik.handleChange}
                  label="apperance"
                  placeholder="apperance"
                  type="text"
                />
                <Input
                  name="pulse"
                  value={formik.values.pulse}
                  onChange={formik.handleChange}
                  label="pulse"
                  placeholder="pulse"
                  type="text"
                />
                <Input
                  name="grimace"
                  value={formik.values.grimace}
                  onChange={formik.handleChange}
                  label="grimace"
                  placeholder="grimace"
                  type="text"
                />
                <Input
                  name="activity"
                  value={formik.values.activity}
                  onChange={formik.handleChange}
                  label="activity"
                  placeholder="activity"
                  type="text"
                />
                <Input
                  name="respiration"
                  value={formik.values.respiration}
                  onChange={formik.handleChange}
                  label="respiration"
                  placeholder="respiration"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Hasil Pemeriksaan fisik</p>
              <div>
                <Input
                  name="kepala"
                  value={formik.values.kepala}
                  onChange={formik.handleChange}
                  label="kepala"
                  placeholder="kepala"
                  type="text"
                />
                <Input
                  name="uub"
                  value={formik.values.uub}
                  onChange={formik.handleChange}
                  label="uub"
                  placeholder="uub"
                  type="text"
                />
                <Input
                  name="mata"
                  value={formik.values.mata}
                  onChange={formik.handleChange}
                  label="mata"
                  placeholder="mata"
                  type="text"
                />
                <Input
                  name="tht"
                  value={formik.values.tht}
                  onChange={formik.handleChange}
                  label="tht"
                  placeholder="tht"
                  type="text"
                />
                <Input
                  name="mulut"
                  value={formik.values.mulut}
                  onChange={formik.handleChange}
                  label="mulut"
                  placeholder="mulut"
                  type="text"
                />
                <Input
                  name="thorax"
                  value={formik.values.thorax}
                  onChange={formik.handleChange}
                  label="thorax"
                  placeholder="thorax"
                  type="text"
                />
                <Input
                  name="abdomen"
                  value={formik.values.abdomen}
                  onChange={formik.handleChange}
                  label="abdomen"
                  placeholder="abdomen"
                  type="text"
                />
                <Input
                  name="tali_pusat"
                  value={formik.values.tali_pusat}
                  onChange={formik.handleChange}
                  label="tali pusat"
                  placeholder="tali pusat"
                  type="text"
                />
                <Input
                  name="punggung"
                  value={formik.values.punggung}
                  onChange={formik.handleChange}
                  label="punggung"
                  placeholder="punggung"
                  type="text"
                />
                <Input
                  name="genetalia"
                  value={formik.values.genetalia}
                  onChange={formik.handleChange}
                  label="genetalia"
                  placeholder="genetalia"
                  type="text"
                />
                <Input
                  name="anus"
                  value={formik.values.anus}
                  onChange={formik.handleChange}
                  label="anus"
                  placeholder="anus"
                  type="text"
                />
                <Input
                  name="ekstermitas"
                  value={formik.values.ekstermitas}
                  onChange={formik.handleChange}
                  label="ekstermitas"
                  placeholder="ekstermitas"
                  type="text"
                />
                <Input
                  name="kulit"
                  value={formik.values.kulit}
                  onChange={formik.handleChange}
                  label="kulit"
                  placeholder="kulit"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Hasil Pemeriksaan Refleks Pada Bayi</p>
              <div>
                <Input
                  name="moro"
                  value={formik.values.moro}
                  onChange={formik.handleChange}
                  label="moro"
                  placeholder="moro"
                  type="text"
                />
                <Input
                  name="rooting"
                  value={formik.values.rooting}
                  onChange={formik.handleChange}
                  label="rooting"
                  placeholder="rooting"
                  type="text"
                />
                <Input
                  name="sucking"
                  value={formik.values.sucking}
                  onChange={formik.handleChange}
                  label="sucking"
                  placeholder="sucking"
                  type="text"
                />
                <Input
                  name="swallowing"
                  value={formik.values.swallowing}
                  onChange={formik.handleChange}
                  label="swallowing"
                  placeholder="swallowing"
                  type="text"
                />
                <Input
                  name="wallking"
                  value={formik.values.wallking}
                  onChange={formik.handleChange}
                  label="wallking"
                  placeholder="wallking"
                  type="text"
                />
                <Input
                  name="graphs"
                  value={formik.values.graphs}
                  onChange={formik.handleChange}
                  label="graphs"
                  placeholder="graphs"
                  type="text"
                />
                <Input
                  name="babinski"
                  value={formik.values.babinski}
                  onChange={formik.handleChange}
                  label="babinski"
                  placeholder="babinski"
                  type="text"
                />
                <Input
                  name="tonicneck"
                  value={formik.values.tonicneck}
                  onChange={formik.handleChange}
                  label="tonicneck"
                  placeholder="tonicneck"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Hasil Pemeriksaan Eliminasi</p>
              <div>
                <Input
                  name="miksi"
                  value={formik.values.miksi}
                  onChange={formik.handleChange}
                  label="miksi"
                  placeholder="miksi"
                  type="text"
                />
                <Input
                  name="defekasi"
                  value={formik.values.defekasi}
                  onChange={formik.handleChange}
                  label="defekasi"
                  placeholder="defekasi"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Hasil Pemeriksaan Penunjang</p>
              <div>
                <Input
                  name="laboratorium"
                  value={formik.values.laboratorium}
                  onChange={formik.handleChange}
                  label="laboratorium"
                  placeholder="laboratorium"
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
                <Input
                  name="rontgen"
                  value={formik.values.rontgen}
                  onChange={formik.handleChange}
                  label="rontgen"
                  placeholder="rontgen"
                  type="text"
                />
                <Input
                  name="terapi"
                  value={formik.values.terapi}
                  onChange={formik.handleChange}
                  label="terapi"
                  placeholder="terapi"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Penatalaksanaan</p>
              <div>
                <Input
                  name="perawatan_talipusat"
                  value={formik.values.perawatan_talipusat}
                  onChange={formik.handleChange}
                  label="perawatan tali pusat"
                  placeholder="perawatan tali pusat"
                  type="text"
                />
                <Input
                  name="imd"
                  value={formik.values.imd}
                  onChange={formik.handleChange}
                  label="imd"
                  placeholder="imd"
                  type="text"
                />
                <Input
                  name="vitamin_k1"
                  value={formik.values.vitamin_k1}
                  onChange={formik.handleChange}
                  label="vitamin k1"
                  placeholder="vitamin k1"
                  type="text"
                />
                <Input
                  name="imunisasi_hepatitis"
                  value={formik.values.imunisasi_hepatitis}
                  onChange={formik.handleChange}
                  label="imunisasi hepatitis"
                  placeholder="imunisasi hepatitis"
                  type="text"
                />
                <Input
                  name="salep"
                  value={formik.values.salep}
                  onChange={formik.handleChange}
                  label="salep"
                  placeholder="salep"
                  type="text"
                />
                <Input
                  name="kie"
                  value={formik.values.kie}
                  onChange={formik.handleChange}
                  label="kie"
                  placeholder="kie"
                  type="text"
                />
                <Input
                  name="ppia"
                  value={formik.values.ppia}
                  onChange={formik.handleChange}
                  label="ppia"
                  placeholder="ppia"
                  type="text"
                />
                <Input
                  name="pemantauan_tumbuh_kembang"
                  value={formik.values.pemantauan_tumbuh_kembang}
                  onChange={formik.handleChange}
                  label="pemantauan tumbuh kembang"
                  placeholder="pemantauan tumbuh kembang"
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

export default Tambahanak;
