import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react';
import { tabs, urlAPI, DELETE_KHACHHANG, UPDATE_KHACHHANG, GET_KHACHHANG, INSERT_KHACHHANG, getDataIn } from '../../../common/config';
import axios from 'axios';
import styleCommon from '../../../theme/styleCommon'

export default function SelectKH(props) {
    const { navigation, route } = props;
    const { setIdKH, setTenKH, setIdCTDH, setIdDH } = route.params;
    const [dataKH, setDataKH] = useState([]);
    const [idKHag, setIdKHag] = useState('');
    const [tenKHag, setTenKHag] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [soDT, setSoDT] = useState('');
    const [ghiChu, setGhiChu] = useState('');
    const { text, button1 ,inputTxt} = styleCommon;

    useEffect(() => {
        getDataIn(GET_KHACHHANG, setDataKH);
        return () => {
        }
    }, [])
    const handleSelectKH = () => {
        setIdKH(idKHag);
        setTenKH(tenKHag);
        setIdDH('');
        setIdCTDH('');
        navigation.goBack();
    }
    const handlePrintScr = ({ idKH, TenKH, DiaChi, SoDT, GhiChu }) => {
        setIdKHag(idKH);
        setTenKHag(TenKH);
        setDiaChi(DiaChi);
        setSoDT(SoDT);
        setGhiChu(GhiChu);
    }
    const handleThemKH = () => {
        var url = urlAPI + INSERT_KHACHHANG;
        tenKHag === '' ? alert("Vui lòng nhập Tên Khách!") :
            axios.post(url, {
                TenKH: tenKHag,
                DiaChi: diaChi,
                SoDT: soDT,
                GhiChu: ghiChu
            })
                .then((res) => {
                    getDataIn(GET_KHACHHANG, setDataKH);
                })
                .catch((err) => console.log(err))
        setTenKHag('');
        setDiaChi('');
        setSoDT('');
        setGhiChu('');
    }
    const handleSuaKH = () => {
        var url = urlAPI + UPDATE_KHACHHANG;
        axios.post(url, {
            idKH: idKHag,
            TenKH: tenKHag,
            DiaChi: diaChi,
            SoDT: soDT,
            GhiChu: ghiChu
        })
            .then((res) => {
                getDataIn(GET_KHACHHANG, setDataKH);
            })
            .catch((err) => console.log(err))
        setTenKHag('');
        setDiaChi('');
        setSoDT('');
        setGhiChu('');
    }
    const handleXoaKH = () => {
        var url = urlAPI + DELETE_KHACHHANG;
        axios.post(url, {
            idKH: idKHag,
        })
            .then((res) => {
                getDataIn(GET_KHACHHANG, setDataKH);
            })
            .catch((err) => console.log(err))
        setTenKHag('');
        setDiaChi('');
        setSoDT('');
        setGhiChu('');
    }
    const DayNutBam =
        tabs.map((tab) => {
            return (
                <TouchableOpacity key={tab}
                    style={{
                        flex: 1, height: 50, backgroundColor: 'gray',
                        justifyContent: 'center', margin: 5, alignItems: 'center',
                        borderRadius: 20
                    }}
                    onPress={() => {
                        switch (tab) {
                            case 'Thêm':
                                handleThemKH();
                                break;
                            case 'Sửa':
                                handleSuaKH();
                                break;
                            case 'Xóa':
                                handleXoaKH();
                                break;
                            default:
                                handleSelectKH();
                                break;
                        }
                    }}
                >
                    <Text style={{ fontSize: 20, color: 'white' }} >{tab}</Text>
                </TouchableOpacity>
            )
        })

    const renderItems = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'space-between' }}
                onPress={() => {
                    handlePrintScr(item);
                }}
            >
                {/* <View style={{ flex: 1 }}>
                    <Text>id {item.idKH}</Text>
                </View> */}
                <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={text}>KH: {item.TenKH}</Text>
                    <Text style={text}>ĐT: {item.SoDT}</Text>
                    <Text style={text}>ĐC: {item.DiaChi}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <Text style={[text, { fontSize: 25, color: 'blue' }]}>Khách Hàng</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{height:90, flex:1}}>
                    <TextInput
                        style={inputTxt}
                        placeholder='Tên Khách Hàng'
                        onChangeText={(txt) => setTenKHag(txt)}
                        value={tenKHag}
                    />
                    <TextInput
                        style={inputTxt}
                        placeholder='Số ĐT'
                        onChangeText={(txt) => setSoDT(txt)}
                        value={soDT}
                    />
                </View>
                <View>
                    <TextInput
                        style={inputTxt}
                        placeholder='Địa chỉ'
                        onChangeText={(txt) => setDiaChi(txt)}
                        value={diaChi}
                    />
                    <TextInput
                        style={inputTxt}
                        placeholder='Ghi chú'
                        onChangeText={(txt) => setGhiChu(txt)}
                        value={ghiChu}
                    />
                </View>
            </View>
            <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {DayNutBam}
            </View>
            <FlatList
                data={dataKH}
                renderItem={renderItems}
                keyExtractor={item => item.idKH}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({})
