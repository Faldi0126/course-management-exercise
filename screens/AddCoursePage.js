import React from 'react';
import { TouchableOpacity, View, Text, TextInput, Alert } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AddCoursePage({ navigation }) {
  const [name, setName] = React.useState('');
  const [students, setStudents] = React.useState([]);

  const [studentList, setStudentList] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      const studentsString = await AsyncStorage.getItem('students');

      let students = studentsString ? JSON.parse(studentsString) : [];

      let studentList = students.map(s => ({
        id: s.id.toString(),
        name: s.name,
      }));

      setStudentList(studentList);
    };

    getData();
  }, []);

  const handleSave = async () => {
    if (!name) {
      Alert.alert('Please enter a name');
      return;
    }
    if (students.length === 0) {
      Alert.alert('Please select at least one student');
      return;
    }

    const id = Math.floor(Math.random() * 10000);

    const newCourse = { id, name, students };

    const coursesString = await AsyncStorage.getItem('courses');
    let courses = coursesString ? JSON.parse(coursesString) : [];

    courses.push(newCourse);

    await AsyncStorage.setItem('courses', JSON.stringify(courses));

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F0F0', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 20 }}>
        Add Course
      </Text>
      <Text style={{ fontSize: 18, margin: 10 }}>Name:</Text>
      <TextInput
        style={{
          height: 40,
          margin: 10,
          padding: 10,
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
        }}
        value={name}
        onChangeText={setName}
      />
      <Text style={{ fontSize: 18, margin: 10 }}>Students:</Text>
      <MultiSelect
        style={{
          padding: 10,
          borderRadius: 20,
          alignItems: 'center',
        }}
        items={studentList}
        uniqueKey="id"
        onSelectedItemsChange={setStudents}
        selectedItems={students}
        selectText="Select Students"
        searchInputPlaceholderText="Search Students..."
        tagRemoveIconColor="#0000FF"
        tagBorderColor="#0000FF"
        tagTextColor="#0000FF"
        selectedItemTextColor="#0000FF"
        selectedItemIconColor="#0000FF"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#000' }}
        submitButtonColor="#FFA500"
        submitButtonText="Submit"
      />

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          padding: 10,
          backgroundColor: '#FFA500',
          borderRadius: 20,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            width: 200,
            height: 50,
            backgroundColor: '#FFA500',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
          }}
          onPress={handleSave}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
