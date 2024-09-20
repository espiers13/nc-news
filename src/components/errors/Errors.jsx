import { Box, Alert, Button } from "@mui/material";

export function ArticleError(errorMessage) {
  return (
    <Box
      sx={{
        height: "",
        maxWidth: "95%",
        textAlign: "center",
        p: 1,
        marginTop: 5,
        marginBottom: 100,
      }}
    >
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small">
            <a id="error-button" href="/">
              RETURN
            </a>
          </Button>
        }
      >
        Article does not exist.
      </Alert>
    </Box>
  );
}

export function PathwayError() {
  return (
    <Box
      sx={{
        height: "",
        maxWidth: "95%",
        textAlign: "center",
        p: 1,
        marginTop: 5,
        marginBottom: 100,
      }}
    >
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small">
            <a id="error-button" href="/">
              RETURN
            </a>
          </Button>
        }
      >
        Page does not exist
      </Alert>
    </Box>
  );
}
