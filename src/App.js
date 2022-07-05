import "./App.css";
import URLRoutes from "./router";
// import toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast-configuration method,
// it is compulsory method.
toast.configure();

const env = process.env.REACT_APP_JWT_SECRET

function App() {
  return (
    <div className="App">
      <URLRoutes/>
    </div>
  );
}

export default App;
