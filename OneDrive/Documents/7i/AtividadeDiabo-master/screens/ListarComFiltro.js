/*jshint esversion:8*/
import React, { useState, useEffect } from "react";

import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  MeuEstiloheet,
  View,
  FlatList,
  TextInput,
  StatusBar,
} from "react-native";
import { auth, firestore } from "../firebase";
import MeuEstilo from "../meuestilo";

const ListaComFiltro = () => {
  const [search, setSearch] = useState("");
  const [dadosFiltrados, setdadosFiltrados] = useState([]);
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore
      .collection("User")
      .doc(auth.currentUser.uid)
      .collection("Filme")
      .onSnapshot((querySnapshot) => {
        const filme = [];
        querySnapshot.forEach((documentSnapshot) => {
          filme.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.filme,
          });
        });
        setdadosFiltrados(filme);
        setFilme(filme);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = filme.filter(function (item) {
        if (item.filme) {
          const itemData = item.filme.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setdadosFiltrados(newData);
      setSearch(text);
    } else {
      setdadosFiltrados(filme);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <Text style={MeuEstilo.item} onPress={() => getItem(item)}>
        {/* {item.id}
        {' - '} */}
        {item.filme.toUpperCase()}
      </Text>
    );
  };

  const getItem = (item) => {
    alert("Filme : " + item.filme);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={MeuEstilo.containerlistarcomfiltro}>
        <TextInput
          style={MeuEstilo.textInputStyle}
          onChangeText={(text) => searchFilter(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Procure Aqui"
        />
        <FlatList
          data={dadosFiltrados}
          keyExtractor={(item) => item.filme}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListaComFiltro;
