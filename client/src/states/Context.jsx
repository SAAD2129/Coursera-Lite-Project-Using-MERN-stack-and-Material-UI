import { useContext, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "./Actors/Courses";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { courses } = useSelector((state) => state.coursesData);
  const [loading, setLoading] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [lectures, setLectures] = useState([]);
  const filterCourses = (category) => {
    setLoading(true);
    if (category === "All") {
      setLoading(false);
      setFilteredCourses(courses);
      return;
    }
    let filtered = courses?.filter(
      (course) => course.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredCourses(filtered);
    setLoading(false);
  };
  const disableAlert = () => {
    const id = setTimeout(() => {
      setAlert(false);
      setAlertMsg("");
    }, 2500);

    return () => clearTimeout(id);
  };
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
    console.log(theme);
  };

  const getCourseLectures = async (id) => {
    const response = await fetch("http://localhost:5000/api/v3/lectures", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "course-id": id,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setLectures(data.lectures);
    } else {
      toast.error(data.message);
    }
  };
  // CRUD OPERATIONS for course @params id
  const deleteCourse = async (id) => {
    const response = await fetch("http://localhost:5000/api/v2/course", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "course-id": id,
        token: localStorage.getItem("auth-token"),
      },
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  return (
    <AppContext.Provider
      value={{
        courses,
        deleteCourse,
        getCourseLectures,
        lectures,
        setLectures,
        loading,
        toggleTheme,
        theme,
        filterCourses,
        setLoading,
        filteredCourses,
        setFilteredCourses,
        alert,
        setAlert,
        disableAlert,
        alertMsg,
        setAlertMsg,
        alertType,
        setAlertType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
