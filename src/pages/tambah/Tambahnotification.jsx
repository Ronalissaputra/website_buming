import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import {
  Heading,
  Tablenotification,
  Modalcomp,
  Layout,
} from "../../components";

const Tambahnotification = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Heading>Tabel Notifikasi</Heading>
        <Button onClick={toggleModal} colorScheme="teal">
          Tambah
        </Button>
      </div>
      <Tablenotification />
      <Modalcomp />
    </Layout>
  );
};

export default Tambahnotification;
