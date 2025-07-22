import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthConfirmation from "./pages/AuthConfirmation";
// import NewPost from "./pages/NewPost";
import PageLayout from "./components/layout/PageLayout";
import "./App.css";

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auth/confirmation" element={<AuthConfirmation />} />
        {/* <Route path="/new-post" element={<NewPost />} /> */}
      </Routes>
    </PageLayout>
  );
}

export default App;
