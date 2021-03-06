import React, {useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// prettier-ignore
import {SafeAreaView, View, Text, TextInput, TouchableView, UnderlineText}
from '../theme'
import * as D from '../data';
import {AutoFocusProvider, useAutoFocus} from '../contexts';
import {useDispatch} from 'react-redux';
import {LoginAction} from '../store';

// prettier-ignore
export default function Login() {
  const [email, setEmail] = useState<string>(D.randomEmail());
  const [name, setName] = useState<string>(D.randomName());
  const [password, setPassword] = useState<string>(
    D.random(10000, 1000000).toString(),
  );
  const focus = useAutoFocus();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  //드로어네비 > 탭네비(TabNavigator) > 스택 내의 Home 처럼 거쳐서 감
  const goTabNavigator = useCallback(() => {
    dispatch(LoginAction({email, password, name}));
    navigation.navigate('TabNavigator');
  }, []);
  const goSignUp = useCallback(() => navigation.navigate('SignUp'), []);

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>email</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={email}
                onChangeText={setEmail}
                placeholder="enter your email"
              />
            </View>
          </View>
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>password</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                secureTextEntry //입력한 값 ***표시
                onFocus={focus}
                style={[styles.textInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="enter your password"
              />
            </View>
          </View>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={goTabNavigator}>
            <Text style={[styles.text]}>Login</Text>
          </TouchableView>
          <UnderlineText
            style={[styles.text, {marginTop: 15}]}
            onPress={goSignUp}>
            SignUp
          </UnderlineText>
        </AutoFocusProvider>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  view: {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
  text: {fontSize: 20},
  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {width: '100%', padding: 5, marginBottom: 10},
  textInput: {fontSize: 24, padding: 10},
  textInputView: {marginTop: 5, borderRadius: 10},
  touchableView: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
