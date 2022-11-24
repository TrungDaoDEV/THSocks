import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './MainNavigation';
import DonHang from '../components/InputScr/DonHang';
import SanLuong from '../components/InputScr/SanLuong';
import Settings from '../components/Settings';
import NhapSanLuong from '../components/InputScr/NhapSanLuong';
import SelectKH from '../components/InputScr/DonHang/SelectKH';
import SelectDH from '../components/InputScr/DonHang/SelectDH';
import SelectCTDH from '../components/InputScr/DonHang/SelectCTDH';
import SelectHH from '../components/InputScr/DonHang/SelectHH';
import MayDet from '../components/InputScr/MayDet';

const Stack = createNativeStackNavigator();

export default function StackMain() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Main" component={MainNavigation} />
      {/* <Stack.Screen name="DonHang" component={DonHang} /> */}
      <Stack.Screen name="DonHang" component={DonHang} initialParams={{ InputSL: false }} />
      <Stack.Screen name="SanLuong" component={SanLuong} />
      <Stack.Screen name="NhapSanLuong" component={NhapSanLuong} />
      <Stack.Screen name="MayDet" component={MayDet} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="SelectKH" component={SelectKH} />
      <Stack.Screen name="SelectDH" component={SelectDH} />
      <Stack.Screen name="SelectCTDH" component={SelectCTDH} />
      <Stack.Screen name="SelectHH" component={SelectHH} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})