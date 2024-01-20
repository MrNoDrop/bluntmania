import React from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import GamePage from "./path/gamePage";
import LoginPage from "./path/loginPage";
import RegisterPage from "./path/registerPage";
import Redirect from "../components/redirect";
import ForgotPasswordPage from "../paths/path/forgotPasswordPage";
import MainMenuPage from "./path/gamePages/mainMenuPage";
import ChooseLevelPage from "./path/gamePages/ChooseLevelPage";
import SettingsPage from "./path/gamePages/SettingsPage";
// import UserSearch from "../components/userSearch";

const mapStateToProps = ({ state }) => ({
  authenticationToken: state.cookie["authentication-token"],
});

function Paths({ authenticationToken }) {
  return (
    <>
      <Routes>
        {authenticationToken && (
          <>
            <Route path="/" element={<GamePage />} />
            <Route
              path="/main-menu"
              element={[<GamePage />, <MainMenuPage />]}
            />
            <Route
              path="/choose-level"
              element={[<GamePage />, <ChooseLevelPage />]}
            />
            <Route
              path="/settings"
              element={[<GamePage />, <SettingsPage />]}
            />
            <Route path="/:name" element={<Redirect path="/" />} />
          </>
        )}
        ||
        {!authenticationToken && (
          <>
            {["/", "/login"].map((path, key) => (
              <Route {...{ path, key }} exact element={<LoginPage />} />
            ))}
            <Route path="/register" exact element={<RegisterPage />} />
            <Route
              path="/forgot-password"
              exact
              element={<ForgotPasswordPage />}
            />
            <Route path="/:name" element={<Redirect path="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default connect(mapStateToProps)(Paths);
