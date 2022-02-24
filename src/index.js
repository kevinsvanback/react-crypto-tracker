import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MyContextProvider from './contexts/MyContext';
import './index.css';


ReactDOM.render(
  <BrowserRouter>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

