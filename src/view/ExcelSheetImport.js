import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ExcelRenderer } from "react-excel-renderer";
import React, { useState } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "emailId", headerName: "Email Id", width: 130 },
  {
    field: "mobile",
    headerName: "Mobile",
    type: "number",
    width: 90,
  },
  {
    field: "address",
    headerName: "Address",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "country",
    headerName: "Country",
    sortable: false,
    width: 160,
  },
  {
    field: "country",
    headerName: "Country",
    sortable: false,
    width: 160,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    width: 160,
  },
  {
    field: "errorLog",
    headerName: "Error Log",
    sortable: false,
    width: 160,
  },
];

const ExcelSheetImport = () => {
  const [state, setState] = useState([]);

  const handleExcelSheet = (e) => {
    let fileObj = e.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        // eslint-disable-next-line
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== undefined) {
            let status = "approved";
            let errors = [];

            if (row[0] === undefined) {
              status = "not approved";
              errors.push("Name");
            }
            if (row[1] === "") {
              status = "not approved";
              errors.push("EmailId");
            }
            if (row[2] === "") {
              status = "not approved";
              errors.push("Mobile");
            }
            newRows.push({
              id: index,
              name: row[0],
              emailId: row[1],
              mobile: row[2],
              address: row[3],
              country: row[4],
              status: status,
              errorLog: errors.toString(),
            });
          }
        });
        setState(newRows);
      }
    });
  };

  console.log(state, "state");
  return (
    <div>
      Import Excel Sheet
      <Box>
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={(e) => handleExcelSheet(e)}
        />
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={state}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Box>
    </div>
  );
};

export default ExcelSheetImport;
