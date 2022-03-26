import React, {Component} from "react";
import Card from '../components/cardevent'
import $ from "jquery";
class Event extends Component {
    constructor(){
        super()
        this.state = {
            event: [
                {
                    nama:"Hari Peringatan Laut dan Samudera Nasional",
                    tanggal:"15 Januari"
                },
                {
                    nama:"Hari Lahan Basah Sedunia",
                    tanggal:"2 Februari"
                },
                {
                    nama:"Hari Peduli Sampah Nasional",
                    tanggal:"21 Februari"
                },
                {
                    nama:"Hari Hutan Sedunia",
                    tanggal:"21 Maret"
                },
                {
                    nama:"Hari Air Sedunia",
                    tanggal:"22 Maret"
                },
                {
                    nama:"Hari Meteorologi Sedunia",
                    tanggal:"23 Maret"
                },
            ],

            action: "",
            nama: "",
            tanggal: "",
            selectedItem: null,
        }
        this.state.filterEvent=this.state.event
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
                    { this.state.filterEvent.map( (item, index) => (
                        <Card
                        nama={item.nama}
                        tanggal={item.tanggal}
                        onEdit={ () => this.Edit(item)}
                        onDrop={ () => this.Drop(item)}
                        />
                    ))}
                </div>

                <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah Data
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_event">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-header">
                                Form Event
                            </div>
                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Kegiatan
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.nama}
                                    onChange={ ev => this.setState({nama:ev.target.value})}
                                    required/>
                                    
                                    Tanggal Kegiatan
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.tanggal}
                                    onChange={ ev => this.setState({tanggal:ev.target.value})}
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
        $("#modal_event").show()
        this.setState({
            nama: "",
            tanggal: "",
            action: "insert"
        })
    }
    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal_event").show()
        this.setState({
            nama: item.nama,
            tanggal: item.tanggal,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        // menampung data state event
        let tempEvent = this.state.event
    
        if(this.state.action === "insert"){
            // menambah data baru
            tempEvent.push({
                nama: this.state.nama,
                tanggal: this.state.tanggal,
            })
        }else if(this.state.action === "update"){
            // menyimpan perubahan data
            let index = tempEvent.indexOf(this.state.selectedItem)
            tempEvent[index].nama = this.state.nama
            tempEvent[index].tanggal = this.state.tanggal
        }
    
        this.setState({event : tempEvent})
    
        // menutup komponen modal_event
        $("#modal_event").hide()
    }
    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            // menghapus data
            let tempEvent = this.state.event
            // posisi index data yg akan dihapus
            let index = tempEvent.indexOf(item)
            
            // hapus data
            tempEvent.splice(index, 1)
            
            this.setState({event: tempEvent})
        }
    }
    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter

            let keyword = this.state.keyword.toLowerCase()
            let tempEvent = this.state.event
            let result = tempEvent.filter(item => {
                return item.nama.toLowerCase().includes(keyword) ||
                item.tanggal.toLowerCase().includes(keyword)
            })

            this.setState({filterEvent: result})
        }
    }
}
export default Event;