import { StyleSheet } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DonHang from '../components/InputScr/DonHang';
import SanLuong from '../components/InputScr/SanLuong';
import MayDet from '../components/InputScr/MayDet';

const Tab = createMaterialTopTabNavigator();

export default function StackInput() {
    return (
        <Tab.Navigator
            initialRouteName="DonHang"
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
                tabBarStyle: { backgroundColor: 'powderblue', paddingTop: 35 },
            }}
        >
            <Tab.Screen
                name="DonHang"
                component={DonHang}
                options={{ tabBarLabel: 'Đơn Hàng' }}
                initialParams={{ InputSL: false, idMD: '', Ngay: '' }}
            />
            <Tab.Screen
                name="SanLuong"
                component={SanLuong}
                options={{ tabBarLabel: 'Sản Lượng' }}
            />
            {/* <Tab.Screen
                name="MayDet"
                component={MayDet}
                options={{ tabBarLabel: 'Máy Dệt' }}
            /> */}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})