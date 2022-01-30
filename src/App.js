import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

// routing
import Routes from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";
import { useEffect } from "react";

// ==============================|| APP ||============================== //

function getLibrary(provider) {
  return new Web3(provider);
}
const App = () => {
  const customization = useSelector((state) => state.customization);
  // useEffect(() => {
  //   window.addEventListener("load", () => {
  //     if (window.ethereum) {
  //       window.web3 = new Web3(window.ethereum);
  //       try {
  //         window.ethereum.enable().then(function () {
  //           // user allowed
  //         });
  //       } catch (e) {}
  //     } else if (window.web3) {
  //       window.web3 = new Web3(window.web3.currentProvider);
  //     } else {
  //       alert("you have to install meta mask");
  //     }
  //   });
  // }, []);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Web3ReactProvider getLibrary={getLibrary}>
            {" "}
            <Routes />
          </Web3ReactProvider>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
