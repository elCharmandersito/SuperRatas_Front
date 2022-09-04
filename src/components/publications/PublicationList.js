import React, { useState, useEffect, useMemo, useRef } from "react";
import PublicationDataService from "../../services/PublicationService";
import { useTable } from "react-table";

const PublicationList = (props) => {
  const [publication, setPublication] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  const publicationRef = useRef();

  publicationRef.current = publication;

  useEffect(() => {
    retrievePublication();
  }, []);

  const onChangeSearchNombre = (e) => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
  };

  const retrievePublication = () => {
    PublicationDataService.getAll()
      .then((response) => {
        setPublication(response.data);
      }).catch((e) => {
        console.log(e);
      });
  };

  const findByNombre = () => {
    PublicationDataService.findByNombre(searchNombre)
      .then((response) => {
        setPublication(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openPublication = (rowIndex) => {
    const id = publicationRef.current[rowIndex].IdPublicacion;

    props.history.push("/publication/" + id);
  };

  const deletePublication = (rowIndex) => {
    const id = publicationRef.current[rowIndex].IdPublicacion;

    console.log(id);

    PublicationDataService.remove(id)
      .then((response) => {
        props.history.push("/publication");

        let newPublication = [...publicationRef.current];
        newPublication.splice(rowIndex, 1);

        setPublication(newPublication);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "IdPublicacion",
      },
      {
        Header: "ID Punto",
        accessor: "IdPunto",
      },
      {
        Header: "ID Usuario",
        accessor: "IdUsuario",
      },
      {
        Header: "Nombre Publicacion",
        accessor: "NombrePublicacion",
      },
      {
        Header: "Descripcion",
        accessor: "Descripcion",
      },
      {
        Header: "Puntos Minimos",
        accessor: "PuntosMinimos",
      },
      {
        Header: "Tasa de Cambio",
        accessor: "TasaCambio"
      },
      {
        Header: "Estado",
        accessor: "Estado"
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
              <span onClick={() => openPublication(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deletePublication(rowIdx)}>
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
    data: publication,
  });

  return (
    <div className="list row" style={{ display: 'flex', justifyContent: 'center' }}>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h1><b>All Publications Registered</b></h1>
        </div>
      </div>

      <hr/>
      <br/>

      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Publication By Point Type"
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

      <br/>

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

export default PublicationList;
