import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { urlAPI, tabs, getDataWithHeader, GET_HANGHOA, UPDATE_HANGHOA, INSERT_HANGHOA, DELETE_HANGHOA } from '../../../common/config';
import axios from 'axios';
import styleCommon from '../../../theme/styleCommon';

export default function SelectHH(props) {
    const { navigation, route } = props;
    const { idKH, tenKH, setTenHHoa, setIdHHoa, setMauHHoa, setSLHHoa } = route.params;
    const [idHH, setIdHH] = useState('');
    const [dataHH, setDataHH] = useState([]);
    const [tenHH, setTenHH] = useState('');
    const header = { 'idKH': `${idKH}` };
    const { text, inputTxt } = styleCommon;

    console.log("select HH : ==> " + idKH);
    useEffect(() => {
        getDataWithHeader(GET_HANGHOA, setDataHH, header);
        return () => {
        }
    }, []);
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
                                handleThemHH();
                                break;
                            case 'Sửa':
                                handleSuaHH();
                                break;
                            case 'Xóa':
                                handleXoaHH();
                                break;
                            default:
                                handleSelectHH();
                                break;
                        }
                    }}
                >
                    <Text style={{ fontSize: 20, color: 'white' }} >{tab}</Text>
                </TouchableOpacity>
            )
        })
    const handlePrintScr = ({ idHH, TenHH }) => {
        console.log("first  " + idHH + "  " + tenHH)
        setIdHH(idHH);
        setTenHH(TenHH);
    }
    const handleSelectHH = () => {
        setIdHHoa(idHH);
        setTenHHoa(tenHH);
        setSLHHoa('');
        setMauHHoa('');
        navigation.goBack();
    }
    const handleThemHH = () => {
        var url = urlAPI + INSERT_HANGHOA;
        axios.post(url, {
            TenHH: tenHH,
            idKH: idKH,
        })
            .then((res) => {
                getDataWithHeader(GET_HANGHOA, setDataHH, header);
            })
            .catch((err) => console.log(err))
        setTenHH('');
    }
    const handleSuaHH = () => {
        var url = urlAPI + UPDATE_HANGHOA;
        axios.post(url, {
            idHH: idHH,
            TenHH: tenHH,
            idKH: idKH,
        })
            .then((res) => {
                getDataWithHeader(GET_HANGHOA, setDataHH, header);
            })
            .catch((err) => console.log(err))
        setTenHH('');
    }
    const handleXoaHH = () => {
        var url = urlAPI + DELETE_HANGHOA;
        axios.post(url, {
            idHH: idHH,
        })
            .then((res) => {
                getDataWithHeader(GET_HANGHOA, setDataHH, header);
            })
            .catch((err) => console.log(err))
        setTenHH('');
    }


    const renderItems = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'space-between' }}
                onPress={() => {
                    handlePrintScr(item);
                }}
            >
                <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
                <Text style={text}>Tên Hàng: {item.TenHH}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView>
            <Text style={[text, { fontSize: 25, color: 'blue' }]}>Hàng Hóa</Text>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={text}>Tên Hàng</Text>
                    <TextInput
                        style={inputTxt}
                        placeholder='Tên hàng'
                        onChangeText={(txt) => setTenHH(txt)}
                        value={tenHH}
                    />
                </View>
                <Text style={text}>Khách Hàng: {tenKH}</Text>
            </View>
            <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {DayNutBam}
            </View>

            <FlatList
                data={dataHH}
                renderItem={renderItems}
                keyExtractor={item => item.idHH}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
