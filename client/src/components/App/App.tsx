import { Login } from "../Login/Login";
import { Dashboard } from "../Dashboard/Dashboard";

const code = new URLSearchParams(window.location.search).get("code");
const App = () => {
  return <div className="app">{code ? <Dashboard code={code} /> : <Login />}</div>;
};

export default App;
