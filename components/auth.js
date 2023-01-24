import React, { useState, useEffect } from 'react';
import {
  View, Text,
  TextInput,
  Button,
  StyleSheet,


} from 'react-native';


const auth = () => {
  const [username, setusername] = useState("")
  const [passowrd, setpassowrd] = useState("")


  const [user, setuser] = useState("")
  const [pass, setpass] = useState("")


  const signup = () => {
    fetch('http://10.0.2.2:3001/auth/create', {
      method: 'POST',
      body: JSON.stringify({
        username: `${username}`,
        password: `${passowrd}`
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  const login = async () => {
     await fetch('http://10.0.2.2:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: `${user}`,
        password: `${pass}`
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  return (
    <View>
      <Text style={{ fontSize: 50 }}>sign up</Text>
      <TextInput
        placeholder='username'
        value={username}
        onChangeText={(value) => { setusername(value) }}
      />
      <TextInput
        placeholder='password'
        value={passowrd}
        onChangeText={(value) => { setpassowrd(value) }}
      />
      <Button
        title='sign-up'
        onPress={signup}
      />
      <Text style={{ fontSize: 50 }}>Login</Text>
      <TextInput
        placeholder='username'
        value={user}
        onChangeText={(value) => { setuser(value) }}
      />
      <TextInput
        placeholder='password'
        value={pass}
        onChangeText={(value) => { setpass(value) }}
      />
      <Button
        title='Log-in'
        onPress={login}
      />
    </View>
  )
}

export default auth;