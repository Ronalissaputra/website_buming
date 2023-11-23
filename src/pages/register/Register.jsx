import React from "react";
import { Layout } from "../../components";
import { NavLink } from "react-router-dom";

const Register = (props) => {
  return (
    <Layout>
      <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <ul className="-mb-px flex flex-wrap">
          <li className="mr-2">
            <NavLink
              to="/register/superadmin"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600"
                  : "inline-block rounded-t-lg border-b-2 p-4"
              }
            >
              Register superadmin
            </NavLink>
          </li>
          <NavLink
            to="/register/admin"
            className={({ isActive, isPending }) =>
              isPending
                ? ""
                : isActive
                ? "inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600"
                : "inline-block rounded-t-lg border-b-2 p-4"
            }
          >
            Register admin
          </NavLink>
          <NavLink
            to="/register/ibuhamil"
            className={({ isActive, isPending }) =>
              isPending
                ? ""
                : isActive
                ? "inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600"
                : "inline-block rounded-t-lg border-b-2 p-4"
            }
          >
            Register ibu hamil
          </NavLink>
        </ul>
      </div>
      {props.children}
    </Layout>
  );
};

export default Register;
