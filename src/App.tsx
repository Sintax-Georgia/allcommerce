import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import RegistrationForm from "./pages/RegistrationForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/registration" element={<RegistrationForm />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
