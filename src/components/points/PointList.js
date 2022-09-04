import React, { useState, useEffect, useMemo, useRef } from "react";
import PointDataService from "../../services/PointService";
import { useTable } from "react-table";

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
        Header: "ID",
        accessor: "IdPunto",
      },
      {
        Header: "ID Empresa",
        accessor: "IdEmpresa",
      },
      {
        Header: "Nombre de Punto",
        accessor: "NombrePunto"
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

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h1><b>All Type Points Registered</b></h1>
        </div>
      </div>

      <hr/>
      <br/>
      
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Point By Name"
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

export default PointsList;
