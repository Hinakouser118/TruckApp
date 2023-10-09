import React,{useState} from 'react'
import{StyleSheet,View,Button,TextInput} from 'react-native'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
export default function Pdf() {
  let [name,setName]=useState("");
  const html=`
  <html>
  <body>
  <h1>Hi ${name}</h1>
  <p style="color:red;">Hello,ballari</p>
  </body>
  </html>
  `;
  let generatePDF=async()=>{
    const file=await printToFileAsync({
      html:html,
      base64:false
    });
    await shareAsync(file.uri)
  }
return (
  <View>
<TextInput value={name} placeholder='name' style={styles.textInput} onChangeText={(value)=>setName(value)}/>
<Button title='generate PDF' onPress={generatePDF}/>
  </View>
  )
}
const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
   textInput:{
alignSelf:'stretch',
padding:8,
margin:8
    }
  
})