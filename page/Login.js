import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Toast from "../component/Toast";
import $ from "jquery";

class Login extends Component {
  constructor() {
    super();
    this.state = {
        action:"insert",
        id:"",
        username:"",
        password:"",
        role:"member",
        message:""
    }
}

bind = (e) => {
    this.setState({ [e.target.name]: e.target.value })
}

Save = (event) => {
    event.preventDefault();
    let url = "http://localhost/lapangan/public/login";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id", this.state.id);
    form.append("username", this.state.username);
    form.append("password", this.state.password);
    form.append("role", this.state.role);
    // form.append("img_user", this.state.img_user, this.state.img_user.name);
    axios.post(url, form)

    .then(response => {
      this.setState({message: response.data.message});
      $("#message").toast("show");
      window.location = "/lapangan";
    })
    .catch(error => {
      console.log(error);
    });
  }

render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login</h1>
           <form onSubmit={this.Save}>
             <div className="nama">
               <label htmlfor="nama">Nama</label>
               <input 
               type="text" 
               className="" 
               placeholder="nama" 
               type="text" 
               name="username"
               value={this.state.username} onChange={this.bind} required
               >
               </input>
             </div>
             <div className="password">
               <label htmlfor="password">Password</label>
               <input 
               type="password" 
               className="" 
               placeholder="Password" 
               type="password" 
               name="password" 
               value={this.state.password} onChange={this.bind} required
               >
               </input>
             </div>
             <br/>
             <button type="submit" className="btn btn-block btn-success" >
              <span className="fa fa-check"></span> Simpan
            </button>
           </form>
           <Link to="/login"></Link>
           <Toast id="message" autohide="true" title="Informasi">
            {this.state.message}
          </Toast>
        </div>
      </div>
    );
}
}


export default Login;
