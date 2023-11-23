import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import { reqGetibuhamil } from "../../features/ibuhamil/reqGetibuhamil";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { reqDeleteibuhamil } from "../../features/ibuhamil/reqDeleteibuhamil";
import {
  Table,
  Thead,
  Tbody,
  Tag,
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
import { SearchIcon } from "@chakra-ui/icons";

const Tableibuhamil = ({ setId }) => {
  const toast = useToast();
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(0);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");

  const kirimId = (id) => {
    setId(id);
    console.log("table", id);
  };

  useQuery({
    queryKey: ["reqGetibuhamil", keyword, page, limit],
    queryFn: () => reqGetibuhamil(keyword, page, limit),
    onSuccess: (data) => {
      setPages(data[0].totalPage);
      setPage(data[0].page);
      setRow(data[0].totalRows);
      setLimit(data[0].limit);
      setData(data[0].response);
    },
  });
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  const onSearch = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  const { mutate } = useMutation({
    mutationKey: "reqDeleteibuhamil",
    mutationFn: reqDeleteibuhamil,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Delete success",
        status: "success",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Delete failed",
        status: "error",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const handleDelete = async (uuid) => {
    // eslint-disable-next-line no-restricted-globals
    const req = confirm("apakah anda yakin.?");
    if (req) {
      await mutate(uuid);
    }
  };

  return (
    <>
      <form onSubmit={onSearch}>
        <InputGroup>
          <InputRightElement>
            <Button colorScheme="gray.100" onClick={onSearch}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
            </Button>
          </InputRightElement>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari..."
          />
        </InputGroup>
      </form>
      <TableContainer>
        <Table variant="striped">
          {data && data.length === 0 ? (
            <TableCaption>Tidak ada data</TableCaption>
          ) : (
            <>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nama</Th>
                  <Th>Nama Suami</Th>
                  <Th>Status</Th>
                  <Th w="auto" isNumeric>
                    Aksi
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data &&
                  data.map((item) => (
                    <Tr>
                      <Td>{item.customId}</Td>
                      <Td>{item.nama}</Td>
                      <Td>{item.nama_suami}</Td>
                      <Td>
                        {item.umur > 22 ? (
                          <Tag color="whiteAlpha.800" bgColor="red.400">
                            Beresiko
                          </Tag>
                        ) : (
                          <Tag color="whiteAlpha.800" bgColor="green.500">
                            Normal
                          </Tag>
                        )}
                      </Td>
                      <Td w="10px" isNumeric>
                        <div className="flex space-x-5">
                          <Link to={`/detail/ibuhamil/${item.uuid}`}>
                            <p className="text-blue-600">Detail</p>
                          </Link>
                          <Link onClick={() => kirimId(item.uuid)}>
                            <p className="text-green-600">Edit</p>
                          </Link>
                          <Link onClick={() => handleDelete(item.uuid)}>
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
      <div className="h-16 items-center md:flex md:justify-between">
        <p className="text-slate-500">
          Total Baris : {row} Halaman : {row ? page + 1 : 0} Dari {pages}
        </p>
        <ReactPaginate
          previousLabel="Sebelumnya"
          nextLabel="Berikutnya"
          pageCount={pages}
          onPageChange={changePage}
          containerClassName="flex md:justify-center py-2"
          pageLinkClassName="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mx-1 rounded"
          activeLinkClassName="bg-blue-700 text-white py-2 px-4 mx-1 rounded"
          previousLinkClassName="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mx-1 rounded"
          nextLinkClassName="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mx-1 rounded"
        />
      </div>
    </>
  );
};

export default Tableibuhamil;
