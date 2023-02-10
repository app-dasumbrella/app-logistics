/** @format */

import React, { PureComponent } from "react";
import {
  Text,
  Animated,
  Platform,
  View,
  I18nManager,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Linking,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import TimeAgo from "react-native-timeago";
import { Constants, Tools, Styles, Color, Images } from "@common";
import { WebView, Button, ModalPicker, Spinner } from "@components";
import { loadImage, loadImageGallery } from "./../ultils/UploadImage";
import SignatureScreen from "react-native-signature-canvas";
import styles2 from "./MyOrdersContainer/styles";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import DropDownPicker from "react-native-dropdown-picker";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import moment from "moment";
import { toast } from "@app/Omni";
import {
  storeNewJOb,
  acceptJobs,
  updateJobs,
  storeAcceptedJOb,
  CompleteJobs
} from "@redux/operations";
import NavBarLogo from "../components/NavBar/Logo";
import { windowWidth } from "./HomeContainer";
import { getMapurl, getNumOrder, getOrders } from "../ultils/Orderutils";
import Toast from 'react-native-toast-message';

const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 42 : 42;
const HEADER_SCROLL_DISTANCE = Styles.headerHeight - HEADER_MIN_HEIGHT;

const mapStateToProps = (state, props) => {
  const post = props.navigation.getParam("item");
  return {
    post,
    acceptLoading: state.app.acceptLoading,
    userInfo: state.user.userInfo,
    updateLoading: state.app.updateLoading,
    completeLoading: state.app.completeLoading,
    InprogressJobs: state.app.InprogressJobs,

  };
};

@connect(mapStateToProps, { acceptJobs, storeNewJOb, updateJobs, storeAcceptedJOb, CompleteJobs })
export default class OrderDetailContainer extends PureComponent {
  state = {
    scrollY: new Animated.Value(0),
    docketImage: [],
    selectedTab: 1,
    open: false,
    selectedID: null,
    signImage: []

  };
  constructor(props) {
    super(props);
    this.callRef = React.createRef();
    this.setValue = this.setValue.bind(this);
  }
  updateScroll = () => {
    this._scrollView._component.scrollTo({ x: 0, y: 0, animated: true });
  };
  loadImageHandler = () => {
    loadImage()
      .then((docketImage) => {
        this.setState({ docketImage, isImageUpdated: true, photo: false, tab: 2 });
      })
      .catch((er) => {
        this.setState({ photo: false });
        console.log(er);
      });
  };
  setValue(callback) {
    this.setState((state) => ({
      value: callback(state.value),
      open: false,
    }));
  }

  loadGalleryHandler = () => {
    loadImageGallery()
      .then((docketImage) => {
        this.setState({ docketImage, isImageUpdated: true, photo: false, tab: 2 });
      })
      .catch((er) => {
        console.log(er);
        this.setState({ photo: false });
      });
  };
  renderCamera = (i) => {
    return (
      <TouchableOpacity
        style={styles2.box}
        onPress={() => this.loadImageHandler(i)}
      >
        <Image source={Images.icons.camera}
          style={{ width: moderateScale(30), height: moderateScale(30) }}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  };
  renderGallery = (id, site_id) => {
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={() => this.setState({ photo: true, sign: false, selectedID: id, site_id })}
      >
        <Text style={{ color: 'white', fontSize: moderateScale(16), fontWeight: 'bold', textAlign: 'center' }}>Photo</Text>
      </TouchableOpacity>
    );
  };
  renderSign = (id, site_id) => {
    return (
      <TouchableOpacity
        style={styles.btn}

        onPress={() => this.setState({ sign: true, photo: false, selectedID: id, site_id })}
      >
        <Text style={{ color: 'white', fontSize: moderateScale(16), fontWeight: 'bold', textAlign: 'center' }}>Signature</Text>
      </TouchableOpacity>
    );
  };
  renderSignature = () => {
    const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

    return (
      <View style={styles.centeredView}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.sign}
          onRequestClose={() => {
            //Alert.alert('Modal has been closed.');
            this.setState({ sign: false });
          }}>
          <View style={{ backgroundColor: 'rgba(1,1,1,0.89)', flex: 1 }}>
            <NavBarLogo close manual onPress={() => { this.setState({ sign: false }); }} />
            <View style={styles.centeredView}>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  marginVertical: 10,
                  height: 200,
                  width: windowWidth
                }}
              >
                <SignatureScreen
                  ref={this.callRef}
                  onOK={this.handleOK}
                  webStyle={style}
                />
              </View>
              <Button
                text={"Confirm"}
                type="text"
                textStyle={{ color: "#fff" }}
                onPress={async () => {
                  await this.callRef.current.readSignature();
                  setTimeout(
                    () => this.setState({ sign: false, isImageUpdated: true, tab: 3 }),
                    1000
                  );
                }}
                style={{ marginBottom: 5, padding: 10, width: windowWidth * 0.7 }}
              />
              <Button
                text={"Clear"}
                type="text"
                textStyle={{ color: "#fff" }}
                onPress={() => this.callRef.current.clearSignature()}
                style={{ marginBottom: 5, padding: 10, width: windowWidth * 0.7 }}
              />
              {/* <Button
                text={"Cancel"}
                type="text"
                textStyle={{ color: "#fff" }}
                onPress={() => this.setState({ sign: false })}
                style={{ marginBottom: 5, padding: 10, width: windowWidth * 0.7 }}
              /> */}
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  renderPhotoModal = () => {

    return (
      <View style={[styles.centeredView,]}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.photo}
          onRequestClose={() => {
            //Alert.alert('Modal has been closed.');
            this.setState({ photo: false });
          }}>
          <View style={{ backgroundColor: 'rgba(1,1,1,0.89)', flex: 1 }}>
            <NavBarLogo close manual onPress={() => { this.setState({ photo: false }); }} />
            <View style={styles.centeredView}>


              <Button
                text={"Click a picture"}
                type="text"
                textStyle={{ color: "#fff" }}
                onPress={() => {
                  this.loadImageHandler()
                  this.setState({ photo: false })
                }}
                style={{ marginBottom: 5, padding: 10, width: windowWidth * 0.7 }}
              />
              <Button
                text={"Select From Gallery"}
                type="text"
                textStyle={{ color: "#fff" }}
                onPress={() => {
                  this.setState({ photo: false })
                  this.loadGalleryHandler()
                }}
                style={{ marginBottom: 5, padding: 10, width: windowWidth * 0.7 }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  renderImage = (sign) => {
    let { completeLoading, userInfo, acceptJobs, updateJobs, CompleteJobs } = this.props
    let { access_token, email } = userInfo || {}
    let { params } = this.props.navigation.state || {};
    let { item } = params || {};

    return (
      <View>
        {!sign ?
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.state.docketImage?.map(it => <Image
              source={{ uri: it?.uri }}
              style={{
                width: moderateScale(120),

                height: 150, margin: 10
              }}
              resizeMode="contain"
            />)}
          </View> :
          <Image
            source={this.state.signImage}
            style={{
              width: moderateScale(120),
              alignSelf: 'center',
              height: 150, marginVertical: 20
            }}
            resizeMode="contain"
          />}

      </View>
    );
  };

  renderStatus = () => {
    return (
      <View
        style={{ marginVertical: 20, minHeight: this.state.open ? 200 : 20 }}
      >
        <DropDownPicker
          open={this.state.open}
          value={this.state.value}
          placeholder={"Select Delivery Status"}
          setOpen={() => this.setState({ open: true })}
          onClose={() => this.setState({ open: false })}
          items={[
            { label: "Delivered", value: 1 },
            { label: "Failed", value: 2 },
          ]}
          setValue={this.setValue}

        // setItems={setItems}
        />
      </View>
    );
  };

  _renderContent2 = () => {
    let { params } = this.props.navigation.state || {};
    let { item } = params || {};
    return (
      <View style={{ flex: 1, paddingVertical: 5, paddingHorizontal: "5%" }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-around",
          }}
        >
          {this.renderCamera(2)}
          {this.renderGallery(2)}
        </View>

        {this.state.docketImage && this.state.tab == 2 && this.renderImage(false)}
      </View>
    );
  };

  _renderContent3 = (id, siteid, payload) => {
    let { params } = this.props.navigation.state || {};
    let { item } = params || {};
    let { docketImage, signImage, selectedID } = this.state || {}
    let { completeLoading, userInfo, acceptJobs, updateJobs, CompleteJobs } = this.props
    let { access_token, email } = userInfo || {}
    return (

      <View style={{

        flex: 1, paddingVertical: 5,
        paddingHorizontal: '5%'
      }}>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {this.renderGallery(id, siteid)}
          {docketImage?.length != 0 && selectedID == id && this.renderImage(false)}
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,

          }}
        >


        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {this.renderSign(id, siteid)}
        </View>
        {/* {this.renderStatus()} */}
        {selectedID == id && this.renderPhotoModal()}
        {this.state.sign && selectedID == id && this.renderSignature()}
        {signImage?.length != 0 && selectedID == id && this.renderImage(true)}
        {completeLoading && <Spinner />}

        <Button style={{ paddingVertical: 10, marginTop: moderateScale(20) }}
          disabled={signImage?.length == 0 || docketImage?.length == 0}
          inactive={signImage?.length == 0 || docketImage?.length == 0}
          text="Update as Delivered" onPress={() => {
            payload?.map((itemsPay, inde) => {
              let proof = this.state.docketImage
              proof.push({
                uri: this.state.signImage.uri,
                type: 'image/jpeg',
                name: "sign.jpg",
              })

              CompleteJobs({
                access_token,
                email,
                job_id: item.job_id,
                item_id: itemsPay?.item_id,
                site_id: itemsPay?.site_id,
                proof
              }, (e) => {
                console.log(e)
                toast(e?.msg)
                if (!e?.err)
                  this.props.navigation.goBack()
                this.props.storeAcceptedJOb({
                  access_token,
                  email,
                  "status": "in-progress"
                }, (data) => {

                })
              })
            })
          }}></Button>
      </View >
    );
  };

  _renderContent = () => {
    let { params } = this.props.navigation.state || {};
    let { item, from } = params || {};
    let { updateLoading, userInfo, InprogressJobs, updateJobs } = this.props
    let { access_token, email } = userInfo || {}
    let OrdersItems = getOrders(item?.records)
    return (
      <View style={{ flex: 1, marginHorizontal: '5%', marginBottom: moderateScale(30) }}>

        {OrdersItems?.map((i, key) => <View
          key={key}
          style={{
            width: "100%",
            marginTop: 20,
            elevation: 1,
            backgroundColor: "#fff",
            paddingHorizontal: moderateScale(0),
          }}
        >
          {<View style={{
            backgroundColor: '#30B0C8',
            paddingVertical: moderateScale(10), marginBottom: moderateScale(10)
          }}><Text style={[styles.text2, { paddingLeft: 10, color: 'white' }]}>Order Details #{i.order_number}</Text></View>}
          {/* <Text style={[styles.text2, { marginBottom: 10, textAlign: 'center' }]}>Order Number: </Text> */}
          {i?.payload?.map((it, indeP) => <View style={{
            marginBottom: verticalScale(10), paddingHorizontal: '6%',
          }}>
            {/* <Text style={[styles.text1]}>Item Id: <Text style={[styles.text2]}>{it.item_id}</Text></Text> */}
            <Text style={[styles.text1]}>Item Name </Text>
            <Text style={[styles.text2, styles.mb8]}>{it.item_name}</Text>
            {indeP == i?.payload?.length - 1 && <>
              <Text style={[styles.text1]}>Cust. Name: <Text style={[styles.text2]}>{it.address?.name}</Text></Text>
              <Text style={[styles.text1]}>Address</Text>
              <Text style={[styles.text2]}>{it.address?.address1}</Text>
              {it.address?.address2 && <Text style={[styles.text2]}>
                {it.address?.address2}   </Text>}
              {it.address?.city && <Text style={[styles.text2]}>
                {it.address?.city}  </Text>}
              {it.address?.state && <Text style={[styles.text2]}>
                {it.address?.state}  </Text>}
              {it.address?.country && <Text style={[styles.text2]}>
                {it.address?.country}  </Text>}
              {it.address?.zipcode && <Text style={[styles.text2]}>
                {it.address?.zipcode}  </Text>}
              <Text style={[styles.text1]}>Phone No: <Text style={[styles.text2]}>{it.customer_phone}</Text></Text>
              <Text style={[styles.text1]}>Type: <Text style={[styles.text2, { textTransform: 'capitalize' }]}>{it.type}</Text></Text>
            </>}


          </View>)}

          {updateLoading && <Spinner fullStretch />}

          {(from == 2 || from == 1) && <View>
            <View style={{ flexDirection: 'row', paddingHorizontal: '2%', justifyContent: 'space-between', height: moderateScale(50) }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  padding: moderateScale(6),
                  paddingLeft: moderateScale(12),
                  paddingRight: moderateScale(15),

                  backgroundColor: 'rgba(0,51,102,0.8)', bottom: 0,
                }}
                onPress={() => {
                  let itOrder = i?.payload?.[0]
                  let dest = ''
                  if (itOrder.address?.address1)
                    dest = dest + itOrder.address?.address1 + ', '
                  if (itOrder.address?.city)
                    dest = dest + itOrder.address?.city + ', '
                  if (itOrder.address?.state)
                    dest = dest + itOrder.address?.state + ', '
                  if (itOrder.address?.country)
                    dest = dest + itOrder.address?.country + ' '
                  if (itOrder.address?.zipcode)
                    dest = dest + itOrder.address?.zipcode

                  // dest = 'Talsal Lake view, Waddem - Talaulim Rd, Agstipura, Goa 403401'
                  var url = `https://www.google.com/maps/dir/?api=1&origin=Your Location&destination=${dest}&travelmode=driving`;

                  // "https://www.google.com/maps/dir/?api=1&origin=Chicago, IL, USA&destination=Los Angeles, CA, USA&travelmode=driving&waypoints=Joplin, MO, USA";

                  //var url = "https://www.google.com/maps/dir/?api=1&origin=Talsal Lake view, Waddem - Talaulim Rd, Agstipura, Goa 403401&destination=Talsal Lake view, Waddem - Talaulim Rd, Agstipura, Goa 403401&waypoints=adpai Post Office, 9XF9+685, Adpai, Goa|Chikolkar Pedh, mansher agapur durbhat, Ponda, Goa|Shri Simemharu Prasann, Durbhat, Goa 403401&travelmode=bike"
                  Linking.canOpenURL(url)
                    .then((supported) => {
                      if (!supported) {
                        console.log("Can't handle url: " + url);
                        Linking.openURL(url);
                      } else {
                        return Linking.openURL(url);
                      }
                    })
                    .catch((err) => console.error("An error occurred", err));
                }}
              >
                <Image
                  resizeMode={"contain"}
                  source={Images.mapmarker}
                  style={{ width: moderateScale(30), height: moderateScale(30), resizeMode: 'contain' }} />
              </TouchableOpacity>
              {from == 1 && <TouchableOpacity
                onPress={() => {
                  if (Object.keys(InprogressJobs || {}).length == 0) {
                    i?.payload.map((orderItem, pIndex) => {

                      updateJobs({
                        access_token,
                        email,
                        job_id: item.job_id,
                        item_id: orderItem?.item_id,
                        status: 'in-progress'
                      }, (data2) => {
                        if (!data2.err) {
                          if (pIndex + 1 == i?.payload?.length) {
                            this.props.navigation.goBack()
                            toast(data2.msg)
                          }

                        } else {
                          toast(data2?.msg)
                        }

                      })
                    })
                  } else {
                    Toast.show({
                      type: 'error',
                      text1: ' Must complete in-progress jobs before starting new',
                      position: 'bottom',
                      visibilityTime: 5000
                    });
                  }
                }}
                style={{
                  justifyContent: "center",
                  position: 'absolute', right: 0, bottom: 0,
                  alignSelf: "center",
                  width: moderateScale(200),
                  backgroundColor: "green",
                }}
              >
                <Text
                  style={styles.btntext}
                >
                  Start Delivery
                </Text>
              </TouchableOpacity>}
            </View>


            {from == 2 && <View style={{ backgroundColor: '#30B0C8', marginTop: 20, paddingVertical: moderateScale(10) }}><Text style={[styles.text2, { paddingLeft: 10, color: 'white' }]}>Upload Proof</Text></View>}
            {from == 2 && this._renderContent3(i?.payload?.[0]?.item_id, i?.payload?.[0]?.site_id, i?.payload)}
          </View>}
          { }
          {/* <Text style={[styles.text1]}>Note: <Text style={[styles.text2, { textTransform: 'capitalize' }]}>{i.notes}</Text></Text> */}



        </View>)}
      </View>
    );
  };
  handleOK = (signature) => {
    this.setState({ signImage: { uri: signature } });
  };

  renderFooter = () => {
    let { selectedTab, tab } = this.state;
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[styles2.tabbutton, selectedTab == 1 ? {} : styles2.inActive]}
          onPress={() => {
            this.setState({ selectedTab: 1 });
          }}
        >
          <Text style={[styles2.rowLabel, { color: "white" }]}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles2.tabbutton, selectedTab == 2 ? {} : styles2.inActive]}
          onPress={() => {
            this.setState({ selectedTab: 2 });
          }}
        >
          <Text style={[styles2.rowLabel, { color: "white" }]}>Collection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles2.tabbutton, selectedTab == 3 ? {} : styles2.inActive]}
          onPress={() => {
            this.setState({ selectedTab: 3 });
          }}
        >
          <Text style={[styles2.rowLabel, { color: "white" }]}>Delivery</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let { params } = this.props.navigation.state || {};
    let { item, from, onClick } = params || {};
    const { Showpannel, isImageUpdated, selectedTab } = this.state;
    let { updateLoading, acceptLoading, userInfo, acceptJobs, updateJobs, InprogressJobs } = this.props
    let { access_token, email } = userInfo || {}
    return (
      <SafeAreaView style={styles.body}>
        <NavBarLogo title='' close navigation={this.props.navigation} />
        <View
          style={{
            width: "90%",
            marginTop: 5,
            elevation: 1,
            backgroundColor: "#fff",
            paddingVertical: 10,
            paddingHorizontal: moderateScale(20),
            marginHorizontal: '5%',
            marginBottom: 10
          }}
        >
          <Text style={{ textAlign: 'center', color: 'rgb(0, 51, 102)', fontWeight: 'bold', fontSize: moderateScale(16) }}>{`${from == 0 ? "New " : ""}${"Job Details"}`}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={styles.text1}
            >
              Date: <Text style={styles.text2}> {moment(item.date).format("DD MMM YYYY")}   </Text>
            </Text>
            <Text
              style={styles.text1}
            >
              Time: <Text style={styles.text2}> {item.time}</Text>
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <Text
              style={styles.text1}
            >
              Total Orders: <Text style={styles.text2}> {getNumOrder(item?.records)}</Text>
            </Text>
            <Text
              style={styles.text1}
            >
              Total Fee: <Text style={styles.text2}>{item?.currency} {Number(item?.fee).toFixed(2)}</Text>
            </Text>
          </View>


        </View>
        {selectedTab === 1 && (
          <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: 100 }}>

            {this._renderContent()}
            {acceptLoading && <Spinner fullStretch />}


          </ScrollView>
        )}
        {from == 1 &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', marginTop: 8 }}>
            <TouchableOpacity
              style={{
                padding: 5,
                paddingLeft: moderateScale(12),
                paddingRight: moderateScale(15),
                backgroundColor: 'rgba(0,51,102,0.8)', marginTop: moderateScale(5), bottom: -5
              }}
              onPress={() => {
                let OrdersItems = getOrders(item?.records)
                let url = getMapurl(OrdersItems)
                Linking.canOpenURL(url)
                  .then((supported) => {
                    if (!supported) {
                      console.log("Can't handle url: " + url);
                      Linking.openURL(url);
                    } else {
                      return Linking.openURL(url);
                    }
                  })
                  .catch((err) => console.error("An error occurred", err));
              }}
            >
              <Image
                resizeMode={"contain"}
                source={Images.MapM}
                style={{ width: moderateScale(35), height: moderateScale(35), resizeMode: 'contain' }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (Object.keys(InprogressJobs || {}).length == 0) {
                  item?.records?.map((op, index) => {
                    updateJobs({
                      access_token,
                      email,
                      job_id: item.job_id,
                      item_id: op?.item_id,
                      status: 'in-progress'
                    }, (data2) => {
                      if (!data2.err) {
                        if (index == item?.records?.length - 1) {
                          toast(data2.msg)
                          this.props.navigation.goBack()
                          this.props.navigation.navigate('InProgressjobsContainer')
                          let OrdersItems = getOrders(item?.records)
                          let url = getMapurl(OrdersItems)
                          Linking.canOpenURL(url)
                            .then((supported) => {
                              if (!supported) {
                                console.log("Can't handle url: " + url);
                                Linking.openURL(url);
                              } else {
                                return Linking.openURL(url);
                              }
                            })
                            .catch((err) => console.error("An error occurred", err));
                        }
                      } else {
                        toast(data2?.msg)
                      }
                      this.props.storeAcceptedJOb({
                        access_token,
                        email,
                        "status": "assigned"
                      }, (data) => {

                      })
                      this.props.storeAcceptedJOb({
                        access_token,
                        email,
                        "status": "in-progress"
                      }, (data) => {

                      })
                    })
                  })
                } else {
                  Toast.show({
                    type: 'error',
                    text1: ' Must complete in-progress jobs before starting new',
                    position: 'bottom',
                    visibilityTime: 5000

                  });

                }
              }}
              style={{
                justifyContent: "flex-end",

                alignSelf: "flex-end",
                backgroundColor: "red",
                marginTop: 10,
                width: moderateScale(180)
              }}
            >
              <Text
                style={styles.btntext}
              >
                Start All Deliveries              </Text>
            </TouchableOpacity>
          </View>
        }
        {from == 0 && <View style={{ marginVertical: 20, flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {
              acceptJobs({
                access_token,
                email,
                job_id: item.job_id
              }, (data2) => {
                console.log("sssss", data2?.msg)
                if (data2?.err) {
                  toast(data2.msg)
                }
                this.props.navigation.goBack()
                this.props.storeNewJOb({
                  access_token,
                  email
                }, (data) => {

                })
                this.props.storeAcceptedJOb({
                  access_token,
                  email,
                  "status": "assigned"
                }, (data) => {

                })
              })

            }}
            style={{
              justifyContent: "center",

              alignSelf: "center",
              flex: 1,
              backgroundColor: "green",
              marginHorizontal: moderateScale(20)
            }}
          >
            <Text
              style={styles.btntext}
            >
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              justifyContent: "center",

              alignSelf: "center",
              flex: 1,
              backgroundColor: "red",
              marginHorizontal: moderateScale(20)

            }}
          >
            <Text
              style={styles.btntext}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>}

        <Toast />

        {/* {selectedTab === 2 && (
          <ScrollView>
            <View style={styles2.topborder}>
              <Text style={[styles2.titleEmpty, { color: Color.primary }]}>
                {"Collection Details"}
              </Text>
            </View>
            {this._renderContent2()}
          </ScrollView>
        )} */}
        {/* {selectedTab === 3 && (
          <ScrollView>
            <View style={styles2.topborder}>
              <Text style={[styles2.titleEmpty, { color: Color.primary }]}>
                {"Delivery Details"}
              </Text>
            </View>
            {this._renderContent3()}
          </ScrollView>
        )} */}
        {/* {this.renderFooter()} */}
      </SafeAreaView>
    );
  }
}

const styles = {
  body: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  scrollViewContent: {
    marginTop: Styles.headerHeight,
    position: "relative",
    marginBottom: 100,
  },
  mb8: {
    marginBottom: verticalScale(8)
  },
  detailDesc: {
    color: "#333",
    width: Styles.window.width - 20,
    marginTop: 16,
    marginRight: 16,
    marginBottom: 2,
    marginLeft: 13,
    fontWeight: "500",
    fontSize: 22,
    textAlign: I18nManager.isRTL ? "right" : "left",
    //fontFamily: Constants.fontFamilyBold,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    overflow: "hidden",
    height: Styles.headerHeight,
  },
  imageBackGround: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: Styles.window.width,
    height: Styles.headerHeight,
  },
  text1: {
    fontSize: moderateScale(14),
    color: '#333',
    paddingVertical: verticalScale(3)

  },
  text2: {
    fontSize: moderateScale(14),
    color: '#333',
    fontWeight: 'bold',


  }, btntext: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20)
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  btn: {
    justifyContent: 'center',
    alignContent: 'center',
    width: moderateScale(200),
    backgroundColor: "green",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    marginTop: 10
  }
};
