import { StyleSheet } from 'react-native';

const StyleCommon = StyleSheet.create({
    viewMain: {
        padding: 20
    },
    button1: {
        width: 80,
        backgroundColor: 'gray',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 3,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    inputTxt: {
        flex: 1,
        fontSize: 22,
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderWidth: 1,
        marginHorizontal: 3,
        marginVertical: 3,
        color: 'gray',
    },
    txt: {
        fontSize: 18,
    },
    headerTXT: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'blue'
    },
    h2: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    active: {
        backgroundColor: 'red'
    },
    inactive: {
        backgroundColor: 'green'
    },
    bao: {
        flex: 1,
        marginHorizontal: 2,
        marginVertical: 3,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default StyleCommon;
