import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { reqDeletepemantauankehamilan } from "../../features/pemantauankehamilan/reqDeletepemantauankehamilan";
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
import { SearchIcon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import { reqGetpemantauankehamilan } from "../../features/pemantauankehamilan/reqGetpemantauankehamilan";

const Tablepemantauankehamilan = ({ setId }) => {
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

  const { refetch } = useQuery({
    queryKey: ["reqGetpemantauankehamilan", keyword, page, limit],
    queryFn: () => reqGetpemantauankehamilan(keyword, page, limit),
    onSuccess: (res) => {
      setPages(res.totalPage);
      setPage(res.page);
      setRow(res.totalRows);
      setLimit(res.limit);
      setData(res.response);
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
    mutationKey: "reqDeletepemantauankehamilan",
    mutationFn: reqDeletepemantauankehamilan,
    onSuccess: () => {
      refetch();
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
                  <Th>Status kunjungan</Th>
                  <Th>Nama Ibu</Th>
                  <Th>Tanggal Periksa</Th>
                  <Th>Tempat periksa</Th>
                  <Th w="auto" isNumeric>
                    Aksi
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data &&
                  data.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.status}</Td>
                      <Td>{item.Ibuhamil.nama}</Td>
                      <Td>{item.tanggal}</Td>
                      <Td>{item.tempat}</Td>
                      <Td w="10px" isNumeric>
                        <div className="flex space-x-5">
                          <Link to={`/detail/kehamilan/${item.id}`}>
                            <p className="text-blue-600">Detail</p>
                          </Link>
                          <Link onClick={() => kirimId(item.id)}>
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

export default Tablepemantauankehamilan;
