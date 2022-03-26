import React from "react"

class Card extends React.Component{
    render(){
        return (
            <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        {/*menampilkan Gambar / cover */}
                        <div className="col-5">
                            <img src={this.props.cover} className="img" height="200" />
                        </div>

                        {/*menampilkan deskripsi */}
                        <div className="col-7">
                            <h5 className="text-info">
                                { this.props.nama }
                            </h5>
                            <h6 className="text-dark">
                                Nama: { this.props.nama }
                            </h6>
                            <h6 className="text-danger">
                                Harga: Rp { this.props.harga }
                            </h6>
                            <h6 className="text-dark">
                                Jumlah: { this.props.jumlah }
                            </h6>
                            <h6 className="text-dark">
                                Total: Rp {this.props.jumlah * this.props.harga}
                            </h6>
                            
                            {/* button untuk mengedit */}
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={this.props.onEdit}>
                                Edit
                            </button>

                            {/* button untuk menghapus */}
                            <button class="bg-red-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={this.props.onDrop}>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Card;