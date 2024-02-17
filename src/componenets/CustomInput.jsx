import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import Box from "@mui/material/Box";
import "./componenet.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const CustomInput = (props) => {

  return (
    <div className="input">
     
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
      >
        {props.name === "price" ? (
          <TextField
            id="outlined-basic-price"
            variant="outlined"
            label={props.name}
            size="small"
            type="number"
            {...props}
          />
        ) : (
          <TextField
            id={`outlined-basic-${props.name}`}
            variant="outlined"
            size="small"
            label={props.name}
            type="text"
            {...props}
          />
        )}
      </Box>
    </div>
  );
};

export default CustomInput;
