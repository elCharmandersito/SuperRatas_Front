import React, { useState, useEffect, useMemo, useRef } from "react";
import SellingDataService from "../../services/SellingService";
import { useTable } from "react-table";

const SellingList = (props) => {
  const [selling, setSellint] = useState([]);
  const sellingRef = useRef();

  sellingRef.current = selling;

  useEffect(() => {
    retrieveSellings();
  }, []);

  const retrieveSellings = () => {
    SellingDataService.getAll()
      .then((response) => {
        setSellint(response.data);
      }).catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID SELLING",
        accessor: "IdVenta",
      },
      {
        Header: "ID PUBLICATION",
        accessor: "IdPublicacion",
      },
      {
        Header: "BUYER",
        accessor: "rutCliente",
      },
      {
        Header: "ITEM PURCHASE",
        accessor: "tipoPunto",
      },
      {
        Header: "CONVERTED POINTS",
        accessor: "puntosConvertidos",
      },
      {
        Header: "CONVERTION RATE ($)",
        accessor: "tasaConversion",
      },
      {
        Header: "VALUE IN CLP",
        accessor: "valorCLP"
      },
      {
        Header: "TRANSACTION DATE",
        accessor: "fechaOperacion"
      }
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
    data: selling,
  });

  return (
    <div className="list row">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h1><b>All Sellings Registered</b></h1>
        </div>
      </div>
      
      <hr/>
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

export default SellingList;
