import React from 'react';
import {View, Text, StyleSheet,Dimensions} from 'react-native';
import {Camera,getCameraDevice} from 'react-native-vision-camera';
export default class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkPermissions();
  }

  checkPermissions = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    const microphonePermission = await Camera.getMicrophonePermissionStatus();
    console.log(cameraPermission);
  };

  render() {
    const {width,height} = Dimensions.get("window");
    const devices = Camera.getAvailableCameraDevices();
    console.log(devices)
    const device = getCameraDevice(devices, 'back', {
      physicalDevices: [
        'ultra-wide-angle-camera',
        'wide-angle-camera',
        'telephoto-camera',
      ],
    });
    return (
      <View style={{width,height,backgroundColor:'pink'}}>
          <Text>hello</Text>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      </View>
    );
  }
}
