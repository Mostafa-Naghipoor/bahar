import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import Plants from "./components/plants";
import AdminPlants from "./components/admin_plants";
import PlantForm from "./components/plantForm";
import Customers from "./components/customers";
import Purchases from "./components/purchases";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import 'react-toastify/dist/ReactToastify.css';
import MainOne from "./components/mainOne";
import Footer from "./components/footer";
import AdminPlantsNew from "./components/admin_plants_new";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log("user+++++",user);
    this.setState({ user });
  }
  
  render() {
    const { user } = this.state;
      
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <MainOne />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/plants/:id" component={PlantForm} />
            <ProtectedRoute path="/admin/plants/new" component={PlantForm} />

            <Route
              path="/plants"
              render={props => <Plants {...props} user={this.state.user} />}
            />
          
            <Route path="/customers" component={Customers} />
            <Route path="/admin/plants" component={AdminPlants} />
            <Route path="/admin/plants/new" component={AdminPlantsNew} />


            <Route path="/purchases" component={Purchases} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/plants" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}



export default App;
