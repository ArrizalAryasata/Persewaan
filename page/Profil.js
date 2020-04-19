import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import Image from '../image/profil.jpeg';
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Profil extends Component {
    constructor() {
        super();
        this.state = {
            profil: [],
            id_user: "",
            first_name: "",
            last_name: "",
            gender: "",
            date_birth: "",
            no_hp: "",
            alamat: "",
            action: "",
            find: "",
            message: ""
        }

        

        // if(!localStorage.getItem("Token")){
        //     window.location = "/login";
        // }
    }
    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (e) => {
        this.setState({image: e.target.files[0]})
      }
    
    Edit = (item) => {
        // membuka modal
        $("#modal_user").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id_user: item.id_user,
            first_name: item.first_name,
            nama_lengkap: item.nama_lengkap,
            date_birth: item.date_birth,
            jenis_kelamin: item.jenis_kelamin,
            no_hp: item.no_hp,
            alamat: item.alamat,
            image: item.image,
        });        
    }
    get_user = () => {
        let id = JSON.parse(localStorage.getItem('id_user'))
        let url = "http://localhost/onlen/public/user/"+id;
        axios.get(url)
        .then(response => {
            console.log(response)
            this.setState({
                user: response.data.user,
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    componentDidMount = () => {
        this.get_user();
        this.get_alamat();
    }
    Save = (event) => {
        console.log(this.state.id_user)
        event.preventDefault();
        $("#modal_user").modal("hide");
        let url = "http://localhost/onlen/public/user/save_profil";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_user", this.state.id_user);
        form.append("last_name", this.state.last_name);
        form.append("gender", this.state.gender);
        form.append("role", this.state.role);
        form.append("first_name", this.state.first_name);
        form.append("nama_lengkap", this.state.nama_lengkap);
        form.append("date_birth", this.state.date_birth);
        form.append("jenis_kelamin", this.state.jenis_kelamin);
        form.append("alamat", this.state.alamat);
        form.append("no_hp", this.state.no_hp);
        form.append("image", this.state.image);
        axios.post(url, form)
        .then(response => {
            this.setState({
                message: response.data.message});
                $("#message").toast("show");
                this.get_user();
        })
        .catch(error => {
            console.log(error);
        });
    }
    render(){
        const { user } = this.state;
        // const { user, last_name } = this.state;
        console.log(user)
        // console.log(last_name);
        return (
            <div className="container">
            <div className="card mt-2">
                <div style={{ paddingTop: "5%", paddingLeft: "7%" }}>
                  <div className="#" style={{ maxwidth: "200px" }}>
                    <div className="row no-gutters">
                    {this.state.user.map((item, index) => {
                        return (
                        <div className="col-md-4" key = {index}>            
                            
                    <img className="rounded float-left" src={'http://localhost/onlen/public/images/' + item.image} style={{ height: "240px", width: "200px" }} onChange={this.bindImage} required />
                </div>
                );
            })}
                <div style={{ paddingTop: "2%", paddingLeft: "0%" }}>
                <div className="card-body">
                    <h4 className="card-title" style={{ fontWeight: "700" }}>Profile</h4>
                    <table className="table table-borderless">
                    {this.state.user.map((item) => {
                        return (
                            <ul class="list-group">
                            <li class="list-group-item">First name : {item.first_name}</li>
                            <li class="list-group-item">Last name : {item.last_name}</li>
                            <li class="list-group-item">Gender : {item.gender}</li>
                            <li class="list-group-item">Tanggal Lahir : {item.date_birth}</li>
                            <li class="list-group-item">No Hp : +62{item.no_hp}</li>
                            <li class="list-group-item">Tanggal Lahir : {item.alamat}</li>
                            <button className="m-1 btn btn-sm btn-outline-dark" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>Edit
                            </button>
                            </ul>
                        );
                    })}
                    
                    {/* <h4 className="card-title" style={{ fontWeight: "700" }}>Data Alamat </h4>
                    <li className="list-group-item"> <textarea className="text-secondary" cols="50" rows="5">Isi Alamat </textarea> </li>
                    <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                    </button> */}
                    </table>
                    </div>
                    </div>
                <Modal id="modal_user" title="Form User" bg_header="success" text_header="white">
                <form onSubmit={this.Save}>
            Username
            <input type="text" className="form-control" name="first_name"
            value={this.state.first_name} onChange={this.bind} required />
            Nama Lengkap
            <input type="text" className="form-control" name="nama_lengkap"
            value={this.state.nama_lengkap} onChange={this.bind} required />
            No KTP
            <input type="text" className="form-control" name="date_birth"
            value={this.state.date_birth} onChange={this.bind} required />
            Jenis Kelamin
            <input type="text" className="form-control" name="jenis_kelamin"
            value={this.state.jenis_kelamin} onChange={this.bind} required />
            Tanggal Lahir
            <input type="text" className="form-control" name="alamat"
            value={this.state.alamat} onChange={this.bind} required />
            No HP
            <input type="text" className="form-control" name="no_hp" 
            value={this.state.no_hp} onChange={this.bind} required /> 
            Gambar
            <input type="file" className="file-control" name="image"
            onChange={this.bindImage} required />
            <button type="submit" className="btn btn-info pull-right m-2">
            <span className="fa fa-check"></span> Simpan
            </button>
            </form>
            </Modal>

            <Modal id="modal_alamat" title="Form User" bg_header="success" text_header="white">
                <form onSubmit={this.Save_alamat}>
            Nama Penerima
            <input type="text" className="form-control" name="nama_penerima"
            value={this.state.nama_penerima} onChange={this.bind} required />
            Kode Pos
            <input type="text" className="form-control" name="kode_pos"
            value={this.state.kode_pos} onChange={this.bind} required />
            Kecamatan
            <input type="text" className="form-control" name="kecamatan"
            value={this.state.date_birth} onChange={this.bind} required />
            Kota
            <input type="text" className="form-control" name="kota"
            value={this.state.kota} onChange={this.bind} required />
            Jalan
            <input type="text" className="form-control" name="jalan"
            value={this.state.jalan} onChange={this.bind} required />
            RT
            <input type="text" className="form-control" name="rt" 
            value={this.state.rt} onChange={this.bind} required /> 
            Rw
            <input type="text" className="form-control" name="rw" 
            value={this.state.rw} onChange={this.bind} required /> 
            <button type="submit" className="btn btn-info pull-right m-2">
            <span className="fa fa-check"></span> Simpan
            </button>
            </form>
            </Modal>
            </div>
            </div>
            </div>
            </div>
            </div>
        );
    }
}

export default Profil;