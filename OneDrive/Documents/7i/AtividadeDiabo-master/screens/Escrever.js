/*jshint esversion:8*/
import React, { useState } from 'react';
import {  View,  Text,  TextInput,  TouchableOpacity,  KeyboardAvoidingView
} from 'react-native';
import MeuEstilo from '../meuestilo'
import { auth,firestore } from '../firebase'

const Escrever = () => {
  const [filme,  setFilme] = useState('')
  const [diretor,   setDiretor] = useState('')

  const ref = firestore.collection('User').doc(auth.currentUser.uid).collection('Filme').doc();
  const enviarDados = () => {
      ref.set
      ({

       filme:filme,
       diretor: diretor,
       id: ref.id,

     })
     .then(() => {
       alert('Filme ' + filme + ' adicionado com Sucesso! :)')
         
     });
    
  }

  const limparFormulario = () => {
  
  }

  return (
    <KeyboardAvoidingView
      style={MeuEstilo.containerlistar}
      behavior="padding"
    >
      <View style={MeuEstilo.inputcontainerlistar}>
        <TextInput
          placeholder="Filme"
          value={filme}
          onChangeText={text => setFilme(text)}
          style={MeuEstilo.input}
        />
        <TextInput
          placeholder="Diretor"
          value={diretor}
          onChangeText={text => setDiretor(text)}
          style={MeuEstilo.input}
        />
    
       
      </View>

      <View style={MeuEstilo.buttoncontainerlistar}>
        <TouchableOpacity
          onPress={enviarDados}
          style={MeuEstilo.button}
        >
          <Text style={MeuEstilo.buttonText}>Enviar Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={limparFormulario}
          style={[MeuEstilo.button, MeuEstilo.buttonOutline]}
        >
          <Text style={MeuEstilo.buttonOutlineText}>Limpar Formulario</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Escrever

