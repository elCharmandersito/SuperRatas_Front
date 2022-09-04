import React, { useState, useEffect, useMemo, useRef } from "react";
import UserDataService from "../../services/UserService";
import { useTable } from "react-table";

const UserList = (props) => {
  const [user, setUser] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  const userRef = useRef();

  userRef.current = user;

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeSearchNombre = (e) => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
  };

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then((response) => {
        setUser(response.data);
      }).catch((e) => {
        console.log(e);
      });
  };

  const findByNombre = () => {
    UserDataService.findByNombre(searchNombre)
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openUser = (rowIndex) => {
    const id = userRef.current[rowIndex].IdEmpresa;

    props.history.push("/user/" + id);
  };

  const deleteUser = (rowIndex) => {
    const id = userRef.current[rowIndex].IdEmpresa;

    console.log(id);

    UserDataService.remove(id)
      .then((response) => {
        props.history.push("/user");

        let newUser = [...userRef.current];
        newUser.splice(rowIndex, 1);

        setUser(newUser);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "IdUsuario",
      },
      {
        Header: "Rut",
        accessor: "ClienteRut",
      },
      {
        Header: "DV",
        accessor: "ClienteDV"
      },
      {
        Header: "Nombre",
        accessor: "Nombre"
      },
      {
        Header: "Apellido",
        accessor: "Apellido"
      },
      {
        Header: "Puntos Totales",
        accessor: "TotalPuntos"
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openUser(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteUser(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: user,
  });

  return (
    <div className="list row" style={{ display: 'flex', justifyContent: 'center' }}>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h1><b>All Users Registered</b></h1>
        </div>
      </div>

      <hr />
      <br />

      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search User By Rut"
            value={searchNombre}
            onChange={onChangeSearchNombre}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByNombre}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
