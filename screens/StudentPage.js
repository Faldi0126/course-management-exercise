import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export function StudentPage({ navigation }) {
  const [students, setStudents] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const studentsString = await AsyncStorage.getItem('students');

        let students = studentsString ? JSON.parse(studentsString) : [];

        setStudents(students);
      };

      getData();
    }, [])
  );

  const renderItem = ({ item }) => {
    const age = Math.floor(
      (new Date() - new Date(item.dob).getTime()) / 3.15576e10
    );

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          margin: 5,
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
        <Text style={{ fontSize: 18 }}>{age} years old</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditStudent', { student: item })}
        >
          <Icon name="edit" size={24} color="#0000FF" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F0F0F0',
        marginTop: 20,
        padding: 10,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 20 }}>
        Student Page
      </Text>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          backgroundColor: '#FFA500',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate('AddStudent')}
      >
        <Icon name="plus" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
