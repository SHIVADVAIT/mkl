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
  Typography,
  Switch,
  Box,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Import EditIcon
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import DoneIcon from "@mui/icons-material/Done"; // Import DoneIcon (for Save)
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon (for Cancel)
import AddIcon from "@mui/icons-material/Add"; // Import AddIcon for adding a new course
import {
  CommanTableContain,
  PaginationContain,
} from "../style/Table"; // Use external styles

const headers = [
  { id: "id", label: "S.No.", sticky: true },
  { id: "course", label: "Course Category" },
  { id: "status", label: "Active Status" },
  { id: "action", label: "Action" },
];

const initialData = [
  { id: 1, course: "course1", status: "Active" },
  { id: 2, course: "course2", status: "Inactive" },
  { id: 3, course: "course3", status: "Active" },
];

const Mu = forwardRef((props, ref) => {
  const [data, setData] = useState(
    initialData.map((item) => ({
      ...item,
      isActive: item.status === "Active",
    }))
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [columnWidths, setColumnWidths] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Track the row being edited
  const [editedCourse, setEditedCourse] = useState(""); // Store the edited course name
  const [newCourseName, setNewCourseName] = useState(""); // Store the new course name
  const [newCourseStatus, setNewCourseStatus] = useState("Active"); // Store the new course status
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

  const handleStatusChange = (id) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          const isActive = !item.isActive;
          return {
            ...item,
            isActive,
            status: isActive ? "Active" : "Inactive",
          };
        }
        return item;
      })
    );
  };

  const handleEdit = (id, course) => {
    setIsEditing(id); // Set the row being edited
    setEditedCourse(course); // Set the current course name for editing
  };

  const handleSaveEdit = (id) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, course: editedCourse } : item
      )
    );
    setIsEditing(null); // Exit editing mode
    setEditedCourse(""); // Clear the edited course name
  };

  const handleCancelEdit = () => {
    setIsEditing(null); // Exit editing mode
    setEditedCourse(""); // Clear the edited course name
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id)); // Remove the row with the given ID
  };

  const handleAddCourse = () => {
    if (newCourseName.trim() === "") {
      alert("Course name cannot be empty!");
      return;
    }

    const newCourse = {
      id: data.length + 1,
      course: newCourseName,
      status: newCourseStatus,
      isActive: newCourseStatus === "Active",
    };

    setData([...data, newCourse]);
    setNewCourseName(""); // Reset the course name input
    setNewCourseStatus("Active"); // Reset the status to Active
  };

  return (
    <>
      {/* Search Field */}
      <Box className="search-container">
        <Typography variant="h6">Search</Typography>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

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
                    className={header.sticky ? "sticky-header" : ""}
                  >
                    {header.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>
                  {isEditing === item.id ? (
                    <TextField
                      value={editedCourse}
                      onChange={(e) => setEditedCourse(e.target.value)}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    item.course
                  )}
                </TableCell>
                <TableCell>
                  <Box className="status-cell">
                    <Typography className="status-label">{item.status}</Typography>
                    <Switch
                      checked={item.isActive}
                      onChange={() => handleStatusChange(item.id)}
                      size="small"
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  {isEditing === item.id ? (
                    <>
                      <DoneIcon
                        onClick={() => handleSaveEdit(item.id)}
                        sx={{ color: "blue", cursor: "pointer" }} // Update (Save) is blue
                      />
                      <CloseIcon
                        onClick={handleCancelEdit}
                        sx={{ color: "red", cursor: "pointer" }} // Cancel is red
                      />
                    </>
                  ) : (
                    <>
                      <EditIcon
                        onClick={() => handleEdit(item.id, item.course)}
                        sx={{ color: "blue", cursor: "pointer" }} // Edit is blue
                      />
                      <DeleteIcon
                        onClick={() => handleDelete(item.id)}
                        sx={{ color: "red", cursor: "pointer" }} // Delete is red
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CommanTableContain>

      {/* Pagination */}
      <PaginationContain>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
        />
      </PaginationContain>

      {/* Add New Course Section */}
      <Box mt={3} p={2} border="1px solid #ccc" borderRadius="5px">
        <Typography variant="h6">Add New Course</Typography>
        <TextField
          label="Course Name"
          variant="outlined"
          size="small"
          fullWidth
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box display="flex" alignItems="center" mb={2}>
          <Typography>Active Status</Typography>
          <Switch
            checked={newCourseStatus === "Active"}
            onChange={() =>
              setNewCourseStatus(
                newCourseStatus === "Active" ? "Inactive" : "Active"
              )
            }
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCourse}
        >
          Add Course
        </Button>
      </Box>
    </>
  );
});

export default Mu;
