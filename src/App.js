import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Bookmark from './pages/Bookmark';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route element={<Home/>} path='/'/>
          <Route element={<Bookmark/>} path='/bookmark'/>
      </Routes>

    </div>
  );
}

export default App;
