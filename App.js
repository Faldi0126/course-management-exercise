import { AddCoursePage } from './screens/AddCoursePage';
import { AddStudentPage } from './screens/AddStudentPage';
import { CoursePage } from './screens/CoursePage';
import { EditCoursePage } from './screens/EditCoursePage';
import { EditStudentPage } from './screens/EditStudentPage';
import { HomePage } from './screens/HomePage';
import { StudentPage } from './screens/StudentPage';

import { registerRootComponent } from 'expo';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Student"
          component={StudentPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Course"
          component={CoursePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCourse"
          component={AddCoursePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditCourse"
          component={EditCoursePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddStudent"
          component={AddStudentPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditStudent"
          component={EditStudentPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
