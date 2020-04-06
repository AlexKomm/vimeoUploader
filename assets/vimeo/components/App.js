import React, { useState } from "react";
import { ThemeProvider } from "emotion-theming";
import theme from "../theme/theme";
import Navbar from "./Navbar";
import useUserData from "../hooks/useUserData";
import EmbededVideos from "./EmbededVideos";
import UserLogin from "./UserLogin";
import Modal from "./Modal";


const App = () => {
  const [userData, setUserData] = useUserData();

  const [showLoginForm, toggleLoginForm] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Navbar
        userData={userData}
        onLoginPressed={() => toggleLoginForm(!showLoginForm)}
      />
      <EmbededVideos userData={userData} />

      {showLoginForm && (
        <Modal>
          <UserLogin
            onLogin={userData => {
              toggleLoginForm(false);
              setUserData(userData);
            }}
          />
        </Modal>
      )}
    </ThemeProvider>
  );
};

export default App;
