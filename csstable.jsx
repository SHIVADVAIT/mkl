import { Box, Button, TableContainer } from "@mui/material";
import { borderBottom, styled } from "@mui/system";
import { Colors } from "../style/theme/index";

export const CommanTableContain = styled(TableContainer)(() => ({
  maxHeight: "400px", // Set a maximum height for the table
  border: "1px solid rgba(224, 224, 224, 1)", // Add a border around the entire table
  borderRadius: "5px", // Optional: Add rounded corners
  overflowY: "auto", // Enable vertical scrolling
  overflowX: "auto",
  marginTop: "10px",
  // Enable horizontal scrolling
  "& table": {
    width: "100%", // Ensure the table takes up the full width
    borderCollapse: "collapse", // Ensure borders collapse for a cleaner look
  },
  "& table tr th,& table tr td": {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    borderLeft: "none",
    borderTop: "none", // Remove the top border
    textAlign: "center",
    textTransform: "capitalize",
  },
  "& table thead tr:first-of-type th": {
    borderTop: "none", // Remove the top border for the header row
    // backgroundColor: "blue", // Ensure the header has a solid background color
    color: Colors.black,
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    backgroundColor:"#bec4cb",
    whiteSpace: "nowrap",
    position: "sticky", // Make the header sticky
    top: 0, // Stick to the top
    zIndex: 3, // Ensure it stays above other elements
    "& span": {
      fontSize: "12px",
      display: "block",
    },
  },
  "& table tr td:first-of-type, & table tr th:first-of-type": {
    position: "sticky", // Make the first column sticky
    left: 0, // Stick to the left
    zIndex: 4, // Ensure it stays above other elements
    // backgroundColor: "red", // Match the background color
    backgroundColor: "white",
    borderBottom: "none", 
    borderRight: "none",
    borderTop: "none", // Remove the top border for the first column
    // Remove the bottom border for the first column
    
    outline:" 0.1px solid rgba(224, 224, 224, 1)",
    // Add a left border for the first column
  },
  "& table thead tr:first-of-type th:first-of-type": {
    position: "sticky", // Make the top-left cell sticky
    left: 0, // Stick to the left
    top: 0, // Stick to the top
    zIndex: 5, // Ensure it stays above all other cells
    // backgroundColor: "yellow", // Set the background color to yellow
    backgroundColor: "#bec4cb",
    borderLeft: "1px solid rgba(224, 224, 224, 1)", // Add a left border
    borderTop: "1px solid rgba(224, 224, 224, 1)", // Add a top border
  },
  "& table tr td": {
    backgroundColor: "#fff",
    padding: "7px",
    "& button.action": {
      color: "#000",
      border: "none",
      outline: "none",
      padding: "7px 15px",
      borderRadius: "5px",
      fontSize: "12px",
      height: "30px",
      "&.save": {
        color: "#fff",
        backgroundColor: "#009000",
      },
    },
    "& a": {
      fontSize: "12px",
      color: "#007FFF",
    },
    "& input,& textarea, & select": {
      fontSize: "12px",
      width: "100%",
      padding: "5px",
      borderRadius: "5px",
    },
    "& .MuiStack-root": {
      padding: "0",
      "& .MuiFormControl-root": {
        minWidth: "150px",
        maxWidth: "150px",
        margin: "auto",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        borderRadius: "5px",
        "& label": {
          fontSize: "11px",
          top: "-5px",
        },
        "& .MuiInputBase-input": {
          padding: "9px 14px",
          height: "auto",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          display: "none",
        },
      },
    },
  },
  "& table tr:last-of-type td": {
    borderBottom: "none", // Remove the bottom border for the last row
  },
  "& table tr": {
    "&:hover": {
      "& td.Form_accepted,& td.Form_submitted": {
        backgroundColor: Colors.formAcceptedBg,
      },
      "& td.Form_in-process,& td.Form_reconsideration": {
        backgroundColor: Colors.formInprocessBg,
      },
      "& td.Form_pending": {
        backgroundColor: Colors.formInprocessBg,
      },
    },
    "& td": {
      "&.Form_accepted,&.Form_submitted": {
        color: Colors.formAccepted,
      },
      "&.Form_in-process,&.Form_reconsideration": {
        color: Colors.formInprcess,
      },
      "&.Form_pending": {
        color: Colors.formPending,
      },
    },
  },
}));

export const SmartSearchContain = styled(Box)(() => ({
  width: "200px",
  position: "relative",
  "& .MuiFormControl-root": {
    margin: "0 2px",
  },
  "& label": {
    fontSize: "12px",
  },
  paddingRight: "25px",
  "& input": {
    fontSize: "12px",
    paddingRight: "25px",
    backgroundColor: "#fff",
    "&::placeholder": {
      fontSize: "12px",
    },
  },
  "& svg": {
    position: "absolute",
    right: "3px",
    top: "7px",
    color: Colors.light_gray,
  },
}));

export const PaginationContain = styled(Box)(() => ({
  border: "1px solid rgba(224, 224, 224, 1)", // Add a border around the entire pagination
  borderRadius: "5px", // Optional: Add rounded corners
  padding: "5px 0", // Decrease the height by reducing the padding
  "& .MuiTablePagination-select": {
    zIndex: 11,
  },
}));

export const PdfButton = styled(Button)(() => ({
  backgroundColor: "transparent",
  minWidth: "30px",
  borderRadius: "5px",
  color: Colors.pending,
}));

export const ContainerCustom = styled(Box)(() => ({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
  marginBottom: "10px",
  padding: "0",
  borderRadius: "5px",
}));

export const TableModal = styled(Box)(() => ({
  maxWidth: "550px",
  width: "100%",
  maxHeight: "500px",
  backgroundColor: Colors.white,
  display: "flex",
  flexDirection: "column",
  "& .ModalHeader": {
    backgroundColor: Colors.primary,
    color: Colors.white,
    fontSize: "14px",
    position: "relative",
    padding: "15px",
    "& .Title": {
      paddingRight: "30px",
    },
    "& .CloseButton": {
      position: "absolute",
      right: "5px",
      top: "8px",
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      color: Colors.white,
      "& svg": {
        color: "inherit",
      },
    },
  },
  "& .ModalBody": {
    padding: "10px",
    overflow: "hidden",
    flex: "1 1 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "420px",
    "& img": {
      maxWidth: "530px",
      width: "100%",
      maxHeight: "400px",
      objectFit: "contain",
    },
  },
}));

