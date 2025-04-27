import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router';
import './index.css';
import App from './App.tsx';
import {Provider} from 'react-redux';
import store from './redux/index.ts';
import {Bounce, ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
		</BrowserRouter>
	</Provider>
);
