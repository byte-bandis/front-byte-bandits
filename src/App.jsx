import './App.css'

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from './components/layout/Layout';
import RootRouter from './routes/RootRouter';
import BreadCrumb from './components/breadcrumb/BreadCrumb';

function App() {


  return (
		<>
      <Layout>
        <BreadCrumb />
        <RootRouter />
      </Layout>
		</>
	);
}

export default App
