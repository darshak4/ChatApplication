import {Platform, StatusBar, StyleSheet} from 'react-native';
import {hasNotch} from 'react-native-device-info';
// import { RFPercentage } from "react-native-responsive-fontsize";

const isIOS = Platform.OS === 'ios';
const statusBarHeight = StatusBar.currentHeight;
const notch = hasNotch();

export const CommonStyles = StyleSheet.create({
  verticalPadding: {
    paddingTop: isIOS ? (notch ? '10%' : '6%') : notch ? statusBarHeight : null,
    paddingBottom: isIOS
      ? notch
        ? '7%'
        : null
      : notch
      ? statusBarHeight
      : null,
  },
});
