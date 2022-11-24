import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { urlAPI, tabs, GET_CTDH, getDataWithHeader, DELETE_CTDH, INSERT_CTDH, UPDATE_CTDH } from '../../../common/config'
import axios from 'axios';
import styleCommon from '../../../theme/styleCommon'

export default function SelectCTDH(props) {
  const { navigation, route } = props;
  const { setIdHH, setMau, setTenHH, idDH, setIdCTDH, idKH, tenKH, setSL_Det } = route.params;
  const [dataCTDH, setDataCTDH] = useState([]);
  const [idCTDHag, setIdCTDHag] = useState('');
  const [idDHag, setIdDHag] = useState('');
  const [idHHoa, setIdHHoa] = useState('');
  const [tenHHoa, setTenHHoa] = useState('');
  const [mauHHoa, setMauHHoa] = useState('');
  const [slHHoa, setSLHHoa] = useState('');
  const [slDet, setSLDet] = useState('');
  const header = { 'idDH': `${idDH}` };
  const { text, button1, inputTxt } = styleCommon;

  useEffect(() => {
    getDataWithHeader(GET_CTDH, setDataCTDH, header);
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
                handleThemCTDH();
                break;
              case 'Sửa':
                handleSuaCTDH();
                break;
              case 'Xóa':
                handleXoaCTDH();
                break;
              default:
                handleChonCTDH();
                break;
            }
          }}
        >
          <Text style={{ fontSize: 20, color: 'white' }} >{tab}</Text>
        </TouchableOpacity>
      )
    })
  const handlePrintScr = ({ idCTDH, idDH, idHH, TenHH, Mau, SL_Dat, SL_Det }) => {
    setIdCTDHag(idCTDH);
    setIdDHag(idDH);
    setIdHHoa(idHH);
    setTenHHoa(TenHH);
    setMauHHoa(Mau);
    setSLHHoa(SL_Dat);
    setSLDet(SL_Det);
  }
  const handleChonCTDH = () => {
    setIdCTDH(idCTDHag);
    setIdHH(idHHoa);
    setTenHH(tenHHoa);
    setMau(mauHHoa);
    setSL_Det(slDet);
    navigation.goBack();
  }
  const handleThemCTDH = () => {
    var url = urlAPI + INSERT_CTDH;
    (idHHoa === '' || mauHHoa === '' || slHHoa === '') ?
      (alert("Vui lòng nhập đủ Thông tin !!!"))
      : (
        axios.post(url, {
          idDH: idDH,
          idHH: idHHoa,
          Mau: mauHHoa,
          SL_Dat: slHHoa,
        })
          .then((res) => {
            getDataWithHeader(GET_CTDH, setDataCTDH, header);
          })
          .catch((err) => console.log(err))
      )
    setIdDHag('');
    setMauHHoa('');
    setSLHHoa('');
    setTenHH('');
  }
  const handleSuaCTDH = () => {
    var url = urlAPI + UPDATE_CTDH;
    axios.post(url, {
      idCTDH: idCTDHag,
      idDH: idDH,
      idHH: idHHoa,
      Mau: mauHHoa,
      SL_Dat: slHHoa,
    })
      .then((res) => {
        getDataWithHeader(GET_CTDH, setDataCTDH, header);
      })
      .catch((err) => console.log(err))
    setIdDHag('');
    setMauHHoa('');
    setSLHHoa('');
    setTenHH('');
  }
  const handleXoaCTDH = () => {
    var url = urlAPI + DELETE_CTDH;
    axios.post(url, {
      idCTDH: idCTDHag,
      idDH: idDH,
      idHH: idHHoa,
      Mau: mauHHoa,
    })
      .then((res) => {
        getDataWithHeader(GET_CTDH, setDataCTDH, header);
      })
      .catch((err) => console.log(err))
    setIdDHag('');
    setMauHHoa('');
    setSLHHoa('');
    setTenHH('');
  }
  const renderItems = ({ item, index }) => {
    return (
      <View>
        <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          onPress={() => {
            handlePrintScr(item);
          }}
        >
          <Text style={text}>{item.TenHH}</Text>
          <Text style={text}>{item.Mau}</Text>
          {
            item.SL_Det ?
              (
                item.SL_Det > item.SL_Dat ?
                  (
                    <View>
                      <Text style={[text, { color: 'red' }]}> Dệt:{item.SL_Det}/{item.SL_Dat}:Đặt</Text>
                    </View>
                  )
                  :
                  (
                    <View>
                      <Text style={[text, { color: 'green' }]}> Dệt:{item.SL_Det}/{item.SL_Dat}:Đặt</Text>
                    </View>
                  )
              )
              :
              (
                <View>
                  <Text style={text}>Đặt: {item.SL_Dat}</Text>
                </View>
              )
          }
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView>
      <Text style={[text, { fontSize: 25, color: 'blue' }]}>Chi Tiết Đơn Hàng</Text>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={text}>Tên HH:</Text>
            <Text style={[text, { color: 'green' }]}>{tenHHoa}</Text>
          </View>
          <TouchableOpacity
            style={[button1, { width: 110 }]}
            onPress={() => {
              navigation.navigate('SelectHH', {
                idKH: idKH,
                tenKH: tenKH,
                setMauHHoa: setMauHHoa,
                setSLHHoa: setSLHHoa,
                setIdHHoa: setIdHHoa,
                setTenHHoa: setTenHHoa,
              })
            }}
          >
            <Text style={{ fontSize: 16, color: 'white' }}>Chọn Hàng</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={text}>Màu:     </Text>
          <TextInput
            style={inputTxt}
            placeholder='Màu'
            onChangeText={(txt) => setMauHHoa(txt)}
            value={mauHHoa}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={text}>SL Đặt:</Text>
          <TextInput
            style={inputTxt}
            placeholder='SL Đặt'
            onChangeText={(txt) => setSLHHoa(txt)}
            value={"" + slHHoa}
          />
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {DayNutBam}
      </View>
      <FlatList
        data={dataCTDH}
        renderItem={renderItems}
        keyExtractor={item => item.idCTDH}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
