import React, { useState, useEffect, useRef, forwardRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
} from "@mui/material";
import {
  CommanTableContain,
  ContainerCustom,
  PaginationContain,
  SmartSearchContain,
} from "../style/Table";
import SearchIcon from "@mui/icons-material/Search";
import { color } from "@mui/system";

const staticHeaders = [
  { id: "id", label: "ID", sticky: true },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "status", label: "Status" },
];

const staticData = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive" },
  { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive" }, { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive" }, { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive" }, { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive" }, { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive" }, { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive" }, { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive" }, { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive" }, { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive" }, { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive" }, { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive" },
];

const MuiTable = forwardRef(
  ({ headers = staticHeaders, data = staticData, defaultRowsPerPage = 10 }, ref) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [search, setSearch] = useState("");
    const [columnWidths, setColumnWidths] = useState([]);
    const headerRefs = useRef([]);

    // Handle Pagination
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    // Filter data for search
    const filteredData = data.filter((row) =>
      headers.some((header) =>
        row[header.id]?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );

    // Paginate the filtered data
    const paginatedData = filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    // Measure column widths after rendering
    useEffect(() => {
      const calculateWidths = () => {
        if (headerRefs.current.length) {
          const widths = headerRefs.current.map((ref) => {
            const rect = ref?.getBoundingClientRect();
            return rect ? rect.width : 0;
          });
          setColumnWidths(widths);
        }
      };

      calculateWidths();
    }, [headers, filteredData]);

    return (
      <>
        {/* Search Field */}
         

        {/* Table */}
        <CommanTableContain ref={ref}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>

              
                {headers.map((header, index) => {
                  const leftPosition = columnWidths
                    .slice(0, index)
                    .reduce((acc, width) => acc + width, 0);

                  return (
                    <TableCell
                      key={header.id}
                      ref={(el) => (headerRefs.current[index] = el)}
 
                    >
                      {header.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map((header, index) => {
                    const leftPosition = columnWidths
                      .slice(0, index)
                      .reduce((acc, width) => acc + width, 0);

                    return (
                      <TableCell
                        key={header.id}
                        sx={{

                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {row[header.id] || "-"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CommanTableContain>

        {/* Pagination */}
        <PaginationContain>
          <TablePagination
            component="div"
            count={filteredData.length} // Total number of filtered rows
            page={page} // Current page
            onPageChange={handleChangePage} // Function to handle page change
            rowsPerPage={rowsPerPage} // Number of rows per page
            onRowsPerPageChange={handleChangeRowsPerPage} // Function to handle rows per page change
            rowsPerPageOptions={[5, 10, 15]} // Options for rows per page
          />
        </PaginationContain>
      </>
    );
  }
);

export default MuiTable;
