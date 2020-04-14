import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import {
  Iterable,
} from 'react-native-iterable';

// Iterable:
// Initialize API.

const App: () => React.ReactNode = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Button title="Login" onPress={() => {
              	Iterable.setEmail("tapash@iterable.com");
            	} 
            }/>
            <Button title="Logout" onPress={() => {
 					    Iterable.setEmail(null);
            	} 
            }/>
            <Button title="Track Event" onPress={() => {
					    Iterable.track("ProductPurchased");
            	} 
            }/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  body: {
    backgroundColor: 'white',
  },
});

export default App;
