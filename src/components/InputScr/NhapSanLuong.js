import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { urlAPI, DELETE_CHITIETDET, LOAD_CHITIETDET } from '../../common/config'
import styleCommon from '../../theme/styleCommon'

const windowWidth = Dimensions.get('window').width;

export default function NhapSanLuong(props) {
    const { navigation, route } = props;
    const { idMD, idCTDH, May, Ngay, ChayVo, TenHH, Mau } = route.params;
    const [slNgay, setSlNgay] = useState(0);
    const [slTC, setSlTC] = useState(0);
    const [slDem, setSlDem] = useState(0);
    const [sl, setSl] = useState([]);

    const { headerTXT, txt, h2, button1, inputTxt } = styleCommon;

    var header = {
        'idMD': `${idMD}`,
        'idCTDH': `${ChayVo}`,
        'NgayDet': `${Ngay}`,
    };
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // do something
            console.log("NHAPSANLUONG - addlistener")
        });
        getDataWithHeader(LOAD_CHITIETDET, setSl, header);
        return () => {
        }
    }, [])
    const getDataWithHeader = (type_load, setData, data) => {
        axios.get(urlAPI + type_load,
            { 'headers': data })
            .then((res) => {
                setData(res.data)
                sl.map((item) => {
                    setSlNgay(item.SL_Ngay);
                    setSlTC(item.SL_TC);
                    setSlDem(item.SL_Dem);
                });
            })
    }
    const HandleChiTietDet = () => {
        console.log(" Ngay chi tiet det " + Ngay)
        // sl.length ? saveStatus = "updateChiTietDet" : saveStatus = "insertChiTietDet";
        var url = urlAPI;
        // var url = urlAPI + INSERT_CHITIETDET;
        sl.length ? url += "updateChiTietDet" : url += "insertChiTietDet";
        console.log(url);
        axios.post(url, {
            idMD: idMD,
            idCTDH: idCTDH,
            NgayDet: Ngay,
            SL_Ngay: slNgay,
            SL_TC: slTC,
            SL_Dem: slDem
        })
            .then((res) => {
                console.log("post sau do get");
                getDataWithHeader(LOAD_CHITIETDET, setSl, header);
            })
            .catch((err) => console.log(err))
        navigation.navigate('Input', {
        })
    }
    const deleteCTD = () => {
        var url = urlAPI + DELETE_CHITIETDET;
        axios.post(url, {
            idMD: idMD,
            idCTDH: idCTDH,
            NgayDet: Ngay,
            SL_Ngay: slNgay,
            SL_TC: slTC,
            SL_Dem: slDem
        })
            .then((res) => {
                console.log("post sau do get");
                getDataWithHeader(LOAD_CHITIETDET, setSl, header);
            })
            .catch((err) => console.log(err))
    }
    const renderItems = ({ item, index }) => {
        return (
            <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
                <View
                    style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}
                >
                    <Text style={txt}>Ngày: {item.SL_Ngay}</Text>
                    <Text style={txt}>TC: {item.SL_TC}</Text>
                    <Text style={txt}>Đêm: {item.SL_Dem}</Text>
                </View>
                <View
                    style={{ flexDirection: 'row', marginVertical: 10 }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setSlNgay(item.SL_Ngay);
                            setSlTC(item.SL_TC);
                            setSlDem(item.SL_Dem);
                            console.log(" ABC " + slNgay + " TC: " + slTC + " d: " + slDem);
                        }}
                        style={button1}
                    >
                        <Text style={[txt, { color: 'white' }]}>Chép</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { deleteCTD() }}
                        style={button1}
                    >
                        <Text style={[txt, { color: 'white' }]}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', margin: 5 }}>
                <Text style={headerTXT}>NHẬP SẢN LƯỢNG</Text>
                <Text style={h2}>NGÀY {Ngay}</Text>
            </View>
            <View style={{ marginVertical: 30, alignItems: 'center' }}>
                <Text style={h2}>MÁY: {May}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 10 }}>
                <Text style={txt}>Vớ: {TenHH}</Text>
                <Text style={txt}>Màu: {Mau}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                <View>
                    <Text>SL Ngày</Text>
                    <TextInput
                        style={{ width: windowWidth / 3 - 3 }}
                        placeholder='SL Ngày'
                        keyboardType='numeric'
                        onChangeText={(text) => setSlNgay(text)}
                        value={"" + slNgay}
                    />
                </View>
                <View>
                    <Text>SL TC</Text>
                    <TextInput
                        style={{ width: windowWidth / 3 - 3 }}
                        placeholder='SL Tăng Ca'
                        keyboardType='numeric'
                        onChangeText={(text) => setSlTC(text)}
                        value={"" + slTC}
                    />
                </View>
                <View>
                    <Text>SL Đêm</Text>
                    <TextInput
                        style={{ width: windowWidth / 3 - 3 }}
                        placeholder='SL Đêm'
                        keyboardType='numeric'
                        onChangeText={(text) => setSlDem(text)}
                        value={"" + slDem}
                    />
                </View>
            </View>
            <View>
                <FlatList
                    data={sl}
                    renderItem={renderItems}
                    keyExtractor={(item, index) => index}
                />
            </View>
            <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={{
                        width: windowWidth / 4, height: 50, backgroundColor: 'gray',
                        alignItems: 'center', justifyContent: 'center',
                        borderRadius: 20
                    }}
                >
                    <Text>Quay Lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        HandleChiTietDet()
                    }}
                    style={{
                        width: windowWidth / 4, height: 50, backgroundColor: 'gray',
                        alignItems: 'center', justifyContent: 'center',
                        borderRadius: 20,
                    }}
                >
                    <Text>Lưu</Text>
                </TouchableOpacity>
            </View>
            <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('DonHang', {
                            InputSL: true,
                            idMD: idMD,
                            Ngay: Ngay,
                            idCTDH: ChayVo,
                        });
                    }}
                    style={{
                        width: windowWidth / 4, height: 50, backgroundColor: 'gray',
                        alignItems: 'center', justifyContent: 'center',
                        borderRadius: 20,
                    }}
                >
                    <Text>Đổi Mẫu</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})