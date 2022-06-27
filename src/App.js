import "./App.css";
import URLRoutes from "./router";

const env = process.env.REACT_APP_JWT_SECRET

function App() {
  return (
    <div className="App">
      <URLRoutes/>
    </div>
  );
}

export default App;
