import { useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { colors, Route } from '../../constants';
import { LIST_DATA } from './Apis.constants';
import { listStyles } from './Apis.styles';
import type { ApiData } from '../../types';

interface ListItemProps {
  item: ApiData;
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
    style={[listStyles.listItem, { backgroundColor }]}
  >
    <Text style={[listStyles.listItemTitle, { color: textColor }]}>
      {item.value}
    </Text>
  </TouchableOpacity>
);

export const ApiList = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const navigation = useNavigation();

  const handlePress = (item: ApiData) => {
    setSelectedId(item.id);
    navigation.navigate(Route.ApiDetail, { item });
  };

  const renderItem = ({ item }: { item: ApiData }) => {
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
    <SafeAreaView style={listStyles.container}>
      <Text style={listStyles.subtitle}>
        Below is a list of some of the most commonly used APIs. Click API to see
        details and run the code.
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
