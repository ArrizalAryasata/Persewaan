import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

// Load Navbar
import Navbar from "./component/Navbar";
// Load Halaman
import Lapangan from "./page/Lapangan";
import Field from "./page/Field";
import User from "./page/User";
import Cart from "./page/cart";
import Profil from "./page/Profil";
import Sewa from "./page/Sewa";
import Login from "./page/Login";
import Register from "./page/Register";
import Checkout from "./page/Checkout";

class Main extends Component {
  render() {
    return (
      <Switch>
        {/* Load component tiap halaman */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        {/* product */}
        <Route exact path="/lapangan">
        <Navbar />
          <Lapangan />
        </Route>
        {/* user */}
        <Route exact path="/user">
          <Navbar />
          <User />
        </Route>
        {/* product */}
        <Route exact path="/cart">
          <Navbar />
          <Cart />
        </Route>
        <Route exact path="/profil">
          <Navbar />
          <Profil />
          </Route>
          <Route exact path="/sewa">
          <Navbar />
          <Sewa />
          </Route>
          <Route exact path="/field">
          <Navbar />
          <Field />
          </Route>
          <Route exact path="/checkout">
          <Navbar />
          <Checkout />
          </Route>
      </Switch>
    );
  }
}
     // <div className="container" style={{ width: "50%" }}>
      //   <div className="card my-2">
      //     <div className="card-header bg-primary">
      //       <h5 className="text-white">Login User</h5>
      //     </div>

      //     <div className="card-body">
      //       <Toast id="message" autohide="false" title="Informasi">
      //         {this.state.message}
      //       </Toast>
      //       <form onSubmit={this.Login}>
      //         <input
      //           type="text"
      //           className="form-control m-1"
      //           name="nama_user"
      //           value={this.state.nama_user}
      //           onChange={this.bind}
      //           required
      //           placeholder="Masukkan Username"
      //         />
      //         <input
      //           type="password"
      //           className="form-control m-1"
      //           name="password"
      //           value={this.state.password}
      //           onChange={this.bind}
      //           required
      //           placeholder="Masukkan Password"
      //         />
      //         <button className="mt-2 btn btn-block btn-primary" type="submit">
      //           <span className="fa fa-sign-in"></span> Login
      //         </button>
      //       </form>
      //     </div>
      //   </div>
      // </div>

export default Main;
