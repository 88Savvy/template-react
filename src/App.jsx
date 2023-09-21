import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import ProtectRoute from "./components/ProtectRoute";
import HomePage from "./pages/HomePage";
import NewPostPage from "./pages/NewPostPage";
import ViewPostPage from "./pages/ViewPostPage";
import EditPostPage from "./pages/EditPostPage";
import DiscoveryPage from "./pages/DiscoveryPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="py-6 sm:px-6 lg:px-8">
        <Routes>
          {/* Rotas que não devem ser protegidas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Rota protegida de Profile*/}
          <Route
            path="/profile"
            element={<ProtectRoute Component={ProfilePage} />}
          />
          {/* Rota protegida de Profile-Settings*/}
          <Route
            path="/profile-settings"
            element={<ProtectRoute Component={ProfileSettingsPage} />}
          />
          {/* Rota protegida para a criação de novos posts */}
          <Route
            path="/new-post"
            element={<ProtectRoute Component={NewPostPage} />}
          />
          {/* Rota protegida para visualização de posts */}
          <Route
            path="/posts/:postId"
            element={<ProtectRoute Component={ViewPostPage} />}
          />
          {/* Rota protegida para visualização de posts */}
          <Route
            path="/posts/edit/:postId"
            element={<ProtectRoute Component={EditPostPage} />}
          />
          {/* Rota protegida para a página de descoberta */}
          <Route
            path="/discovery"
            element={<ProtectRoute Component={DiscoveryPage} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
