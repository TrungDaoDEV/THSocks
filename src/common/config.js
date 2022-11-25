import axios from 'axios';

// export const urlAPI = 'http://192.168.1.39:3000/';
// export const urlAPI = 'http://192.168.0.3:3000/';
export const urlAPI = 'https://node-js-demo-trung.herokuapp.com/';

//Home.js
export const LOAD_MAYCHAY = 'loadmaychay';
//SanLuong.js
export const LOAD_SANLUONG = 'loadsanluong';
//DonHang.js
export const LOAD_DONHANG = 'loaddonhang';
export const UPDATE_MAYDET = 'updatemaydet'; //touchable Đổi mẫu-SanLuong.js
//SelectKH.js
export const GET_KHACHHANG = 'khachhang';
export const INSERT_KHACHHANG = 'insertkh';
export const UPDATE_KHACHHANG = 'updatekh';
export const DELETE_KHACHHANG = 'deletekh';
//SelectHH.js
export const GET_HANGHOA = 'hanghoa';
export const INSERT_HANGHOA = 'inserthh';
export const UPDATE_HANGHOA = 'updatehh';
export const DELETE_HANGHOA = 'deletehh';
//SelectDH.js
export const GET_DONHANG = 'donhang';
export const INSERT_DONHANG = 'insertdh';
export const UPDATE_DONHANG = 'updatedh';
export const DELETE_DONHANG = 'deletedh';
//SelectCTDH.js
export const GET_CTDH = 'ctdh';
export const INSERT_CTDH = 'insertctdh';
export const UPDATE_CTDH = 'updatectdh';
export const DELETE_CTDH = 'deletectdh';
//NhapSanLuong.js
export const LOAD_CHITIETDET = 'loadchitietdet';
export const INSERT_CHITIETDET = 'insertChiTietDet';
export const UPDATE_CHITIETDET = 'updateChiTietDet';
export const DELETE_CHITIETDET = 'deletectd';
//MayDet.js
export const LOAD_MD = 'load_md';
export const INSERT_MD = 'insert_md';
export const UPDATE_MD = 'update_md';
export const DELETE_MD = 'delete_md';
//SelectKH.js - SelectHH.js - SelectDH.js - SelectCTDH.js
export const tabs = ['Thêm', 'Sửa', 'Xóa', 'Chọn'];

export const getDataIn = async (type_load, setData) => {
    axios.get(urlAPI + type_load)
        .then((res) => {
            setData(res.data);
        })
}
export const getDataWithHeader = async (type_load, setData, data) => {
    axios.get(urlAPI + type_load,
        { 'headers': data })
        .then((res) => {
            setData(res.data)
        })
}
