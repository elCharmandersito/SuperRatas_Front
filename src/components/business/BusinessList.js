import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from 'react-router-dom'
import BusinessDataService from "../../services/BusinessService";
import { useTable } from "react-table";

const BusinessList = (props) => {
  const [business, setBusiness] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  const businessRef = useRef();

  businessRef.current = business;

  useEffect(() => {
    retrieveBusiness();
  }, []);

  const onChangeSearchNombre = (e) => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
  };

  const retrieveBusiness = () => {
    BusinessDataService.getAll()
      .then((response) => {
        setBusiness(response.data);
      }).catch((e) => {
        console.log(e);
      });
  };

  const findByNombre = () => {
    BusinessDataService.findByNombre(searchNombre)
      .then((response) => {
        setBusiness(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };  

  const openBusiness = (rowIndex) => {
    const id = businessRef.current[rowIndex].IdEmpresa;

    props.history.push("/business/" + id);
  };

  const deleteBusiness = (rowIndex) => {
    const id = businessRef.current[rowIndex].IdEmpresa;

    console.log(id);

    BusinessDataService.remove(id)
      .then((response) => {
        props.history.push("/business");

        let newBusiness = [...businessRef.current];
        newBusiness.splice(rowIndex, 1);

        setBusiness(newBusiness);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "IdEmpresa"
      },
      {
        Header: "Nombre",
        accessor: "Nombre",
      },
      {
        Header: "Desactivado",
        accessor: "Desactivado"
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openBusiness(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteBusiness(rowIdx)}>
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
    data: business,
  });

  return (
    <div className="list row" style={{ display: 'flex', justifyContent: 'center' }}>
      {/* TITULO */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h1><b>All Business Registered</b></h1>
        </div>
      </div>

      <hr />
      <br />

      {/* CUADRO BUSQUEDA POR NOMBRE Y BOTON AGREGAR EMPRESA*/}

      <div class="row justify-content-between">

        <div class="col-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Business By Name"
              value={searchNombre}
              onChange={onChangeSearchNombre}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={findByNombre}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div class="col-2">
          <div className="input-group-append">
          <Link to="/business/add" className="btn btn-outline-primary">Add New Business</Link>            
          </div>
        </div>
      </div>

      <br />
      <br />

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

export default BusinessList;
