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
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { reqUpdatenotification } from "../../features/notification/reqUpdatenotification";

const Tablenotification = ({
  data,
  row,
  page,
  pages,
  changePage,
  refetch
}) => {

  const { mutate } = useMutation({
    mutationKey: ["reqUpdatenotification"],
    mutationFn: reqUpdatenotification,
    onSuccess: (res) => {
      refetch()
      console.log("succeess",res);
    },
    onerror: (err) => {
      console.log(err);
    }
  })

  const handleClosed = (id) => {
   mutate({id, status: "status", values: 0})
  }

  const handleSend = (id) => {
   mutate({id, status: "status", values: 1})
  }

  return (
    <>
      <TableContainer>
        <Table variant="striped">
          {data && data.length === 0 ? (
            <TableCaption>Tidak ada data</TableCaption>
          ) : (
            <>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Title</Th>
                  <Th>Body</Th>
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
                      <Td>{item.id}</Td>
                      <Td>{item.title}</Td>
                      <Td>{item.body}</Td>
                      <Td>
                        {item.status > 0 ? (
                          <Tag color="whiteAlpha.800" bgColor="green.500">
                            Active
                          </Tag>
                        ) : (
                          <Tag color="whiteAlpha.800" bgColor="red.500">
                            Pending
                          </Tag>
                        )}
                      </Td>
                      <Td w="10px" isNumeric>
                        <div className="flex space-x-5">
                          {item.status > 0 ? (
                            <Link onClick={() => handleClosed(item.id)}>
                              <p className="text-red-600">Closed</p>
                            </Link>
                          ) : (
                            <Link onClick={() => handleSend(item.id)}>
                              <p className="text-blue-600">Sent</p>
                            </Link>
                          )}
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

export default Tablenotification;
