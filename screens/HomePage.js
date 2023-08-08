import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export function HomePage({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
      }}
    >
      <Text
        style={{ fontSize: 28, fontWeight: 'bold', margin: 20, padding: 20 }}
      >
        Course Management
      </Text>
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
        onPress={() => navigation.navigate('Student')}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>
          Go to Student Page
        </Text>
      </TouchableOpacity>
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
        onPress={() => navigation.navigate('Course')}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>
          Go to Course Page
        </Text>
      </TouchableOpacity>
    </View>
  );
}
