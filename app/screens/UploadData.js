import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  ImageBackground,
  Alert,
  ToastAndroid,
  TextInput,
  Animated,
  Switch,
  Modal,
  Pressable,
  Button,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export default class UploadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfAdded: false,
      isLoading: false,
      receivedData: {},
    };
  }

  uploadCASStatment = async data2 => {
    console.log('UploadCASSTatement API executing:- ');
    console.log(data2);
    var formdata = new FormData();
    formdata.append('password', data2.password);
    formdata.append('file', data2.file);

    var requestOptions = {
      method: 'POST',
      headers: {
        'x-api-key': 'OkhWKKYHpDajpSSA75Za89iA03WLzY2N8AlMFI93',
        'ngrok-skip-browser-warning': 'Shivang',
      },
      body: formdata,
    };

    var endAPI = 'https://773f-14-139-82-6.ngrok-free.app/upload';

    const response = await fetch(endAPI, requestOptions);

    // console.log("this is the verify OTP payload:- ", formdata);

    const data = await response.json();

    console.log('data', response.status);
    console.log(data);
    if (response.status > 500) {
      throw new Error(data.errors);
    }

    return data;
  };

  sendData = async data => {
    await this.setState({isLoading: true});
    var receivedData = await this.uploadCASStatment(data);
    console.log('Send data is pressed!!');
    await this.setState({isLoading: false, DataFetched: true, receivedData});
  };
  selectFile = async () => {
    await this.setState({loading: true});
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'documentDirectory',
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.fileCopyUri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);

      let fileType = res.name.split('.')[1];
      console.log('File fileType : ' + fileType);
      if (
        (fileType.toLowerCase() == 'jpg' || fileType.toLowerCase() == 'png') &&
        res.fileCopyUri != '' &&
        res.fileCopyUri != null
      ) {
        // const getUrl = res[0].uri;
        // const splittedArray = getUrl.split('/');
        // const fileName = splittedArray[splittedArray.length - 1];
        // const url = res[0].uri;
        // const split = url.split('/');
        // const name = split.pop();
        // const inbox = split.pop();
        // const realPath = `${RNFetchBlob.TemporaryDirectoryPath}${inbox}/${name}`;
        // console.log('realPath : ' + realPath);
        await this.setState({
          CAS_file_name: res.name,
          CAS_file: res,
          pdfAdded: !this.state.pdfAdded,
          loading: false,
        });
        // this.props.getfinbittokenAPI();
        //casparser
      } else {
        Alert.alert(
          'Nutrition Counter',
          'Please select the correct file format',
        );
        this.setState({
          CSVFileUri: '',
          loading: false,
        });
      }

      //Setting the state to show single file attributes
    } catch (err) {
      //Handling any exception (If any)
      this.setState({
        loading: false,
      });
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        // Alert.alert('JREDA', 'Canceled from single doc picker');
      } else {
        //For Unknown Error
        // Alert.alert('JREDA', 'Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  render() {
    const screenWidth = Dimensions.get('window').width;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const activeColors = {
      background: '#fffff7',
      buttonBackground: '#ffffff',
      outline: '#dfdfdf',
      textColor: 'black',
      highlightedTextColor: '#2C63E0',
      selectedButtonBackground: '#2C63E0',
      selectedButtonBackgroundHighlight: '#ffffff', //more icon bg color
      selectedButtonTextColor: 'white',
      inputBorderColor: '#C0C0C0',
      buttonBorder: '#C0C0C0',
      fontFamily: 'Manrope-Bold',
      fontFamilyRegular: 'Manrope',
      iconColor: '#2C63E0',
      selectedButtonBorder: '#2C63E0',
      activityIndicatorColor: 'red',
      barChartColor: '#2C63E0',
    };

    return (
      <View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            width,
            height,
            backgroundColor: 'pink',
            opacity: 0.05,
          }}>
          <Image source={require('./back2.png')} style={{width, height}}></Image>
        </View>
        {this.state.isLoading ? (
          <ActivityIndicator
            size={'large'}
            color=""
            style={{alignSelf: 'center', width, height}}></ActivityIndicator>
        ) : (
          <>
            {this.state.DataFetched ? (
              <View style={{
                width,height,
                justifyContent:'center',
                alignItems:'center',
              }}>
                <View style={{
                  justifyContent:'center',
                  alignItems:'center',
                }}>
                 <Text style={{
                   fontWeight:'bold',
                   fontSize:16,
                   color:'black',
                   padding:20,
                 }}> {this.state.receivedData?.res}</Text>
                </View>
                <TouchableOpacity
                onPress={()=>{
                  this.setState({
                    dataReceived:{},
                    DataFetched:false,
                    isLoading:false,
                    pdfAdded:false,
                    
                  })
                }}
                 style={{
                  justifyContent:'center',
                  alignItems:'center',
                  width:width*0.6,
                  borderRadius:20,
                  backgroundColor:'blue',
                  padding:20,
                }}>
                  <Text style={{
                    color:'white',
                    fontSize:16,
                    fontWeight:'bold',
                  }}>Try Again</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height,
                  width,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    padding: 20,
                    width,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'blue',
                    overflow:'hidden',
                    elevation: 1,
                  }}>
                    <View style={{
                      width,height,opacity:0.6,backgroundColor:'blue',
                      position:'absolute',top:0,
                    }}>

                    </View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 24,
                      fontWeight: 'bold',
                    }}>
                    Nutrition Counter
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: width * 0.9,
                    margin: 15,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 15,
                    overflow: 'hidden',
                    borderColor: activeColors.outline,
                  }}
                  onPress={async () => {
                    await this.selectFile();
                  }}>
                  <View
                    style={{
                      backgroundColor: activeColors.selectedButtonBackground,
                      position: 'absolute',
                      top: 0,
                      width: 800,
                      height: 100,
                      opacity: this.state.pdfAdded ? 1 : 0.1,
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      //backgroundColor: 'pink',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: this.state.pdfAdded ? 'white' : 'black',
                      }}>
                      {/**'CAS_Aug_2023.pdf' */}
                      {!this.state.pdfAdded
                        ? 'Tap to add image'
                        : this.state.CAS_file_name}
                    </Text>
                    {this.state.pdfAdded && (
                      <TouchableOpacity
                        style={{position: 'absolute', right: 10}}
                        onPress={() => {
                          this.setState({
                            pdfAdded: !this.state.pdfAdded,
                            CAS_file: '',
                          });
                        }}>
                        <Image
                          style={{width: 15, height: 15}}
                          source={require('./close.png')}
                          resizeMode="contain"></Image>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!this.state.pdfAdded}
                  style={{
                    height: 60,
                    width: width * 0.9,
                    margin: 15,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 15,
                    overflow: 'hidden',
                    borderColor: activeColors.outline,
                    backgroundColor: 'blue',
                    opacity: this.state.pdfAdded ? 1 : 0.3,
                  }}
                  onPress={async () => {
                    await this.sendData({
                      file: this.state.CAS_file,
                      pan: this.state.pan_id,
                      password: this.state.password,
                      documentType: this.state.documentType,
                    });
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Analyze
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    );
  }
}
