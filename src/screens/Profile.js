import { Text, View } from 'react-native'
import React, { Component } from 'react'
//import { db, auth } from '../firebase/config'

export default class Profile extends Component {

  constructor(props){
    super(props)
    this.state={
      userInfo: []
    }
  }

  componentDidMount(){
    db
    .collection('users')
    .where('owner', '==', auth.currentUser.email)
    .onSnapshot(docs => {
      let arrDocs = []

      docs.forEach(
        (doc) => {
          arrDocs.push({
            id: doc.id,
            data: doc.data()
          })
        }
      )

      this.setState({
        userInfo: arrDocs
      }, () => console.log('Este es el estado', this.state))

    })
  }

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Text>Aqui va a ir el nombre del usuario</Text>
        {
          this.state.userInfo.length > 0
          ?
          <Text>{this.state.userInfo[0].data.username}</Text>
          : 
          ''
        }
      </View>
    )
  }
}