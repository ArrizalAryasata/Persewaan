import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import Navbar from '../component/Navbar';
class sewa extends Component {
    constructor() {
        super();
        this.state = {
            sewa: [],
            id_sewa: "",
            id_lapangan: "",
            id_user: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
            status: "",
        }
        // jika tidak terdapat data token pada lokal storage
        // if(!localStorage.getItem("Token")){
        //     // direct ke halaman login
        //     // window.location = "/login";
        // }
    }
    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }
    // fungsi untuk membuka form tambah data
    Add = () => {
        // membuka modal
        $("#modal_sewa").modal("show");
        // mengosongkan data pada form
        this.setState({
            action: "insert",
            id_sewa: "",
            id_lapangan: "",
            id_user: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
            status: ""
        });
    }
    // fungsi untuk membuka form edit data
    Edit = (item) => {
        // membuka modal
        $("#modal_products").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id_sewa: item.id_sewa,
            id_lapangan: item.id_lapangan,
            id_user: item.id_user,
            tgl_book: item.tgl_book,
            wkt_mulai: item.wkt_mulai,
            wkt_selesai: item.wkt_selesai,
            durasi: item.durasi,
            biaya: item.biaya,
            biaya: item.biaya,
            status: item.status
        });
    }
    get_sewa = () => {
        // $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/sewa";
        axios.get(url)
        .then(response => {
            this.setState({sewa: response.data.sewa});
            // $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }
    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/drop/" + id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_sewa();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    componentDidMount = () => {
      this.get_sewa();

    }
    render() {
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-danger">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Sewa</h4>
                            </div>
                        </div>

                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin faspinner"></span> Sedang Memuat
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ID Lapangan</th>
                                    <th>ID User</th>
                                    <th>Tgl Book</th>
                                    <th>Waktu Mulai</th>
                                    <th>Waktu Selesai</th>
                                    <th>Durasi</th>
                                    <th>Biaya</th>
                                    <th>Status</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.sewa.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id_sewa}</td>
                                            <td>{item.id_lapangan}</td>
                                            <td>{item.id_user}</td>
                                            <td>{item.tgl_book}</td>
                                    <td>{item.wkt_mulai}</td>
                                            <td>{item.wkt_selesai}</td>
                                            <td>{item.durasi}</td>
                                            <td>{item.biaya}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                    <span className="fa fa-check"></span>Edit
                                                </button>
                                                <button className="m-1 btn btn-sm btn-primary"
                                                    onClick={() => this.Drop(item.id)}>
                                                    <span className="fa fa-trash"></span>Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* tombol tambah */}
                        <button className="btn btn-success my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Tambah Data
                        </button>

                        {/* form modal siswa*/}
                        {/* <Modal id="modal_products" title="Form Produk" bg_header="primary"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                Nama Barang
                                <input type="text" className="form-control" name="name"
                                  value={this.state.name} onChange={this.bind} required />
                                Stok
                                <input type="text" className="form-control" name="stock"
                                  value={this.state.stock} onChange={this.bind} required />
                                Harga
                                <input type="text" className="form-control" name="price" value={this.state.price}
                                  onChange={this.bind} required />
                                Deskripsi
                                <input type="text" className="form-control" name="description" value={this.state.description}
                                  onChange={this.bind} required />
                                Gambar
                                <tr>
                                  <input type="file" className="file-control" name="image"
                                    onChange={this.bindImage} required />
                                </tr>
                                <button type="submit" className="btn btn-info pull-right m-2">
                                  <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal> */}
                    </div>
                </div>


            </div>
        );
    }
}

export default sewa;
