import { useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { colors, Route } from '../../constants';
import { LIST_DATA } from './Apis.constants';
import { styles } from './Apis.styles';
import type { ListItemData } from './Apis.types';

interface ListItemProps {
  item: ListItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
}

const ListItem = ({
  item,
  onPress,
  backgroundColor,
  textColor,
}: ListItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.listItem, { backgroundColor }]}
  >
    <Text style={[styles.listItemTitle, { color: textColor }]}>
      {item.value}
    </Text>
  </TouchableOpacity>
);

export const ApiList = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const navigation = useNavigation();

  const handlePress = (item: ListItemData) => {
    setSelectedId(item.id);
    navigation.navigate(Route.ApiDetail, { item });
  };

  const renderItem = ({ item }: { item: ListItemData }) => {
    const backgroundColor =
      item.id === selectedId ? colors.brandPurple : colors.white;
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <ListItem
        item={item}
        onPress={() => handlePress(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitle}>
        Below are a list of available APIs. Click for options to run the api.
      </Text>
      <FlatList
        data={LIST_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default ApiList;
