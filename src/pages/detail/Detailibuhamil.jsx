import React, { useState } from "react";
import { Layout, Heading } from "../../components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Table, Tbody, Tr, Td, TableContainer, Button } from "@chakra-ui/react";
import { reqGetibuhamilbyid } from "../../features/ibuhamil/reqGetibuhamilbyid";

const Detailibuhamil = () => {
  const { uuid } = useParams();
  const [data, setData] = useState("");

  useQuery({
    queryKey: ["reqGetibuhamilbyid"],
    queryFn: () => reqGetibuhamilbyid(uuid),
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
          <Heading>Detail Ibu Hamil</Heading>
          <Button onClick={handlePrint} colorScheme="teal">
            Print
          </Button>
        </div>
        <TableContainer>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Nama ibuhamil</Td>
                <Td>{data && data.nama}</Td>
              </Tr>
              <Tr>
                <Td>ID ibuhamik</Td>
                <Td>{data && data.customId}</Td>
              </Tr>
              <Tr>
                <Td>Umur</Td>
                <Td>{data && data.umur}</Td>
              </Tr>
              <Tr>
                <Td>Lama Nikah</Td>
                <Td>{data && data.lama_nikah}</Td>
              </Tr>
              <Tr>
                <Td>Suku</Td>
                <Td>{data && data.suku}</Td>
              </Tr>
              <Tr>
                <Td>Agama</Td>
                <Td>{data && data.agama}</Td>
              </Tr>
              <Tr>
                <Td>Pedidikan</Td>
                <Td>{data && data.pendidikan}</Td>
              </Tr>
              <Tr>
                <Td>Pekerjaan</Td>
                <Td>{data && data.pekerjaan}</Td>
              </Tr>
              <Tr>
                <Td>Alamat</Td>
                <Td>{data && data.alamat}</Td>
              </Tr>
              <Tr>
                <Td>Nomor Hp</Td>
                <Td>{data && data.nomor_hp}</Td>
              </Tr>
              <Tr>
                <Td>Golongan Darah</Td>
                <Td>{data && data.golongan_darah}</Td>
              </Tr>
              <Tr>
                <Td>Hamil ke</Td>
                <Td>{data && data.hamil_ke}</Td>
              </Tr>
              <Tr>
                <Td>Jumlah Anak</Td>
                <Td>{data && data.jumlah_anak}</Td>
              </Tr>
              <Tr>
                <Td>Siklus</Td>
                <Td>{data && data.siklus}</Td>
              </Tr>
              <Tr>
                <Td>Lama Haid</Td>
                <Td>{data && data.lama_haid}</Td>
              </Tr>
              <Tr>
                <Td>Hptp</Td>
                <Td>{data && data.hptp}</Td>
              </Tr>
              <Tr>
                <Td>Hpl</Td>
                <Td>{data && data.hpl}</Td>
              </Tr>
              <Tr>
                <Td>Email</Td>
                <Td>{data && data.email}</Td>
              </Tr>
              <Tr>
                <Td>Nomor Bpjs</Td>
                <Td>{data && data.nomor_bpjs}</Td>
              </Tr>
              <Tr>
                <Td>Tempat Periksa</Td>
                <Td>{data && data.tempat_periksa}</Td>
              </Tr>
              <Tr>
                <Td>Nama Suami</Td>
                <Td>{data && data.nama_suami}</Td>
              </Tr>
              <Tr>
                <Td>Umur Suami</Td>
                <Td>{data && data.umur_suami}</Td>
              </Tr>
              <Tr>
                <Td>Agama Suami</Td>
                <Td>{data && data.agama_suami}</Td>
              </Tr>
              <Tr>
                <Td>Suku Suami</Td>
                <Td>{data && data.suku_suami}</Td>
              </Tr>
              <Tr>
                <Td>Pendidikan Suami</Td>
                <Td>{data && data.pendidikan_suami}</Td>
              </Tr>
              <Tr>
                <Td>Pekerjaan Suami</Td>
                <Td>{data && data.pekerjaan_suami}</Td>
              </Tr>
              <Tr>
                <Td>Alamat Suami</Td>
                <Td>{data && data.alamat_suami}</Td>
              </Tr>
              <Tr>
                <Td>Nomor hp Suami</Td>
                <Td>{data && data.nomorhp_suami}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default Detailibuhamil;
