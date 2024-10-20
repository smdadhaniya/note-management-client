import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import NotesList from "./components/notes/NotesList";
import React from "react";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/Register";
import NoteCard from "./components/notes/NoteCard";
import { Provider } from "react-redux";
import store from "./redux/store";
import AddNote from "./components/notes/AddNote";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/update-note/:id" element={<AddNote />} />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <NotesList />
              </PrivateRoute>
            }
          />
          <Route
            path="/note/:id"
            element={
              <PrivateRoute>
                <NoteCard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
