import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,

} from 'react-native'
import { Header } from 'react-native/Libraries/NewAppScreen';


const App = () => {
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)
  const [iname, setiname] = useState("")
  const [iprice, setiprice] = useState("")
  const [id, setid] = useState(0)
  const [btn, setbtn] = useState("save data on server")



  const apidata = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3001/product/read");
      const mydata = await response.json();
      console.log(mydata)
      setdata(mydata);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    apidata();
  }, [])

  const post = () => {
    fetch('http://10.0.2.2:3001/product/create', {
      method: 'POST',
      body: JSON.stringify({
        name: `${iname}`,
        price: `${iprice}`
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    apidata();
  }

  const deleteproduct = (id) => {
    fetch(`http://10.0.2.2:3001/product/delete/${id}`, {
      method: "delete"
    })
      .then((response) => response.json())
      .then((res) => console.log(res))
    apidata();
  }

  const populatefields = (item) => {
    setid(item.id);
    setiname(item.name);
    setiprice(item.price);
    setbtn("update data on server");

  }

  const updateproduct = (id) => {
    fetch(`http://10.0.2.2:3001/product/update/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name: `${iname}`,
        price: `${iprice}`
      })
    }).then((response) => response.json())
      .then((res) => console.log(res))
  }


  const dynamic = () => {
    if (btn === "save data on server") {
      post();
      apidata();
    }
    else {
      updateproduct(id);
      apidata();
      setbtn("save data on server");
    }
  }

  return (
    <View>
      {
        loading ? (<Text>data is loading...</Text>)
          : (<View>
            <Text>Api calls using FETCH </Text>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View>
                  <Text>id: {item.id}</Text>
                  <Text>name: {item.name}</Text>
                  <Text>price: {item.price}</Text>
                  <Button
                    title='delete api product'
                    onPress={() => deleteproduct(item.id)}
                  />
                  <Button
                    title='update'
                    onPress={() => populatefields(item)}
                  />
                </View>
              )}
            />
            <Text>enter the details of the product to update through api on db</Text>
            <TextInput
              placeholder='enter name'
              value={iname}
              onChangeText={(value) => { setiname(value) }}
            />
            <TextInput
              placeholder='enter price'
              value={iprice}
              onChangeText={(value) => { setiprice(value) }}
            />
            <Text>{iname},{iprice}</Text>
            <Button
              title={btn}
              onPress={dynamic}
            />

          </View>
          )
      }
    </View>
  )
}

export default App;

const styles = StyleSheet.create({

})