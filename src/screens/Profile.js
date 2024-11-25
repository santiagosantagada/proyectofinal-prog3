import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'

export default class Profile extends Component {

  constructor(props){
    super(props)
    this.state={
      userInfo: null,
      posteos: []
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

    db.collection("posteos")
    .where('email', '==', auth.currentUser.email)
    .onSnapshot(
        (docs) => {
            let posts = [];
            docs.forEach( (doc) => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posteos: posts,
                loading: false
            })
        })
  }

  logout() {
    auth
    .signOut()
    .then(() => {
        this.props.navigation.navigate("login")
    })
    .catch((err) => console.log(err))
  }

  handleDelete(id , data){
    db.collection("posteos").doc(id).delete()
    .then(() => {
        //console.log("documento borrado");
    })
    .catch((err) => {
        console.log("error" , err);
    })
  }

  irANuevo () {
        this.props.navigation.navigate('nuevo')
  }

render() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      {
        this.state.userInfo && this.state.userInfo.length > 0 ? (
          <View>
            <Text style={styles.username}>Usuario: {this.state.userInfo[0].data.username}</Text>
            <Text style={styles.email}>Email: {this.state.userInfo[0].data.owner}</Text>
            <Text>Cantidad de posteos: {this.state.posteos.length}</Text>
            </View>
        ) : (
          <Text style={styles.cargando}>Cargando usuario...</Text>
        )
      }

      {this.state.posteos.length === 0
        ? (
            <TouchableOpacity onPress={() => this.irANuevo()}>
                <Text style={styles.emptyMessage}>Comienza a postear!</Text>
            </TouchableOpacity>
          )
        : (
            <FlatList
              data={this.state.posteos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.post}>
                  <Text style={styles.postText}>{item.data.post}</Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => this.handleDelete(item.id)}
                  >
                    <Text style={styles.deleteButtonText}>Borrar</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )
      }
      <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  title: {
    fontSize: 32,           
    fontWeight: 'bold',      
    marginBottom: 30,        
    color: '#333',          
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  cargando: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
  },
  emptyMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginTop: 20,
  },
  post: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
  postText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
