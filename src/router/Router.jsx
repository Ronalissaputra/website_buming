import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Login,
  Registeres,
  Detailibuhamil,
  Notfound,
  Tambahibuhamil,
  Tambahanak,
  Tambahnotification,
  Pemantauankehamilan,
  Pemantauananak,
  Pemantauannifas,
  Editibuhamil,
  Formprofile,
  Editanak,
  Editpemantauankehamilan,
  Tambahartikel,
  Detailanak,
  Detailkehamilan,
  Wellcome,
} from "../pages";

const Router = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/">
          <Route index exact element={<Wellcome />} />
          <Route path="masuk" element={<Login />} />
          <Route path="daftar" element={<Registeres />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="formprofile/:id" element={<Formprofile />} />
          <Route path="pemantauan">
            <Route path="kehamilan" element={<Pemantauankehamilan />} />
            <Route path="nifas" element={<Pemantauannifas />} />
            <Route path="anak" element={<Pemantauananak />} />
          </Route>
          <Route path="tambah">
            <Route path="ibuhamil" element={<Tambahibuhamil />} />
            <Route path="anak" element={<Tambahanak />} />
            <Route path="artikel" element={<Tambahartikel />} />
            <Route path="notification" element={<Tambahnotification />} />
          </Route>
          <Route path="detail">
            <Route path="ibuhamil/:uuid" element={<Detailibuhamil />} />
            <Route path="anak/:id" element={<Detailanak />} />
            <Route path="kehamilan/:id" element={<Detailkehamilan />} />
          </Route>
          <Route path="edit">
            <Route path="ibuhamil/:uuid" element={<Editibuhamil />} />
            <Route path="anak/:id" element={<Editanak />} />
            <Route
              path="pemantauankehamilan/:id"
              element={<Editpemantauankehamilan />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
