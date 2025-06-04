import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
} from 'react-native';
import {
  Iterable,
  IterableInbox,
  IterableInAppMessage,
} from '@iterable/react-native-sdk';

const App = () => {
  const [inAppMessages, setInAppMessages] = useState<IterableInAppMessage[]>([]);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // Initialize Iterable SDK
    Iterable.initialize('YOUR_API_KEY');

    // Set up event listeners
    const unsubscribe = Iterable.onInAppReceived((message: IterableInAppMessage) => {
      console.log('In-app message received:', message);
      setInAppMessages(prev => [...prev, message]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    try {
      await Iterable.setEmail('user@example.com');
      const currentEmail = await Iterable.getEmail();
      if (currentEmail) {
        setEmail(currentEmail);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleTrackEvent = () => {
    Iterable.trackEvent('button_clicked', {
      buttonName: 'track_event',
      timestamp: new Date().toISOString(),
    });
  };

  const handleUpdateUser = () => {
    Iterable.updateUser({
      firstName: 'John',
      lastName: 'Doe',
      customField: 'customValue',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.section}>
          <Text style={styles.title}>Iterable SDK Example</Text>
          <Text style={styles.subtitle}>Architecture: {Platform.OS === 'ios' ? 'Fabric' : 'TurboModule'}</Text>

          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleLogin} />
            <Button title="Track Event" onPress={handleTrackEvent} />
            <Button title="Update User" onPress={handleUpdateUser} />
          </View>

          {email ? (
            <Text style={styles.email}>Logged in as: {email}</Text>
          ) : (
            <Text style={styles.email}>Not logged in</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inbox Messages</Text>
          <View style={styles.inboxContainer}>
            <IterableInbox
              onMessageSelect={(message: IterableInAppMessage) => {
                console.log('Message selected:', message);
              }}
              onMessageDismiss={(message: IterableInAppMessage) => {
                console.log('Message dismissed:', message);
              }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>In-App Messages</Text>
          {inAppMessages.map((message) => (
            <View key={message.messageId} style={styles.messageCard}>
              <Text style={styles.messageTitle}>{message.content.title}</Text>
              <Text style={styles.messageBody}>{message.content.body}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  section: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  email: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333',
  },
  inboxContainer: {
    height: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  messageCard: {
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 6,
    marginBottom: 8,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  messageBody: {
    fontSize: 14,
    color: '#666666',
  },
});

export default App;
