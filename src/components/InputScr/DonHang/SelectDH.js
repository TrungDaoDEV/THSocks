import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { urlAPI, tabs, getDataWithHeader, GET_DONHANG, INSERT_DONHANG, UPDATE_DONHANG, DELETE_DONHANG } from '../../../common/config'
import axios from 'axios';
import styleCommon from '../../../theme/styleCommon'


export default function SelectDH(props) {
    const { navigation, route } = props;
    const { setIdDH, setNgayDat, setTenHH, setMau, idKH, setIdCTDH, tenKH } = route.params;
    const [dataDH, setDataDH] = useState([]);
    const [idDHag, setIdDHag] = useState();
    const [ngayDH, setNgayDH] = useState('');
    const [tinhTrang, setTinhTrang] = useState(0);
    const { text, button1, inputTxt } = styleCommon;

    const header = { 'idKH': `${idKH}` };
    useEffect(() => {
        getDataWithHeader(GET_DONHANG, setDataDH, header);
        return () => {
        }
    }, [])
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
                                handleThemDH();
                                break;
                            case 'Sửa':
                                handleSuaDH();
                                break;
                            case 'Xóa':
                                handleXoaDH();
                                break;
                            default:
                                handleChonDH();
                                break;
                        }
                    }}
                >
                    <Text style={{ fontSize: 20, color: 'white' }} >{tab}</Text>
                </TouchableOpacity>
            )
        })

    const handleChonDH = () => {
        setIdDH(idDHag);
        setNgayDat(ngayDH);
        setTenHH('');
        setMau('');
        setIdCTDH('');
        navigation.goBack();
    }
    const handlePrintScr = ({ idDH, NgayDat, TinhTrang }) => {
        setIdDHag(idDH);
        setNgayDH(NgayDat);
        setTinhTrang(TinhTrang);
    }
    const handleThemDH = () => {
        var url = urlAPI + INSERT_DONHANG;
        ngayDH === '' ? alert("Vui lòng nhập Ngày đặt vào !")
            : axios.post(url, {
                NgayDat: ngayDH,
                TinhTrang: (tinhTrang === '' || tinhTrang === null) ? 0 : tinhTrang,
                idKH: idKH
            })
                .then((res) => {
                    getDataWithHeader(GET_DONHANG, setDataDH, header);
                })
                .catch((err) => console.log(err))
        setTinhTrang('');
        setNgayDH('');
    }
    const handleSuaDH = () => {
        var url = urlAPI + UPDATE_DONHANG;
        axios.post(url, {
            idDH: idDHag,
            NgayDat: ngayDH,
            TinhTrang: tinhTrang,
            idKH: idKH
        })
            .then((res) => {
                getDataWithHeader(GET_DONHANG, setDataDH, header);
            })
            .catch((err) => console.log(err))
        setTinhTrang('');
        setNgayDH('');
    }
    const handleXoaDH = () => {
        var url = urlAPI + DELETE_DONHANG;
        axios.post(url, {
            idDH: idDHag,
        })
            .then((res) => {
                getDataWithHeader(GET_DONHANG, setDataDH, header);
            })
            .catch((err) => console.log(err))
        setTinhTrang('');
        setNgayDH('');
    }

    const renderItems = ({ item, index }) => {
        return (
            <TouchableOpacity
                //style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                onPress={() => {
                    handlePrintScr(item);
                }}
            >
                {/* <Text style={text}>idDH {item.idDH}</Text> */}
                <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
                {
                    item.TinhTrang === '0' ?
                        <Text style={[text, { fontSize: 20, color: 'green' }]}>Ngày Đặt:  {item.NgayDat}</Text>
                        :
                        <Text style={[text, { fontSize: 20, color: 'red' }]}>Ngày Đặt:  {item.NgayDat}</Text>
                }
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView>
            <Text style={[text, { fontSize: 30, color: 'blue' }]}>Chọn Đơn Hàng</Text>
            <Text style={text}>Công ty: {tenKH}</Text>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={text}>Ngày Đặt:  </Text>
                    <TextInput
                        style={inputTxt}
                        placeholder='Ngày đặt'
                        onChangeText={(txt) => setNgayDH(txt)}
                        value={ngayDH}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={text}>Tình trạng:</Text>
                    <TextInput
                        style={inputTxt}
                        placeholder='Tình trạng'
                        onChangeText={(txt) => setTinhTrang(txt)}
                        value={tinhTrang}
                    />
                </View>
            </View>
            <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {DayNutBam}
            </View>
            <FlatList
                data={dataDH}
                renderItem={renderItems}
                keyExtractor={item => item.idDH}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({})
