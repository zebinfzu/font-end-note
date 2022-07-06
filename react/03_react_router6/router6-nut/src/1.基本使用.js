import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";

export default function App(props) {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/*父组件中的子路由默认不渲染，需要渲染必须在子组件里面使用Outlet*/}
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function Layout(props) {
  return (
    <div className="border">
      <Link to="/">首页</Link>
      <Link to="/product">商品</Link>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
function Product() {
  return (
    <div>
      <h1>Product</h1>
    </div>
  );
}
