import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reqGetartikel } from "../../features/artikel/reqGetartikel";
import { reqDeleteanak } from "../../features/anak/reqDeleteanak";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

const Tableartikel = () => {
  const toast = useToast();
  const [items, setItems] = useState("");
  useQuery({
    queryKey: ["reqGetanak"],
    queryFn: reqGetartikel,
    onSuccess: (res) => {
      setItems(res);
    },
  });

  const { mutate } = useMutation({
    mutationKey: "reqDeleteanak",
    mutationFn: reqDeleteanak,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Delete success",
        status: "success",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Delete failed",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const req = confirm("apakah anda yakin.?");
    if (req) {
      await mutate(id);
    }
  };

  return (
    <>
      <TableContainer>
        <Table variant="striped">
          {items && items.length === 0 ? (
            <TableCaption>Tidak ada data</TableCaption>
          ) : (
            <>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Title</Th>
                  <Th w="auto" isNumeric>
                    Aksi
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {items &&
                  items.map((item, index) => (
                    <Tr>
                      <Td>{index + 1}</Td>
                      <Td>{item.title}</Td>
                      <Td w="10px" isNumeric>
                        <div className="flex space-x-5">
                          <Link to={`/edit/anak/${item.id}`}>
                            <p className="text-green-600">Edit</p>
                          </Link>
                          <Link onClick={() => handleDelete(item.id)}>
                            <p className="text-red-600">Delete</p>
                          </Link>
                        </div>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default Tableartikel;
