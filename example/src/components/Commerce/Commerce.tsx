import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';

import { Iterable, IterableCommerceItem } from '@iterable/react-native-sdk';

import { items, type CommerceItem } from './Commerce.constants';
import styles from './Commerce.styles';

export const Commerce = () => {
  const handleClick = (item: CommerceItem) => {
    const purchasedItem = new IterableCommerceItem(
      item.id,
      item.name,
      item.price,
      1
    );
    const totalPrice = item.price;
    const purchaseItems = [purchasedItem];
    const dataFields = null;

    Iterable.trackPurchase(totalPrice, purchaseItems, dataFields);

    // Example of using the new Android-style logging
    Iterable.logger.log('Purchase tracked with the following arguments:');
    Iterable.logger.log('Total price:', totalPrice);
    Iterable.logger.log('Purchase items:', [...purchaseItems]);
    Iterable.logger.log('Data fields:', dataFields);

    Alert.alert(
      `Tracked purchase: ${item.name}, $${item.price}`,
      'Check logs for output'
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Commerce</Text>
        <Text style={styles.subtitle}>
          Purchase will be tracked when &quot;Buy&quot; is clicked. See logs for
          output.
        </Text>
        {items.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            <View style={styles.infoContainer}>
              <View style={styles.imageContainer}>
                <Image source={item.icon} style={styles.cardImage} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Pressable
                  style={styles.button}
                  onPress={() => handleClick(item)}
                >
                  <Text style={styles.buttonText}>Buy</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Commerce;
