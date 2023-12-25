import React from "react";
import DataTable from "./DataTable";
import AdminLayout from "../Layouts/AdminLayout";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Divider } from "@mui/material";
const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "username", headerName: "User Name", width: 150 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "role", headerName: "Role", width: 100 },
  {
    field: "isSubscribed",
    headerName: "Subscription",
    type: "number",
    width: 120,
  },
];

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const getUsers = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:5000/api/v4/admin/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("auth-token"),
      },
    });
    const data = await response.json();
    if (data.success) {
      const updatedUsers = data.users.map((user) => {
        // Create a new object with the updated key
        const { _id, isSubscribed, ...rest } = user; // Destructure to get _id and the rest of the properties
        let subs = isSubscribed ? "Active" : "In Active";
        return { id: _id, isSubscribed: subs, ...rest }; // Create a new object with id and the rest of the properties
      });

      filterUsers(updatedUsers);
    }
    setLoading(false);
  };
  const filterUsers = (updatedUsers) => {
    const admins = updatedUsers.filter((user) => user.role === "admin");
    const newusers = updatedUsers.filter((user) => user.role === "user");
    setAdmins(admins);
    setUsers(newusers);
  };
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminLayout>
      <div className="p-16">
        <div className="mx-auto mb-8">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  width: "w-max",
                  margin: "auto",
                  borderColor: "divider",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Users" value="1" />
                  <Tab label="Admins" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <DataTable rows={users} />
              </TabPanel>
              <TabPanel value="2">
                {" "}
                <DataTable rows={admins} />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Users;
