import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../../common/NotFound";
import LoginPage from "../../../pages/public/LoginPage";
import HomePage from "../../../pages/private/HomePage";
import PrivateMainLayout from "../../layouts/PrivateMainLayout";
import LoginLayout from "../../layouts/LoginLayout";
import CategoryPage from "../../../pages/public/CategoryPage";
import SearchPage from "../../../pages/public/SearchPage";
import UserProfilePage from "../../../pages/public/UserProfilePage";
import CreatePinPage from "../../../pages/public/CreatePinPage";
import DetailPinPage from "../../../pages/public/DetailPinPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginLayout>
              <LoginPage />
            </LoginLayout>
          }
        />
        <Route path="/" element={<PrivateMainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile/:idUser" element={<UserProfilePage />} />
          <Route path="create-pin" element={<CreatePinPage />} />
          <Route path="pins/:idPin" element={<DetailPinPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
