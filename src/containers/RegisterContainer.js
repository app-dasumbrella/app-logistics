/**
 * Created by InspireUI on 01/03/2017.
 *
 * @format
 */

import React, { PureComponent } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Switch,
  Image,
  I18nManager,
  KeyboardAvoidingView,
} from "react-native";
import { withTheme } from "@callstack/react-theme-provider";
import { register } from "@redux/operations";
import { Languages, Color, Config, Styles } from "@common";
import { toast, error, Validate } from "@app/Omni";
import { ButtonIndex } from "@components";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    netInfoConnected: state.app.netInfoConnected,
    isFetching: state.user.isFetching,
  };
};

@withTheme
@connect(
  mapStateToProps,
  { register }
)
export default class RegisterContainer extends PureComponent {
  constructor(props) {
    super(props);

    let state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      useGeneratePass: false,
    };

    const params = props.params;
    if (params && params.user) {
      state = { ...state, ...params.user, useGeneratePass: true };
    }

    this.state = state;

    this.onFirstNameEditHandle = (firstName) => this.setState({ firstName });
    this.onLastNameEditHandle = (lastName) => this.setState({ lastName });
    this.onUsernameEditHandle = (username) => this.setState({ username });
    this.onEmailEditHandle = (email) => this.setState({ email });
    this.onPasswordEditHandle = (password) => this.setState({ password });

    this.onPasswordSwitchHandle = () =>
      this.setState({ useGeneratePass: !this.state.useGeneratePass });

    this.focusLastName = () => this.lastName && this.lastName.focus();
    this.focusUsername = () => this.username && this.username.focus();
    this.focusEmail = () => this.email && this.email.focus();
    this.focusPassword = () =>
      !this.state.useGeneratePass && this.password && this.password.focus();
  }

  _onSignUpHandle = () => {
    const { netInfoConnected } = this.props;
    if (!netInfoConnected) return toast(Languages.noConnection);

    const {
      username,
      email,
      firstName,
      lastName,
      password,
      useGeneratePass,
    } = this.state;

    const user = {
      username,
      email,
      fullName: firstName,
      lastName,
      password: useGeneratePass ? undefined : password,
    };
    this.props.register(user, (data) => {
      if (data) {
        toast(data.msg);
        this.props.navigation.replace('HomeStack')
      }
    });
  };

  validateForm = () => {
    const {
      email,
      password,
      firstName,
      lastName,
      useGeneratePass,
    } = this.state;
    if (
      Validate.isEmpty(
        email,
        firstName,
        lastName,
        useGeneratePass ? "1" : password
      )
    ) {
      // check empty
      return "Please complete the form";
    } else if (!Validate.isEmail(email)) {
      return "Email is not correct";
    }
    return undefined;
  };

  stopAndToast = (msg) => {
    toast(msg);
    error(msg);
  };

  render() {
    const {
      email,
      password,
      firstName,
      lastName,
      useGeneratePass,
    } = this.state;
    const { isFetching, theme } = this.props;
    const params = this.props.params;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoWrap}>
            <Text style={styles.logoTitle}> Logistics</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputWrap}>
              <TextInput
                {...commonInputProps}
                ref={(comp) => (this.firstName = comp)}
                placeholder={"Full Name"}
                onChangeText={this.onFirstNameEditHandle}
                onSubmitEditing={this.focusLastName}
                autoCapitalize="words"
                returnKeyType="next"
                value={firstName}
              />
            </View>
            {/* <View style={styles.inputWrap}>
              <TextInput
                {...commonInputProps}
                ref={(comp) => (this.lastName = comp)}
                placeholder={Languages.lastName}
                onChangeText={this.onLastNameEditHandle}
                onSubmitEditing={this.focusUsername}
                autoCapitalize="words"
                returnKeyType="next"
                value={lastName}
              />
            </View> */}
            {/* <View style={styles.inputWrap}>
            <TextInput
              {...commonInputProps}
              ref={(comp) => (this.username = comp)}
              placeholder={Languages.username}
              onChangeText={this.onUsernameEditHandle}
              onSubmitEditing={this.focusEmail}
              autoCapitalize="none"
              returnKeyType="next"
              value={username}
            />
          </View> */}
            <View style={styles.inputWrap}>
              <TextInput
                {...commonInputProps}
                ref={(comp) => (this.email = comp)}
                placeholder={Languages.email}
                onChangeText={this.onEmailEditHandle}
                onSubmitEditing={this.focusPassword}
                keyboardType="email-address"
                returnKeyType={useGeneratePass ? "done" : "next"}
                value={email}
              />
            </View>
            {params && params.user ? (
              <View style={styles.switchWrap}>
                <Switch
                  value={useGeneratePass}
                  onValueChange={this.onPasswordSwitchHandle}
                  thumbTintColor={Color.accent}
                  onTintColor={Color.accentLight}
                />
                <Text
                  style={[
                    styles.text,
                    {
                      color: useGeneratePass
                        ? Color.accent
                        : Color.blackTextSecondary,
                    },
                  ]}>
                  {Languages.generatePass}
                </Text>
              </View>
            ) : null}
            {useGeneratePass ? (
              <View />
            ) : (
              <View style={styles.inputWrap}>
                <TextInput
                  {...commonInputProps}
                  ref={(comp) => (this.password = comp)}
                  placeholder={Languages.password}
                  onChangeText={this.onPasswordEditHandle}
                  secureTextEntry
                  returnKeyType="done"
                  value={password}
                />
              </View>
            )}
            <ButtonIndex
              containerStyle={styles.signUpButton(theme)}
              text={Languages.signup.toUpperCase()}
              onPress={this._onSignUpHandle}
              isLoading={isFetching}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: Color.background,
  },
  formContainer: {
    paddingHorizontal: Styles.width * 0.1,
  },
  logoWrap: {
    ...Styles.Common.ColumnCenter,
    flexGrow: 0.55,
  },
  logo: {
    width: 200,
    height: (Styles.width * 0.8) / 2,
  },
  label: {
    fontWeight: "bold",
    fontSize: Styles.FontSize.medium,
    color: Color.blackTextPrimary,
    marginTop: 20,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Color.blackTextDisable,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  input: {
    color: Color.blackTextPrimary,
    borderColor: "#9B9B9B",
    height: 44,
    padding: 10,
    flex: 1,
    textAlign: I18nManager.isRTL ? "right" : "left",
    letterSpacing: 1,
    fontSize: 15,
  },
  signUpButton: (theme) => ({
    marginTop: 20,
    backgroundColor: theme.primaryColor,
    elevation: 1,
  }),
  switchWrap: {
    ...Styles.Common.RowCenterLeft,
    marginTop: 10,
  },
  text: {
    marginLeft: 10,
    color: Color.blackTextSecondary,
  },
  logoTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: Color.blackTextSecondary,
  },
};

const commonInputProps = {
  style: styles.input,
  underlineColorAndroid: "transparent",
  placeholderTextColor: Color.blackTextSecondary,
};
