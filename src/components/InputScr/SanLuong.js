import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { urlAPI, LOAD_SANLUONG, getDataIn } from '../../common/config';
import styleCommon from '../../theme/styleCommon';

export default function SanLuong(props) {
  const [dataIn, setDataIn] = useState([]);
  const [date, setDate] = useState(new Date());
  const { txt, h2 } = styleCommon;

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something
      getDataIn(LOAD_SANLUONG, setDataIn);
      console.log("SANLUONG - addlistener")
    });
    setDate(getCurrentDate());
    return () => {
    }
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const getCurrentDate = () => {
    var dt = new Date();
    var hour = dt.getHours();

    hour < 12 ?
      dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() - 1)
      : dt;
    // You can turn it in to your desired format
    return dt;//format: d-m-y;
  }
  const handleRefresh = () => {
    setDataIn([]);
    getDataIn(LOAD_SANLUONG, setDataIn);
    console.log("handle refresh: ");
  }
  const renderItems = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
          <TouchableOpacity
            style={{ flex: 1, margin: 5 }}
            onPress={() => {
              props.navigation.navigate('NhapSanLuong', {
                idMD: item.idMD,
                May: item.May,
                TenHH: item.TenHH,
                Mau: item.Mau,
                idCTDH: item.idCTDH,
                ChayVo: item.ChayVo,
                setDataIn: setDataIn,
                Ngay: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
              })
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={h2}>{item.May}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <Text style={txt}>{item.TenHH}</Text>
              <Text style={txt}>{item.Mau}</Text>
              {
                item.TongDet > item.SL_Dat ?
                  (
                    <Text style={[txt, { fontWeight: 'bold', color: 'red' }]}>{item.TongDet}/{item.SL_Dat}</Text>
                  )
                  :
                  (
                    <Text style={[txt, { color: 'green' }]}>{item.TongDet}/{item.SL_Dat}</Text>
                  )
              }
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ borderBottomWidth: 1 }} />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
        <Text style={txt}>Ngày Nhập: {date.toLocaleDateString()}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text  style={txt}>Chọn Ngày:</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode='date'
            // is24Hour={true}
            onChange={onChange}
            style={{ width: 100, margin: 3 }}
          />
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'powderblue' }} />
      <FlatList
        style={{ flex: 1 }}
        data={dataIn}
        renderItem={renderItems}
        keyExtractor={item => item.idMD}
        extraData={dataIn}
      />
    </SafeAreaView>
  )
}
