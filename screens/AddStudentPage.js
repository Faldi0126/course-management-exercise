import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export function AddStudentPage({ navigation }) {
  const [name, setName] = React.useState('');
  const [dob, setDob] = React.useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const handleSave = async () => {
    if (!name) {
      Alert.alert('Please enter a name');
      return;
    }
    if (dob > new Date()) {
      Alert.alert('Please enter a valid date of birth');
      return;
    }

    const id = Math.floor(Math.random() * 10000);

    const newStudent = { id, name, dob };

    const studentsString = await AsyncStorage.getItem('students');
    let students = studentsString ? JSON.parse(studentsString) : [];

    students.push(newStudent);

    await AsyncStorage.setItem('students', JSON.stringify(students));

    navigation.goBack();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event, value) => {
    setDob(value);
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F0F0', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 20 }}>
        Add Student
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
      <Text style={{ fontSize: 18, margin: 10 }}>Date of birth:</Text>
      <View
        style={{
          margin: 10,
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
          onPress={showDatePicker}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Enter Date</Text>
        </TouchableOpacity>
      </View>
      {isDatePickerVisible && (
        <DateTimePicker
          mode="date"
          value={dob}
          onChange={handleConfirm}
          style={{ margin: 10 }}
        />
      )}
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
