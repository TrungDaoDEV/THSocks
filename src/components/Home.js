import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { urlAPI, getDataIn, LOAD_MAYCHAY } from '../common/config';
import StyleCommon from '../theme/styleCommon';

const LOAD_TTMAY = LOAD_MAYCHAY;

export default function Home({ navigation }) {
  const [dataMaydet, setDataMaydet] = useState([]);
  const { text, bao, active, inactive } = StyleCommon;

  useEffect(() => {
    const socket = io(urlAPI, { transports: ['websocket'] });
    socket.on("Server-send-TTM", function (items) {
      console.log(" SOCKET IO May : " + items.M + " SL: "
        + items.SL + " chay: " + items.TT);
      getDataIn(LOAD_TTMAY, setDataMaydet);
    });
    // const unsubscribe = navigation.addListener('focus', () => {
      getDataIn(LOAD_TTMAY, setDataMaydet);
    // });
    return () => {
      socket.close();
    }
  }, []);
  const getCurrentTime = () => {
    var dt = new Date();
    return dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();//format: d-m-y;
  }
  const renderItem = ({ item, index }) => {
    const { May, SL, time_off, run, stop, Trangthai } = item;
    return (
      <TouchableOpacity
        onPress={() => { alert("Máy:" + May + " Giờ đứng: " + time_off + " Stop:" + stop + " Run:" + run + " SL:" + SL); }}
        style={[bao, item.Trangthai ? active : inactive, { flex: 1 / 3 }]}>
        <Text style={text}>{item.May}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Tổng Máy đang đứng: </Text>
        <Text>Tổng Thời gian đứng: </Text>
        <Text>Tổng Sản lượng Ca: </Text>
      </View>
      <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
      <FlatList
        data={dataMaydet}
        numColumns={4}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      // extraData={dataMaydet}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
