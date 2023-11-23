import React from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
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
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Daftaribuhamil = ({
  onSearch,
  query,
  onChange,
  data,
  row,
  page,
  pages,
  changePage,
  refetch,
  userrole,
}) => {
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
            onChange={onChange}
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
                  {userrole && userrole === "superadmin" ? (
                    <Th>Mahasiswa Pendamping</Th>
                  ) : null}
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
                      {userrole && userrole === "superadmin" ? (
                        <Td>{item.Admin.email}</Td>
                      ) : null}
                      <Td w="10px" isNumeric>
                        <div className="flex space-x-5">
                          <Link to={`/detail/ibuhamil/${item.uuid}`}>
                            <p className="text-blue-600">Detail</p>
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

export default Daftaribuhamil;
