import React, { useState } from "react";
import {
  Heading,
  Tableartikel,
  Modalcomp,
  Input,
  Textarea,
  Layout,
} from "../../components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@chakra-ui/react";
import { reqCreateartikel } from "../../features/artikel/reqCreareartikel";
import { useFormik } from "formik";
import { useToast } from "@chakra-ui/react";

const Tambahartikel = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const { mutate, isLoading } = useMutation(reqCreateartikel, {
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

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      image: null,
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Heading>Tabel Artikel</Heading>
        <Button onClick={toggleModal} colorScheme="teal">
          Tambah
        </Button>
      </div>
      <Tableartikel />
      {isModalOpen && (
        <Modalcomp
          onClose={toggleModal}
          onSubmit={formik.handleSubmit}
          label="Form Artikel"
          isLoading={isLoading}
        >
          <Input
            value={formik.values.title}
            onChange={formik.handleChange}
            label="Title"
            name="title"
            placeholder="title"
          />
          <Textarea
            value={formik.values.body}
            onChange={formik.handleChange}
            label="Body"
            name="body"
            placeholder="Type to write..."
          />
          <Input
            type="file"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
            label="Image"
            name="image"
            placeholder="image"
          />
        </Modalcomp>
      )}
    </Layout>
  );
};

export default Tambahartikel;
