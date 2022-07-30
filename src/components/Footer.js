import { Box, Container, Typography } from "@mui/material";
import React from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <a
        style={{ color: "inherit" }}
        href="https://shahirk48.github.io/dev-portf"
        target={"_blank"}
        rel="noreferrer"
      >
        Shaheer
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <div className="marginTop stickBottom">
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">built with care.</Typography>
          <Copyright />
        </Container>
      </Box>
    </div>
  );
}

export default Footer;
