import React from 'react';
import {Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import SCREENS from '../constants/screens';

const List = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {React.Children.toArray(
        SCREENS.slice(1).map((item) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(item.screenName)}>
            <Text style={styles.buttonText}>{item.text}</Text>
          </TouchableOpacity>
        )),
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    padding: 16,
    backgroundColor: '#45aaf2',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonImage: {
    height: 150,
    resizeMode: 'contain',
    width: 200,
    marginRight: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    flex: 1,
  },
});
export default List;
