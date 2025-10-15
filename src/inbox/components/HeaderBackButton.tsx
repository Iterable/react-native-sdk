import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  type TouchableWithoutFeedbackProps,
} from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import { ITERABLE_INBOX_COLORS } from '../constants/colors';

const styles = StyleSheet.create({

  returnButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  returnButtonIcon: {
    color: ITERABLE_INBOX_COLORS.BUTTON_PRIMARY_TEXT,
    fontSize: 40,
    paddingLeft: 0,
  },

  returnButtonText: {
    color: ITERABLE_INBOX_COLORS.BUTTON_PRIMARY_TEXT,
    fontSize: 20,
  },
});

export const HeaderBackButton = (props: TouchableWithoutFeedbackProps) => {
  return (
    <TouchableWithoutFeedback {...props}>
      <View style={styles.returnButton}>
        <Icon name="chevron-back-outline" style={styles.returnButtonIcon} />
        <Text style={styles.returnButtonText}>Inbox</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
