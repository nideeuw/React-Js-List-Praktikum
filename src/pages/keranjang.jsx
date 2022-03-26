import React, {Component} from "react";
import Card from '../components/cardkeranjang';
import $ from "jquery";
class Keranjang extends Component {
    constructor(){
        super()
        this.state = {
            keranjang: [
                {
                    nama:"McChicken",
                    jumlah:"2",
                    harga: 25000,
                    cover:"https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/Ppf2GZrRgXEd05rpGABx.png"
                },
                {
                    nama:"McNuggets",
                    jumlah:"1",
                    harga: 10000,
                    cover:"https://nos.jkt-1.neo.id/mcdonalds/foods/September2019/qFoLKbSe1R3OJ75zAm4B.png"
                },
                {
                    nama:"McFlurry Choco",
                    jumlah:"1",
                    harga: 15000,
                    cover:"https://nos.jkt-1.neo.id/mcdonalds/foods/July2021/FPdXFDZ8W0SsvKy53N3x.png"
                },
                {
                    nama:"Apple Pie",
                    jumlah:"3",
                    harga: 10000,
                    cover:"https://nos.jkt-1.neo.id/mcdonalds/foods/August2021/ES5gKshzZmw2LRK9n8ee.png"
                },
            ],

            action: "",
            nama: "",
            jumlah: 0,
            harga: 0,
            cover: "",
            selectedItem: null,
        }
        this.state.filterKeranjang=this.state.keranjang
    }
    render(){
        return (
            <div className="container">
                <input type="text" className="form-control my-2" placeholder="Pencarian"
                value={this.state.keyword}
                onChange={ev => this.setState({keyword: ev.target.value})}
                onKeyUp={ev => this.searching(ev)}
                />
                <div className="row">
                    { this.state.filterKeranjang.map( (item, index) => (
                        <Card
                        nama={item.nama}
                        jumlah={item.jumlah}
                        harga={item.harga}
                        cover={item.cover}
                        onEdit={ () => this.Edit(item)}
                        onDrop={ () => this.Drop(item)}
                        />
                    ))}
                </div>

                <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah Data
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_keranjang">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-header">
                                Form Keranjang
                            </div>
                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Produk
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.nama}
                                    onChange={ ev => this.setState({nama:ev.target.value})}
                                    required/>
                                    
                                    Jumlah Produk
                                    <input type="number" className="form-control mb-2"
                                    value={this.state.jumlah}
                                    onChange={ ev => this.setState({jumlah:ev.target.value})}
                                    required/>
                                    
                                    Harga Produk
                                    <input type="number" className="form-control mb-2"
                                    value={this.state.harga}
                                    onChange={ ev => this.setState({harga:ev.target.value})}
                                    required/>
                                    
                                    Cover Produk
                                    <input type="url" className="form-control mb-2"
                                    value={this.state.cover}
                                    onChange={ ev => this.setState({cover:ev.target.value})}
                                    required/>

                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    Add = () => {
        // menampilkan komponen modal
        $("#modal_keranjang").show()
        this.setState({
            nama: "",
            jumlah: "",
            cover: "",
            harga: 0,
            action: "insert"
        })
    }
    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal_keranjang").show()
        this.setState({
            nama: item.nama,
            jumlah: item.jumlah,
            cover: item.cover,
            harga: item.harga,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        // menampung data state keranjang
        let tempKeranjang = this.state.keranjang
    
        if(this.state.action === "insert"){
            // menambah data baru
            tempKeranjang.push({
                nama: this.state.nama,
                jumlah: this.state.jumlah,
                cover: this.state.cover,
                harga: this.state.harga,
            })
        }else if(this.state.action === "update"){
            // menyimpan perubahan data
            let index = tempKeranjang.indexOf(this.state.selectedItem)
            tempKeranjang[index].nama = this.state.nama
            tempKeranjang[index].jumlah = this.state.jumlah
            tempKeranjang[index].cover = this.state.cover
            tempKeranjang[index].harga = this.state.harga
        }
    
        this.setState({keranjang : tempKeranjang})
    
        // menutup komponen modal_keranjang
        $("#modal_keranjang").hide()
    }
    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            // menghapus data
            let tempKeranjang = this.state.keranjang
            // posisi index data yg akan dihapus
            let index = tempKeranjang.indexOf(item)
            
            // hapus data
            tempKeranjang.splice(index, 1)
            
            this.setState({keranjang: tempKeranjang})
        }
    }
    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter

            let keyword = this.state.keyword.toLowerCase()
            let tempKeranjang = this.state.keranjang
            let result = tempKeranjang.filter(item => {
                return item.nama.toLowerCase().includes(keyword) ||
                item.jumlah.toLowerCase().includes(keyword) ||
                item.harga.toLowerCase().includes(keyword)
            })

            this.setState({filterKeranjang: result})
        }
    }
}
export default Keranjang;