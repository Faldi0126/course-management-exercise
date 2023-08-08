import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function CoursePage({ navigation }) {
  const [courses, setCourses] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const coursesString = await AsyncStorage.getItem('courses');

        let courses = coursesString ? JSON.parse(coursesString) : [];

        setCourses(courses);
      };

      getData();
    }, [])
  );

  const renderItem = ({ item }) => {
    const studentCount = item.students.length;

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
        <Text style={{ fontSize: 18 }}>{studentCount} Student(s)</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditCourse', { course: item })}
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
        marginTop: 10,
        padding: 10,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 20 }}>
        Course Page
      </Text>
      <FlatList
        data={courses}
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
        onPress={() => navigation.navigate('AddCourse')}
      >
        <Icon name="plus" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
