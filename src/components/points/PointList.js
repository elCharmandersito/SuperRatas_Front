import React, { useState, useEffect, useMemo, useRef } from "react";
import PointDataService from "../../services/PointService";
import { useTable } from "react-table";
import { Link } from 'react-router-dom'

const PointsList = (props) => {
  const [point, setPoint] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  const pointRef = useRef();

  pointRef.current = point;

  useEffect(() => {
    retrievePoints();
  }, []);

  const onChangeSearchNombre = (e) => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
  };

  const retrievePoints = () => {
    PointDataService.getAll()
      .then((response) => {
        setPoint(response.data);
      }).catch((e) => {
        console.log(e);
      });
  };

  const findByNombre = () => {
    PointDataService.findByNombre(searchNombre)
      .then((response) => {
        setPoint(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openPoint = (rowIndex) => {
    const id = pointRef.current[rowIndex].IdPunto;

    props.history.push("/points/" + id);
  };

  const deletePoint = (rowIndex) => {
    const id = pointRef.current[rowIndex].IdPunto;

    console.log(id);

    PointDataService.remove(id)
      .then((response) => {
        props.history.push("/points");

        let newPoint = [...pointRef.current];
        newPoint.splice(rowIndex, 1);

        setPoint(newPoint);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID POINT",
        accessor: "IdPunto",
      },
      {
        Header: "ID BUSINESS",
        accessor: "IdEmpresa",
      },
      {
        Header: "POINT NAME",
        accessor: "NombrePunto"
      },
      {
        Header: "DEACTIVATE",
        accessor: "Desactivado"
      },
      {
        Header: "ACTIONS",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openPoint(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deletePoint(rowIdx)}>
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
    data: point,
  });

  return (
    <div className="list row" style={{ display: 'flex', justifyContent: 'center' }}>
      {/* TITULO */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h1><b>All Type Point Registered</b></h1>
        </div>
      </div>

      <hr />
      <br />

      {/* CUADRO BUSQUEDA POR NOMBRE Y BOTON AGREGAR EMPRESA*/}

      <div class="row justify-content-between">
        <div class="container" style={{ justifyContent: 'center' }}>
          <div class="row">
            <div className="col-md">
            </div>
            <div className="col-md">
            </div>
            <div className="col-md">
            </div>
            <div className="col-md">
            </div>
            <div className="col-md">
            </div>
            <div className="col-md">
              <div className="input-group-append">
                <Link to="/points/add" className="btn btn-outline-primary">Add New Point</Link>
              </div>
            </div>
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

export default PointsList;
