import { Box, Button, TableContainer } from "@mui/material";
import { borderRight, minWidth, styled, width } from "@mui/system";
import { Colors } from "../style/theme/";
import { padding } from "polished";
import zIndex from "@mui/material/styles/zIndex";



export const CommanTableContain = styled(TableContainer)(() => ({
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    '& table tr th, & table tr td': {
      borderRight: '1px solid rgba(224, 224, 224, 1)',
      borderBottom: 'none',
      borderLeft: 'none',
      borderTop: 'none',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    '& table thead tr:first-of-type th': {
      borderTop: '1px solid rgba(224, 224, 224, 1)',
      backgroundColor: '#bec4cb',
      color: Colors.black,
      whiteSpace: 'nowrap',
      '& span': {
        fontSize: '12px',
        display: 'block',
      },
    },
    '& .sticky-header': {
      position: 'sticky',
      top: 0, // Ensure it sticks at the top
      backgroundColor: 'white',
      zIndex: 10, // Increased zIndex to make sure it's on top of other content
      borderBottom: '2px solid #ddd',
    },
    '& .sticky-cell': {
      position: 'sticky',
      left: 0,
      backgroundColor: 'white',
      zIndex: 3,
      borderRight: '1px solid #ddd',
      boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.1)',
      boxSizing: 'border-box',
      paddingRight: '1px',
    },
    '& .non-sticky-cell': {
      backgroundColor: 'white',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      borderRight: '1px solid #ddd',
    },
  }));
  
  
  export const PaginationContain = styled(Box)(() => ({
    '& .MuiTablePagination-select': {
      zIndex: 5,
    },
    // Add left and right borders to the PaginationContain
    borderLeft: '1px solid #ddd',   // Left border
    borderRight: '1px solid #ddd',  // Right border
    padding: '0',                   // Remove extra padding if necessary
  }));


































import React, { useEffect, useState, useRef } from 'react';
import { TableBody, TableCell, TableHead, TableRow, Table, TableContainer, TablePagination } from '@mui/material';
import { CommanTableContain, PaginationContain } from "../style/Table";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0); // Current page state
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page state
  const [showPaginationBorder, setShowPaginationBorder] = useState(false); // State to control the pagination border
  const tableContainerRef = useRef(null);

  const staticHeaders = [
    { id: "User ID", label: "User ID" },
    { id: "Name", label: "Name" },
    { id: "Phone", label: "Phone", mediaModal: true },
    { id: "Email", label: "Email" },
    { id: "Status", label: "Status" },
  ];

  // Sample users data
  useEffect(() => {
    const sampleUsers = [
      { id: 1, name: "John Doe", phone: "1234567890", email: "john.doe@example.com", status: "active" },
      { id: 2, name: "Jane Smith", phone: "0987654321", email: "jane.smith@example.com", status: "inactive" },
      { id: 3, name: "Alice Johnson", phone: "1122334455", email: "alice.johnson@example.com", status: "active" },
      { id: 4, name: "Bob Brown", phone: "2233445566", email: "bob.brown@example.com", status: "active" },
      { id: 5, name: "Charlie Davis", phone: "3344556677", email: "charlie.davis@example.com", status: "inactive" },
      { id: 6, name: "David Wilson", phone: "4455667788", email: "david.wilson@example.com", status: "active" },
      { id: 7, name: "Eva White", phone: "5566778899", email: "eva.white@example.com", status: "inactive" },
      { id: 8, name: "Frank Green", phone: "6677889900", email: "frank.green@example.com", status: "active" },
      { id: 9, name: "Grace King", phone: "7788990011", email: "grace.king@example.com", status: "inactive" },
      { id: 10, name: "Henry Lee", phone: "8899001122", email: "henry.lee@example.com", status: "active" },
      { id: 11, name: "Ivy Adams", phone: "9900112233", email: "ivy.adams@example.com", status: "active" },
      { id: 12, name: "Jackie Turner", phone: "1231231234", email: "jackie.turner@example.com", status: "inactive" },
      { id: 13, name: "Liam Harris", phone: "3213214321", email: "liam.harris@example.com", status: "active" },
      { id: 14, name: "Megan Clark", phone: "4324325432", email: "megan.clark@example.com", status: "inactive" },
      { id: 15, name: "Nina Martinez", phone: "5435436543", email: "nina.martinez@example.com", status: "active" },
    ];
    setUsers(sampleUsers);
  }, []);

  // Pagination functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  // Paginated data
  const filteredData = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Check if vertical scrollbar is visible and update pagination border visibility
  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      const isVerticalScrollVisible = tableContainer.scrollHeight > tableContainer.clientHeight;
      setShowPaginationBorder(isVerticalScrollVisible);
    }
  }, [filteredData, rowsPerPage, page]);

  return (
    <CommanTableContain>
      <TableContainer 
        ref={tableContainerRef}
      >
        <Table stickyHeader sx={{ borderCollapse: 'collapse', width: '100%' }}>
          <TableHead>
            <TableRow sx={{ borderBottom: '2px solid #ddd' }}>
              <TableCell className="sticky-header">S. no.</TableCell>
              {staticHeaders.map((header) => (
                <TableCell key={header.id} className="sticky-header">
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((user, rowIndex) => (
              <TableRow key={user.id} sx={{ borderBottom: '1px solid #ddd' }}>
                <TableCell className="sticky-cell">
                  {page * rowsPerPage + rowIndex + 1}
                </TableCell>
                <TableCell className="non-sticky-cell">{user.id}</TableCell>
                <TableCell className="non-sticky-cell">{user.name}</TableCell>
                <TableCell className="non-sticky-cell">{user.phone}</TableCell>
                <TableCell className="non-sticky-cell">{user.email}</TableCell>
                <TableCell className="non-sticky-cell">{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationContain sx={{ borderTop: showPaginationBorder ? '2px solid #ddd' : 'none' }}>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </PaginationContain>
    </CommanTableContain>
  );
};

export default UserList;
