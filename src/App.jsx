import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/pageNotFound";
import Login from "./pages/login";
import UserRegisterFlow from "./pages/signup";
import { RouteManagement } from "./components/routeManagement";
import { VerifyAccount } from "./pages/verifyaccount";
import { ForgotPassword } from "./pages/forgotpassword";
import { ResetPassword } from "./pages/resetpassword";
import { ResendVerification } from "./pages/resendverify";
import ReportIncident from "./pages/report"
import { setAuthToken } from "./hooks/golbalAuth";
import { useSelector } from "react-redux";

function App() {
  const islogin = useSelector((state) => state.auth.token);
  setAuthToken(islogin);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/verifycompanyaccount" element={<VerifyAccount />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/companyresetpassword" element={<ResetPassword />} />
          <Route path="/resendverify" element={<ResendVerification />} />
          <Route path="/report" element={<ReportIncident />} />

          <Route
            path="/signup"
            element={!islogin ? <UserRegisterFlow /> : <PageNotFound />}
          />
          <Route
            path="/login"
            element={!islogin ? <Login /> : <PageNotFound />}
          />
          <Route path="/*" element={<RouteManagement islogin={islogin} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
