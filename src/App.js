import "./App.css";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Box, Stack } from "@mui/material";

import URLRoutes from "./router";
import Navbar from "./Pages/Navbar";
import Sidebar from "./Components/SideNavbar/sidebar";
import Rightbar from "./Components/Rightbar/rightbar";

import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "./Auth/auth-slice";
import { getDataFromLocal } from "./Hooks/useLocalStorage";

// import toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast-configuration method,
// it is compulsory method.
toast.configure();

const env = process.env.REACT_APP_JWT_SECRET;

function App() {
  const [mode, setMode] = useState("dark");
  const { status, isLoggedIn } = useSelector(getAuth);
  const login = getDataFromLocal('isLoggedIn',false)

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"white"} style={{height:"100%"}}>
        {login ? (
          <>
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent={"space-between"} style={{height:"100%"}}>
              <Sidebar mode={mode} setMode={setMode} sx={{ flex: 2 }} />
              <URLRoutes />
              <Rightbar sx={{ flex: 1 }} />
            </Stack>
          </>
        ) : (
          <URLRoutes/>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
