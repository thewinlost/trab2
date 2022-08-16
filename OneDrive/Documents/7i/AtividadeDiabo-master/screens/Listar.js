/*jshint esversion:8*/
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  FlatList,
  MeuEstiloheet,
  Text,
  StatusBar,
} from "react-native";
import { auth, firestore } from "../firebase";
import MeuEstilo from "../meuestilo";

const Listar = () => {
  const [loading, setLoading] = useState(true);
  const [filme, setFilme] = useState([]);

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
        setFilme(filme);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const Item = ({ filme }) => (
    <View style={MeuEstilo.item}>
      <Text style={MeuEstilo.title}>{filme}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item filme={item.filme} />;

  return (
    <SafeAreaView style={MeuEstilo.containerlistar}>
      <FlatList
        data={filme}
        renderItem={renderItem}
        keyExtractor={(item) => item.filme}
      />
    </SafeAreaView>
  );
};

export default Listar;
