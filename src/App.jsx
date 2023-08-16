import Header from "./components/header/Header"
import { Route, Routes } from "react-router-dom";
import Form from "./pages/form/Form";
import Admin from "./pages/admin/Admin";
import Notification from "./components/notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import Confirm from "./components/confirm/Confirm";
import NotFound from "./pages/notFound/NotFound";
import { Helmet } from 'react-helmet';
import Login from "./pages/login/Login";
import { useEffect } from "react";
import { auth } from "./actions/users";

function App() {
  const isNotificationVisible = useSelector(state => state.notification.isVisible);
  const isConfirmOpen = useSelector(state => state.common.confirm.isOpen);
  const formName = useSelector(state => state.form?.name);
  const isAuth = useSelector(state => state.user.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch])

  if (isAuth !== null) return (
    <div style={{ paddingBottom: "60px" }}>
      <Helmet>
        <title>{formName}</title>
      </Helmet>

      <Header />

      <Routes>
        <Route exact path="/form/:id" element={<Form />} />
        <Route exact path="/admin/*" element={<Admin />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>

      {isNotificationVisible && <Notification />}
      {isConfirmOpen && <Confirm />}
    </div>
  )
}

export default App
