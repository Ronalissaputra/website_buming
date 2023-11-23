import { Heading, Layout, Daftaribuhamil } from "../../components";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { reqGetibuhamil } from "../../features/ibuhamil/reqGetibuhamil";
import { reqGetibuhamilFc } from "../../features/ibuhamil/reqGetibuhamilFc";
import { reqGetanakFc } from "../../features/anak/reqGetanakFc";
import { reqGetadminFc } from "../../features/admin/reqGetadminFc";
import { reqGetpemantauannifasFc } from "../../features/pemantauannifas/reqGetpemantauannifasFc";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [userrole, setUserrole] = useState([]);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(0);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [lengthIbuhamil, setLengthIbuhamil] = useState([]);
  const [lengthAnak, setLengthAnak] = useState([]);
  const [lengthAdmin, setLengthAdmin] = useState([]);
  const [lengthNifas, setLengthNifas] = useState([]);
  const [ibuhamil, setIbuhamil] = useState([]);

  const { refetch } = useQuery({
    queryKey: ["reqGetibuhamil", keyword, page, limit],
    queryFn: () => reqGetibuhamil(keyword, page, limit),
    onSuccess: (data) => {
      setPages(data[0].totalPage);
      setPage(data[0].page);
      setRow(data[0].totalRows);
      setLimit(data[0].limit);
      setData(data[0].response);
      setUserrole(data[1].userrole);
    },
  });

  useQuery({
    queryKey: ["reqGetibuhamilFn"],
    queryFn: reqGetibuhamilFc,
    onSuccess: (res) => {
      setLengthIbuhamil(res.totalRows);
      setIbuhamil(res.response);
    },
  });

  useQuery({
    queryKey: ["reqGetanakFc"],
    queryFn: reqGetanakFc,
    onSuccess: (res) => {
      setLengthAnak(res.totalRows);
    },
  });

  useQuery({
    queryKey: ["reqGetadminFc"],
    queryFn: reqGetadminFc,
    onSuccess: (res) => {
      setLengthAdmin(res.totalRows);
    },
  });

  useQuery({
    queryKey: ["reqGetpemantauannifasFc"],
    queryFn: reqGetpemantauannifasFc,
    onSuccess: (res) => {
      setLengthNifas(res.totalRows);
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

  return (
    <Layout>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex h-20 w-full cursor-pointer items-center justify-between rounded-md border-l-4 border-red-500 bg-slate-50 px-3 drop-shadow-md">
          <div className="text-2xl">
            <p>Ibu hamil</p>
            <p>{lengthIbuhamil && lengthIbuhamil}</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-500">
            <AiFillHeart className="text-3xl text-slate-200" />
          </div>
        </div>
        <div className="flex h-20 w-full cursor-pointer items-center justify-between rounded-md border-l-4 border-red-500 bg-slate-50 px-3 drop-shadow-md">
          <div className="text-2xl">
            <p>Anak</p>
            <p>{lengthAnak && lengthAnak}</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-500">
            <AiFillHeart className="text-3xl text-slate-200" />
          </div>
        </div>
        <div className="flex h-20 w-full cursor-pointer items-center justify-between rounded-md border-l-4 border-red-500 bg-slate-50 px-3 drop-shadow-md">
          <div className="text-2xl">
            <p>Ibu nifas</p>
            <p>{lengthNifas && lengthNifas}</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-500">
            <AiFillHeart className="text-3xl text-slate-200" />
          </div>
        </div>
        <div className="flex h-20 w-full cursor-pointer items-center justify-between rounded-md border-l-4 border-red-500 bg-slate-50 px-3 drop-shadow-md">
          <div className="text-2xl">
            <p>Beresiko</p>
            <p>
              {ibuhamil && ibuhamil.filter((item) => item.umur > 22).length}
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-500">
            <AiFillHeart className="text-3xl text-slate-200" />
          </div>
        </div>
        {userrole && userrole === "superadmin" && (
          <div className="flex h-20 w-full cursor-pointer items-center justify-between rounded-md border-l-4 border-red-500 bg-slate-50 px-3 drop-shadow-md">
            <div className="text-2xl">
              <p>Admin</p>
              <p>{lengthAdmin && lengthAdmin}</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-500">
              <AiFillHeart className="text-3xl text-slate-200" />
            </div>
          </div>
        )}
      </div>
      <Heading>Daftar Ibu hamil</Heading>
      <Daftaribuhamil
        refetch={refetch}
        onSearch={onSearch}
        query={query}
        onChange={(e) => setQuery(e.target.value)}
        data={data}
        row={row}
        page={page}
        pages={pages}
        changePage={changePage}
        userrole={userrole}
      />
    </Layout>
  );
};

export default Dashboard;
