import React, { useState } from "react";
import { Heading, Input, Layout, Modalcomp } from "../../components";
import { Button } from "@chakra-ui/react";

const Pemantauananak = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Heading>Tabel Pemantauan Anak</Heading>
        <Button onClick={toggleModal} colorScheme="teal">
          Tambah
        </Button>
      </div>
      {isModalOpen && (
        <Modalcomp
          onClose={toggleModal}
          label="Form Pemantauan Kehamilan"
          // onSubmit={formik.handleSubmit}
        >
          <div className="grid grid-cols-1 gap-5 rounded-sm border-t-2 border-red-500 pt-2 md:grid-cols-2">
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Status Pemeriksaan</p>
              <div>
                <Input
                  name="pilih ibu hamil"
                  label="pilih ibu hamil"
                  placeholder="pilih ibu hamil"
                  type="text"
                />
                <Input
                  name="status"
                  label="status"
                  placeholder="status"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Keadaan umum</p>
              <div>
                <Input
                  name="berat badan"
                  label="berat badan"
                  placeholder="berat badan"
                  type="text"
                />
                <Input
                  name="panjang badan"
                  label="panjang badan"
                  placeholder="panjang badan"
                  type="text"
                />
                <Input
                  name="lila"
                  label="lila"
                  placeholder="lila"
                  type="text"
                />
                <Input name="lk" label="lk" placeholder="lk" type="text" />
                <Input name="ld" label="ld" placeholder="ld" type="text" />
                <Input name="dja" label="dja" placeholder="dja" type="text" />
                <Input name="hr" label="hr" placeholder="hr" type="text" />
                <Input name="rr" label="rr" placeholder="rr" type="text" />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Hasil pemeriksaan penunjang</p>
              <div>
                <Input
                  name="laboratorium"
                  label="laboratorium"
                  placeholder="laboratorium"
                  type="text"
                />
                <Input name="usg" label="usg" placeholder="usg" type="text" />
                <Input
                  name="rontgen"
                  label="rontgen"
                  placeholder="rontgen"
                  type="text"
                />
                <Input
                  name="terapi yang didapat"
                  label="terapi yang didapat"
                  placeholder="terapi yang didapat"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Hasil pemeriksaan Kebutuhan dasar</p>
              <div>
                <Input
                  name="nutrisi"
                  label="nutrisi"
                  placeholder="nutrisi"
                  type="text"
                />
                <Input
                  name="eliminasi"
                  label="eliminasi"
                  placeholder="eliminasi"
                  type="text"
                />
                <Input
                  name="pola tidur"
                  label="pola tidur"
                  placeholder="pola tidur"
                  type="text"
                />
                <Input
                  name="personal higiene"
                  label="personal higiene"
                  placeholder="personal higiene"
                  type="text"
                />
              </div>
            </div>
            <div className="rounded-md border-2 p-4">
              <p className="text-2xl">Penatalaksanaan</p>
              <div>
                <Input
                  name="perawatan tali pusat"
                  label="perawatan tali pusat"
                  placeholder="perawatan tali pusat"
                  type="text"
                />
                <Input name="imd" label="imd" placeholder="imd" type="text" />
                <Input
                  name="vitamin k1"
                  label="vitamin k1"
                  placeholder="vitamin k1"
                  type="text"
                />
                <Input
                  name="imunisasi hepatitis b"
                  label="imunisasi hepatitis b"
                  placeholder="imunisasi hepatitis b"
                  type="text"
                />
                <Input
                  name="salep"
                  label="salep"
                  placeholder="salep"
                  type="text"
                />
                <Input name="kie" label="kie" placeholder="kie" type="text" />
                <Input
                  name="ppia"
                  label="ppia"
                  placeholder="ppia"
                  type="text"
                />
                <Input
                  name="pemantauan tumbuh kembang"
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

export default Pemantauananak;
