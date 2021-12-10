import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import SideNav from "./components/Banner/SideNav";
import AllUsersPage from "./Pages/AllUsersPage";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "150vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <SideNav />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
        <Route path={"/login"} component={LoginPage} />
        <Route path={"/register"} component={RegisterPage} />
        <Route path={"/allUsers"} component={AllUsersPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
