/** @format */

import React, { PureComponent } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";
import { isEmpty, cloneDeep } from "lodash";
import Tcomb from "tcomb-form-native";
import {
  createUserAddress,
  updateCheckoutShippingAddress,
  updateUserAddress,
  updateUserDefaultAddress,
} from "@redux/operations";
import { getAddressInput } from "@redux/selectors";
import { Validator, Languages, Tools, Styles, Color, Constants } from "@common";
import { Button } from "@components";
import { toast } from "@app/Omni";

const Form = Tcomb.form.Form;

const customStyle = cloneDeep(Tcomb.form.Form.stylesheet);

// Customize Form Stylesheet
customStyle.controlLabel.normal = {
  color: "transparent",
  height: 0,
};
customStyle.controlLabel.error = {
  color: "transparent",
  height: 0,
};
customStyle.errorBlock = {
  ...customStyle.errorBlock,
  fontFamily: Styles.Common.Textinput.fontFamily,
};
customStyle.textbox.normal = {
  ...customStyle.textbox.normal,
  ...Styles.Common.Textinput,
  fontSize: 20,
};
customStyle.textbox.error = {
  ...customStyle.textbox.normal,
  ...Styles.Common.Textinput,
  fontSize: 20,
  borderColor: Color.error,
};
customStyle.pickerContainer.normal = {
  ...customStyle.pickerContainer.normal,
  borderRadius: Styles.Common.Textinput.borderRadius,
  borderWidth: Styles.Common.Textinput.borderWidth,
  borderBottomWidth: Styles.Common.Textinput.borderBottomWidth,
  borderColor: Styles.Common.Textinput.borderColor,
};
customStyle.pickerContainer.error = {
  ...customStyle.pickerContainer.normal,
  borderRadius: Styles.Common.Textinput.borderRadius,
  borderWidth: Styles.Common.Textinput.borderWidth,
  borderBottomWidth: Styles.Common.Textinput.borderBottomWidth,
  borderColor: Color.error,
};
customStyle.pickerContainer.open = {
  ...customStyle.pickerContainer.open,
};
customStyle.pickerValue.normal = {
  ...customStyle.pickerValue.normal,
  color: Styles.Common.Textinput.color,
  fontSize: 20,
  fontFamily: Styles.Common.Textinput.fontFamily,
};

const mapStateToProps = (state, props) => {
  const address = props.navigation.getParam("address", {});
  return {
    address: getAddressInput(state, address),
    accessToken: state.user.accessToken,
    userInfo: state.user.userInfo,
    isFetching: state.user.isFetching,
    error: state.user.error,

    countries: state.country.list,
  };
};

@connect(mapStateToProps, {
  updateCheckoutShippingAddress,
  createUserAddress,
  updateUserAddress,
  updateUserDefaultAddress,
})
export default class UserAddressFormContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.address || {},
      added: false,
    };

    this._initFormValues();
  }

  _initFormValues = () => {
    const { countries } = this.props;
    const country =
      !countries || isEmpty(countries)
        ? { value: "", text: Languages.Country }
        : countries;

    // override the validate method of Tcomb lib for multi validate requirement.
    const Countries = Tcomb.enums(country, "country");
    const Phone = Tcomb.refinement(
      Tcomb.String,
      (s) => Validator.checkPhone(s) === undefined
    );
    Phone.getValidationErrorMessage = (s) => Validator.checkPhone(s);

    // define customer form
    this.Customer = Tcomb.struct({
      firstName: Tcomb.String,
      //lastName: Tcomb.String,
      // mailing address
      phone: Phone,
      address1: Tcomb.String,
      city: Tcomb.String,

      province: Tcomb.maybe(Tcomb.String),

      zip: Tcomb.String,
      country: Tcomb.String,
    });

    // form options
    this.options = {
      auto: "none",
      fields: {
        firstName: {
          label: "Full Name",
          placeholder: "Full Name",
          error: Languages.EmptyError, // for simple empty error warning.
          underlineColorAndroid: "transparent",
          stylesheet: customStyle,
        },
        lastName: {
          label: Languages.LastName,
          placeholder: Languages.TypeLastName,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: customStyle,
        },
        phone: {
          label: Languages.Phone,
          placeholder: Languages.TypePhone,
          underlineColorAndroid: "transparent",
          stylesheet: customStyle,
        },
        address1: {
          label: Languages.Address,
          placeholder: Languages.TypeAddress,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: customStyle,
        },
        country: {
          label: Languages.TypeCountry,
          placeholder: "Country",
          error: Languages.NotSelectedError,
          stylesheet: customStyle,
          value: "SG"
        },
        city: {
          label: Languages.City,
          placeholder: Languages.TypeCity,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: customStyle,
        },
        province: {
          label: Languages.State,
          placeholder: Languages.TypeState,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: customStyle,
        },
        zip: {
          label: Languages.Zipcode,
          placeholder: Languages.TypeZipcode,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: customStyle,
        },
      },
    };
  };

  onChange = (value) => this.setState({ value });

  _validateCustomer = (customerInfo) => {
    const {
      address1,
      firstName,
      lastName,
      phone,
      province,
      zip,
      // email,
    } = customerInfo;

    if (
      firstName.length === 0 ||
      // lastName.length === 0 ||
      address1.length === 0 ||
      // email.length === 0 ||
      phone.length === 0 ||
      zip.length === 0
    ) {
      return toast(Languages.RequireEnterAllFileds);
    }

    // handle when do not have default addresses --> update default address and also add address to checkout
    const address = Tools.getAddress(customerInfo);
    this._handleSubmit(address);
  };

  _isValidAddress = () => {
    return this.props.address && !isEmpty(this.props.address);
  };

  _handleSubmit = (newAddress) => {
    const { address, accessToken, userInfo } = this.props;
    if (address && !isEmpty(address)) {
      this.props
        .updateUserAddress({
          address: newAddress,
          id: address.id,
          accessToken,
        })
        .then((data) => {
          if (data && data.customerAddress) {
            toast(Languages.UpdateAddressSuccess);
          } else {
            toast(Languages.Error);
          }
        });
    } else {
      this.props.createUserAddress(
        {
          address: newAddress,
        },
        (data) => {
          console.log("dadssdsd", data)
          if (data && data.customerAddress) {
            this.props.updateUserDefaultAddress({
              id: data.customerAddress.id,
              address: data.customerAddress
            });
            this.setState({ added: true });
            this.props.navigation.pop()
          } else {
            toast(this.props.error);
          }
        }
      );
    }
  };

  _onPress = () => {
    const value = this.form.getValue();
    if (value) {
      // if validation fails, value will be null
      this._validateCustomer(value);
    }
  };

  render() {
    return (
      <View style={Styles.Common.CheckoutBoxContainer}>
        <KeyboardAvoidingView style={{ flex: 1 }} enabled>
          <View style={Styles.Common.CheckoutBox}>
            <ScrollView
              contentContainerStyle={Styles.Common.CheckoutBoxScrollView}
            >
              <View style={styles.rowEmpty}>
                <Text style={styles.label}>
                  {Languages.YourDeliveryInfo.toUpperCase()}
                </Text>
              </View>

              <View style={styles.formContainer}>
                <Form
                  ref={(form) => (this.form = form)}
                  type={this.Customer}
                  options={this.options}
                  value={this.state.value}
                  onChange={this.onChange}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <Button
          inactive={this.state.added}
          disabled={this.state.added}
          style={Styles.Common.CheckoutButtonBottom}
          text={
            this.state.added
              ? Languages.AddAddressSuccess
              : this._isValidAddress()
                ? Languages.UpdateAddress
                : Languages.AddAddress
          }
          onPress={this._onPress}
          isLoading={this.props.isFetching}
          type="bottom"
        />
      </View>
    );
  }
}

const { width, height } = Styles.window;
const vh = height / 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  rowEmpty: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    color: Color.Text,
    //fontFamily: Constants.fontFamilyBold,
  },
  formContent: {
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 50,
  },
  input: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    height: vh * 7,
  },
  firstInput: {
    alignItems: "center",
    position: "absolute",
    top: Platform.OS === "ios" ? -20 : 10,
    right: 20,
    left: 20,
  },
  inputAndroid: {
    width: width - 50,
    height: vh * 7,
    paddingLeft: 10,
    marginTop: 10,
    position: "relative",
  },
  lastInput: {
    alignItems: "center",
    position: "absolute",
    bottom: Platform.OS === "ios" ? -20 : 10,
    right: 20,
    left: 20,
  },
  btnNextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  btnNextText: {
    fontWeight: "bold",
  },
  picker: {
    width: width - 80,
  },
  formAddress: {
    borderColor: "#d4dce1",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 200,
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  formContainer: {
    padding: 0,
  },
  bottomView: {
    height: 44,
    borderTopWidth: 1,
    borderTopColor: "#f3f7f9",
    width: Styles.window.width,
    position: "absolute",
    bottom: 0,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.BuyNowButton,
    flex: 1,
  },
});
