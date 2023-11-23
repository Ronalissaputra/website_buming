import React, { useState } from "react";
import { Layout, Heading } from "../../components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Table, Tbody, Tr, Td, TableContainer, Button } from "@chakra-ui/react";
import { reqGetpemantauankehamilanbyid } from "../../features/pemantauankehamilan/reqGetpemantauankehamilanbyid";

const Detailkehamilan = () => {
  const { id } = useParams();
  const [data, setData] = useState("");

  useQuery({
    queryKey: ["reqGetpemantauankehamilanbyid"],
    queryFn: () => reqGetpemantauankehamilanbyid(id),
    onSuccess: (res) => {
      setData(res);
    },
  });
  console.log(data);

  const handlePrint = () => {
    const printContent = document.getElementById("print-content");
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <Layout>
      <div id="print-content">
        <div className="flex items-center justify-between">
          <Heading>Detail Anak</Heading>
          <Button onClick={handlePrint} colorScheme="teal">
            Print
          </Button>
        </div>
        <TableContainer>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Nama Ibuhamil</Td>
                <Td>{data && data.Ibuhamil.nama}</Td>
              </Tr>
              <Tr>
                <Td>Status Kunjungan</Td>
                <Td>{data && data.status}</Td>
              </Tr>
              <Tr>
                <Td>Tanggal</Td>
                <Td>{data && data.tanggal}</Td>
              </Tr>
              <Tr>
                <Td>Tempat</Td>
                <Td>{data && data.tempat}</Td>
              </Tr>
              <Tr>
                <Td>Keluhan</Td>
                <Td>{data && data.keluhan}</Td>
              </Tr>
              <Tr>
                <Td>Pola Makan</Td>
                <Td>{data && data.pola_makan}</Td>
              </Tr>
              <Tr>
                <Td>Pola Istrahat</Td>
                <Td>{data && data.pola_istrahat}</Td>
              </Tr>
              <Tr>
                <Td>Pola Seksual</Td>
                <Td>{data && data.pola_seksual}</Td>
              </Tr>
              <Tr>
                <Td>Aktifitas Fisik</Td>
                <Td>{data && data.aktifitas_fisik}</Td>
              </Tr>
              <Tr>
                <Td>Tinggi Badan</Td>
                <Td>{data && data.tinggi_badan}</Td>
              </Tr>
              <Tr>
                <Td>Berat Badan</Td>
                <Td>{data && data.berat_badan}</Td>
              </Tr>
              <Tr>
                <Td>Lingkaran Lengan Atas</Td>
                <Td>{data && data.lingkaran_lengan_atas}</Td>
              </Tr>
              <Tr>
                <Td>Tekanan Darah</Td>
                <Td>{data && data.tekanan_darah}</Td>
              </Tr>
              <Tr>
                <Td>Suhu</Td>
                <Td>{data && data.suhu}</Td>
              </Tr>
              <Tr>
                <Td>Nadi</Td>
                <Td>{data && data.nadi}</Td>
              </Tr>
              <Tr>
                <Td>Pernafasan</Td>
                <Td>{data && data.pernafasan}</Td>
              </Tr>
              <Tr>
                <Td>Conjungtiva</Td>
                <Td>{data && data.conjungtiva}</Td>
              </Tr>
              <Tr>
                <Td>Sclera</Td>
                <Td>{data && data.sclera}</Td>
              </Tr>
              <Tr>
                <Td>Udema Wajah</Td>
                <Td>{data && data.udema_wajah}</Td>
              </Tr>
              <Tr>
                <Td>Kesehatan Gigi dan Mulut</Td>
                <Td>{data && data.ld}</Td>
              </Tr>
              <Tr>
                <Td>Kelenjar Tiroid</Td>
                <Td>{data && data.kelenjar_tiroid}</Td>
              </Tr>
              <Tr>
                <Td>Kelenjar Limfe</Td>
                <Td>{data && data.kelenjar_limfe}</Td>
              </Tr>
              <Tr>
                <Td>Vena Jugularis</Td>
                <Td>{data && data.vena_jugularis}</Td>
              </Tr>
              <Tr>
                <Td>Payudarah</Td>
                <Td>{data && data.payudarah}</Td>
              </Tr>
              <Tr>
                <Td>Pembesaran Perut</Td>
                <Td>{data && data.pembesaran_perut}</Td>
              </Tr>
              <Tr>
                <Td>Luka Bekas Operasi</Td>
                <Td>{data && data.luka_bekas_operasi}</Td>
              </Tr>
              <Tr>
                <Td>Leopold_1</Td>
                <Td>{data && data.mleopold_1}</Td>
              </Tr>
              <Tr>
                <Td>Leopold_2</Td>
                <Td>{data && data.mleopold_2}</Td>
              </Tr>
              <Tr>
                <Td>Leopold_3</Td>
                <Td>{data && data.mleopold_3}</Td>
              </Tr>
              <Tr>
                <Td>Leopold_4</Td>
                <Td>{data && data.mleopold_4}</Td>
              </Tr>
              <Tr>
                <Td>Ekstermitas</Td>
                <Td>{data && data.ekstermitas}</Td>
              </Tr>
              <Tr>
                <Td>Kondisi Vulva</Td>
                <Td>{data && data.kondisi_vulva}</Td>
              </Tr>
              <Tr>
                <Td>Kadar Haemoglobin</Td>
                <Td>{data && data.kadar_haemoglobin}</Td>
              </Tr>
              <Tr>
                <Td>Protein Urine</Td>
                <Td>{data && data.protein_urine}</Td>
              </Tr>
              <Tr>
                <Td>Glukosa Urine</Td>
                <Td>{data && data.glukosa_urine}</Td>
              </Tr>
              <Tr>
                <Td>Hbsag</Td>
                <Td>{data && data.hbsag}</Td>
              </Tr>
              <Tr>
                <Td>Rapid Test Hiv</Td>
                <Td>{data && data.rapid_test_hiv}</Td>
              </Tr>
              <Tr>
                <Td>Usg</Td>
                <Td>{data && data.usg}</Td>
              </Tr>
              <Tr>
                <Td>Pemberian Tablet Tambah Darah</Td>
                <Td>{data && data.pemberian_tablet_tambah_darah}</Td>
              </Tr>
              <Tr>
                <Td>Status Imunisasi Tt</Td>
                <Td>{data && data.status_imunisasi_tt}</Td>
              </Tr>
              <Tr>
                <Td>Konseling</Td>
                <Td>{data && data.konseling}</Td>
              </Tr>
              <Tr>
                <Td>Layanan Dokter</Td>
                <Td>{data && data.layanan_dokter}</Td>
              </Tr>
              <Tr>
                <Td>Rooting</Td>
                <Td>{data && data.rooting}</Td>
              </Tr>
              <Tr>
                <Td>Sucking</Td>
                <Td>{data && data.sucking}</Td>
              </Tr>
              <Tr>
                <Td>Swallowing</Td>
                <Td>{data && data.swallowing}</Td>
              </Tr>
              <Tr>
                <Td>Wallking</Td>
                <Td>{data && data.wallking}</Td>
              </Tr>
              <Tr>
                <Td>Graphs</Td>
                <Td>{data && data.graphs}</Td>
              </Tr>
              <Tr>
                <Td>Babinski</Td>
                <Td>{data && data.babinski}</Td>
              </Tr>
              <Tr>
                <Td>Tonicneck</Td>
                <Td>{data && data.tonicneck}</Td>
              </Tr>
              <Tr>
                <Td>Miksi</Td>
                <Td>{data && data.miksi}</Td>
              </Tr>
              <Tr>
                <Td>Defekasi</Td>
                <Td>{data && data.defekasi}</Td>
              </Tr>
              <Tr>
                <Td>Laboratorium</Td>
                <Td>{data && data.laboratorium}</Td>
              </Tr>
              <Tr>
                <Td>Usg</Td>
                <Td>{data && data.usg}</Td>
              </Tr>
              <Tr>
                <Td>Rontgen</Td>
                <Td>{data && data.rontgen}</Td>
              </Tr>
              <Tr>
                <Td>Terapi</Td>
                <Td>{data && data.terapi}</Td>
              </Tr>
              <Tr>
                <Td>Perawatan Talipusat</Td>
                <Td>{data && data.perawatan_talipusat}</Td>
              </Tr>
              <Tr>
                <Td>Imd</Td>
                <Td>{data && data.imd}</Td>
              </Tr>
              <Tr>
                <Td>Vitamin_k1</Td>
                <Td>{data && data.vitamin_k1}</Td>
              </Tr>
              <Tr>
                <Td>Imunisasi_hepatitis</Td>
                <Td>{data && data.imunisasi_hepatitis}</Td>
              </Tr>
              <Tr>
                <Td>Salep</Td>
                <Td>{data && data.salep}</Td>
              </Tr>
              <Tr>
                <Td>Kie</Td>
                <Td>{data && data.kie}</Td>
              </Tr>
              <Tr>
                <Td>Ppia</Td>
                <Td>{data && data.ppia}</Td>
              </Tr>
              <Tr>
                <Td>Pemantauan Tumbuh Kembang</Td>
                <Td>{data && data.pemantauan_tumbuh_kembang}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default Detailkehamilan;
