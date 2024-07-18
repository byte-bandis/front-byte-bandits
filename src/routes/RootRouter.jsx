import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProductList from "../pages/product/ProductList";
import ProductView from "../pages/product/ProductView";

const RootRouter = () => {
	return (
		<>
			<Routes>
				<Route path='/login' element={<LoginPage />}></Route>
				<Route path='/register' element={<RegisterPage />}></Route>
				<Route path='/admin' element={<Outlet />}>
					<Route index element={<div>admin home</div>} />
					<Route path=':advetId' element={<div>admin advert detail</div>} />
					<Route path='new' element={<div>admin new</div>} />
				</Route>
				<Route path='/' element={<h1>Home</h1>} />
				<Route path='/product' element={<Outlet />}>
					<Route index element={<ProductList />} />
					<Route path=':productId' element={<ProductView />} />
				</Route>
				<Route path='/404' element={<NotFound />} />
				<Route path='*' element={<Navigate to='/404' />} />
			</Routes>
		</>
	);
};

export default RootRouter;
