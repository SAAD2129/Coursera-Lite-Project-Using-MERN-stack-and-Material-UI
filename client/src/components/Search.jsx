import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useGlobalContext } from "../states/Context";
import { useSelector } from "react-redux";

export default function CourseInputSearch() {
  const [query, setQuery] = React.useState("");
  const { setFilteredCourses } = useGlobalContext();
  const { courses } = useSelector((state) => state.coursesData);
  const filterQuery = (e) => {
    let filtered;
    let value = query;
    if (e !== null) {
      if (e.target.value === "" || query === "")
        return setFilteredCourses(courses);
      value = e?.target?.value;
    }
    filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCourses(filtered);
  };
  React.useEffect(() => {
    filterQuery(null);
  }, [query]);
  return (
    <Stack spacing={2}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={courses?.map((course) => course.title)}
        renderInput={(params) => (
          // eslint-disable-next-line no-sequences
          setQuery(params.inputProps.value), // Remove the semicolon and add a comma here
          (
            <TextField
              {...params}
              label="Search Courses, Titles & Authors"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              onChange={(e) => filterQuery(e, params.inputProps.value)}
              value={query || params.inputProps.value}
            />
          )
        )}
      />
    </Stack>
  );
}
