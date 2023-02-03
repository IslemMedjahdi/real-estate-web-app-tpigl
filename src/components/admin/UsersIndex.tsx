import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import UserService from "../../services/user.service";
import { Auth } from "../../typings/user";
import Loading from "../shared/Loading";

const userService = UserService.getInstance();

const columns: TableColumn<Auth.User>[] = [
  {
    name: "N",
    cell: (_, index) => (
      <span className="text-sm font-medium">{index + 1}</span>
    ),
    selector: (_, index) => index || 0,
    sortable: true,
    width: "1rem",
  },
  {
    name: "Nom",
    cell: (row) => <span className="text-sm font-medium">{row.nom}</span>,
    selector: (row) => row.nom,
    sortable: true,
  },
  {
    name: "Prénom",
    cell: (row) => <span className="text-sm font-medium">{row.prenom}</span>,
    selector: (row) => row.prenom,
    sortable: true,
  },
  {
    name: "Email",
    cell: (row) => <span className="text-sm font-medium">{row.email}</span>,
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Téléphone",
    cell: (row) => <span className="text-sm font-medium">{row.tel}</span>,
    selector: (row) => row.tel || "",
    sortable: true,
  },
  {
    name: "Role",
    cell: (row) => <span className="text-sm font-medium">{row.role}</span>,
    selector: (row) => row.role,
    sortable: true,
  },
];

const UsersIndex: React.FC = () => {
  const [users, setUsers] = useState<Auth.User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container px-4">
        <div className="flex justify-center py-10">
          <h1 className="relative z-10 text-center font-serif text-3xl font-semibold text-gray-900 after:absolute after:top-full after:left-0 after:h-2 after:w-full after:origin-left after:skew-y-1 after:animate-reveal after:bg-blue-primary">
            Liste des utilisateurs
          </h1>
        </div>
        <div className="flex w-full flex-col divide-y bg-white shadow">
          <DataTable
            columns={columns}
            data={users}
            customStyles={{
              headCells: {
                style: {
                  fontWeight: 700,
                  fontFamily: "'Merriweather', sarif",
                },
              },
            }}
            pagination
            progressPending={loading}
            progressComponent={
              <div className="flex h-52 w-full items-center justify-center dark:bg-slate-800">
                <Loading />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UsersIndex;
