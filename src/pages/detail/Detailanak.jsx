import React, { useState } from "react";
import { Layout, Heading } from "../../components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Table, Tbody, Tr, Td, TableContainer, Button } from "@chakra-ui/react";
import { reqGetanakbyid } from "../../features/anak/reqGetanakbyid";

const Detailanak = () => {
  const { id } = useParams();
  const [data, setData] = useState("");

  useQuery({
    queryKey: ["reqGetanakbyid"],
    queryFn: () => reqGetanakbyid(id),
    onSuccess: (res) => {
      setData(res);
    },
  });

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
                <Td>Nama Anak</Td>
                <Td>{data && data.nama}</Td>
              </Tr>
              <Tr>
                <Td>Jenis Kelamin</Td>
                <Td>{data && data.jenis_kelamin}</Td>
              </Tr>
              <Tr>
                <Td>Tanggal Lahir</Td>
                <Td>{data && data.tanggal_lahir}</Td>
              </Tr>
              <Tr>
                <Td>Anak Ke</Td>
                <Td>{data && data.anak_ke}</Td>
              </Tr>
              <Tr>
                <Td>Keadaan Umum</Td>
                <Td>{data && data.keadaan_umum}</Td>
              </Tr>
              <Tr>
                <Td>Kesadaran</Td>
                <Td>{data && data.kesadaran}</Td>
              </Tr>
              <Tr>
                <Td>Kondisi Saat Lahir</Td>
                <Td>{data && data.kondisi_saat_lahir}</Td>
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
                <Td>Dja</Td>
                <Td>{data && data.dja}</Td>
              </Tr>
              <Tr>
                <Td>Hr</Td>
                <Td>{data && data.hr}</Td>
              </Tr>
              <Tr>
                <Td>Rr</Td>
                <Td>{data && data.rr}</Td>
              </Tr>
              <Tr>
                <Td>Saturasi_O2</Td>
                <Td>{data && data.saturasi_o2}</Td>
              </Tr>
              <Tr>
                <Td>Capilary Refill</Td>
                <Td>{data && data.capilary_refill}</Td>
              </Tr>
              <Tr>
                <Td>Bb</Td>
                <Td>{data && data.bb}</Td>
              </Tr>
              <Tr>
                <Td>Pb</Td>
                <Td>{data && data.pb}</Td>
              </Tr>
              <Tr>
                <Td>Lila</Td>
                <Td>{data && data.lila}</Td>
              </Tr>
              <Tr>
                <Td>Lk</Td>
                <Td>{data && data.lk}</Td>
              </Tr>
              <Tr>
                <Td>Ld</Td>
                <Td>{data && data.ld}</Td>
              </Tr>
              <Tr>
                <Td>Apperance</Td>
                <Td>{data && data.apperance}</Td>
              </Tr>
              <Tr>
                <Td>Grimace</Td>
                <Td>{data && data.grimace}</Td>
              </Tr>
              <Tr>
                <Td>Activity</Td>
                <Td>{data && data.activity}</Td>
              </Tr>
              <Tr>
                <Td>Respiration</Td>
                <Td>{data && data.respiration}</Td>
              </Tr>
              <Tr>
                <Td>Kepala</Td>
                <Td>{data && data.kepala}</Td>
              </Tr>
              <Tr>
                <Td>Uub</Td>
                <Td>{data && data.uub}</Td>
              </Tr>
              <Tr>
                <Td>Mata</Td>
                <Td>{data && data.mata}</Td>
              </Tr>
              <Tr>
                <Td>Tht</Td>
                <Td>{data && data.tht}</Td>
              </Tr>
              <Tr>
                <Td>Mulut</Td>
                <Td>{data && data.mulut}</Td>
              </Tr>
              <Tr>
                <Td>Thorax</Td>
                <Td>{data && data.thorax}</Td>
              </Tr>
              <Tr>
                <Td>Abdomen</Td>
                <Td>{data && data.abdomen}</Td>
              </Tr>
              <Tr>
                <Td>Tali Pusat</Td>
                <Td>{data && data.tali_pusat}</Td>
              </Tr>
              <Tr>
                <Td>Punggung</Td>
                <Td>{data && data.punggung}</Td>
              </Tr>
              <Tr>
                <Td>Genetalia</Td>
                <Td>{data && data.genetalia}</Td>
              </Tr>
              <Tr>
                <Td>Anus</Td>
                <Td>{data && data.anus}</Td>
              </Tr>
              <Tr>
                <Td>Ekstermitas</Td>
                <Td>{data && data.ekstermitas}</Td>
              </Tr>
              <Tr>
                <Td>Kulit</Td>
                <Td>{data && data.kulit}</Td>
              </Tr>
              <Tr>
                <Td>Moro</Td>
                <Td>{data && data.moro}</Td>
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

export default Detailanak;
