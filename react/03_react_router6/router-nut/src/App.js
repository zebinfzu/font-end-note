import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Route path="/" exact component={HomePage} />
        <Route path="/user" component={UserPage} />
        <Route path="/login" component={LoginPage} />
      </Router>
    </div>
  );
}

export default App;
