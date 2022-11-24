import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { tabs, urlAPI, LOAD_MD, UPDATE_MD, INSERT_MD, DELETE_MD, getDataIn } from '../../common/config';
import axios from 'axios';
import styleCommon from '../../theme/styleCommon';

export default function MayDet(props) {
    const [dataMayDet, setDataMayDet] = useState([]);
    const [idMD, setIdMD] = useState('');
    const [tenMay, setTenMay] = useState('');
    const [chayVo, setChayVo] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [nguon, setNguon] = useState('');
    const [tg_OFF, setTg_OFF] = useState('');
    const { text, inputTxt } = styleCommon;

    useEffect(() => {
        getDataIn(LOAD_MD, setDataMayDet);
        return () => {
        }
    }, [])

    const handleSelectMD = ({ idMD, May, ChayVo, TrangThai, Nguon, TG_OFF }) => {
        setIdMD(idMD);
        setTenMay(May);
        setChayVo(ChayVo);
        setTrangThai(TrangThai);
        setNguon(Nguon);
        setTg_OFF(TG_OFF);
    }
    const handleThemMD = () => {
        var url = urlAPI + INSERT_MD;
        tenMay === '' ? alert("Vui lòng nhập Máy Dệt!") :
            axios.post(url, {
                May: tenMay,
                ChayVo: chayVo,
                TrangThai: trangThai,
                Nguon: nguon,
                TG_OFF: tg_OFF
            })
                .then((res) => {
                    getDataIn(LOAD_MD, setDataMayDet);
                })
                .catch((err) => console.log(err))
        setTenMay('');
        setChayVo('');
        setTrangThai('');
        setNguon('');
        setTg_OFF('');
    }
    const handleSuaMD = () => {
        var url = urlAPI + UPDATE_MD;
        tenMay === '' ? alert("Vui lòng nhập Máy Dệt!") :
            axios.post(url, {
                idMD: idMD,
                May: tenMay,
                ChayVo: chayVo,
                TrangThai: trangThai,
                Nguon: nguon,
                TG_OFF: tg_OFF
            })
                .then((res) => {
                    getDataIn(LOAD_MD, setDataMayDet);
                })
                .catch((err) => console.log(err))
        setTenMay('');
        setChayVo('');
        setTrangThai('');
        setNguon('');
        setTg_OFF('');
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
                                handleThemMD();
                                break;
                            case 'Sửa':
                                handleSuaMD();
                                break;
                            case 'Xóa':
                                handleXoaMD();
                                break;
                            default:
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
                    handleSelectMD(item);
                }}
            >
                <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={text}>ID: {item.idMD}</Text>
                        <Text style={text}>Máy: {item.May}</Text>
                        <Text style={text}>ChayVo: {item.ChayVo}</Text>
                    </View>
                    <View>
                        <Text style={text}>TrangThai: {item.TrangThai}</Text>
                        <Text style={text}>Nguon: {item.Nguon}</Text>
                        <Text style={text}>TG_OFF: {item.TG_OFF}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <Text style={[text, { fontSize: 25, color: 'blue' }]}>Máy Dệt</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ height: 90, flex: 1 }}>
                    <TextInput
                        style={inputTxt}
                        placeholder='Tên Máy'
                        onChangeText={(txt) => setTenMay(txt)}
                        value={tenMay}
                    />
                    <TextInput
                        style={inputTxt}
                        placeholder='Chạy vớ'
                        onChangeText={(txt) => setChayVo(txt)}
                        value={"" + chayVo}
                    />
                </View>
                <View>
                    <TextInput
                        style={inputTxt}
                        placeholder='Trạng thái'
                        onChangeText={(txt) => setTrangThai(txt)}
                        value={"" + trangThai}
                    />
                    <TextInput
                        style={inputTxt}
                        placeholder='Nguồn'
                        onChangeText={(txt) => setNguon(txt)}
                        value={"" + nguon}
                    />
                    <TextInput
                        style={inputTxt}
                        placeholder='TG_OFF'
                        onChangeText={(txt) => setTg_OFF(txt)}
                        value={"" + tg_OFF}
                    />
                </View>
            </View>
            <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {DayNutBam}
            </View>
            <FlatList
                style={{ flex: 1 }}
                data={dataMayDet}
                renderItem={renderItems}
                keyExtractor={item => item.idMD}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})