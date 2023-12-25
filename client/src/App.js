import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import { AppProvider } from './states/Context';
import Courses from './components/Courses';
import Register from './components/Register';
import Contact from './components/Contact';
import Profile from './components/Profile';
import { Provider } from "react-redux";
import store from './states/store';
import Course from './components/Course';
import NotFound from './components/NotFound.jsx';
import Dashboard from './components/AdminComponents/Dashboard';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import AdminCourses from './components/AdminComponents/Courses';
import Users from './components/AdminComponents/Users';
import CreateCourseForm from './components/AdminComponents/CreateCourseForm.jsx';
function App() {
  // const {theme} = useGlobalContext()
  return (
    <Provider store={store}>
      <AppProvider>
        <Router>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/admin/course" element={<CreateCourseForm />} />
            <Route path="/*" element={<NotFound />} />

          </Routes>
        </Router>
      </AppProvider >
    </Provider>
  );
}

export default App;
