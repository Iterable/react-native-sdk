/**
 * Represents an item for purchase.
 *
 * This is used in methods like `trackPurchase` to track purchases made by
 * users. It is also used in the `updateCart` method to update the shopping cart.
 *
 * @example
 * ```typescript
 * const commerceItem = new IterableCommerceItem(
 *  '12345',
 *  'Example Item',
 *  9.99,
 *  1,
 *  'SKU123',
 *  'An example item for demonstration purposes.',
 *  'https://example.com/item',
 *  'https://example.com/item.jpg',
 *  ['Example', 'Demo'],
 *  { customField: 'value' },
 * );
 *
 * IterableAPI.updateCart([commerceItem]);
 * ```
 */
export class IterableCommerceItem {
  /**
   * The unique identifier for the item.
   */
  id: string;
  /**
   * The name of the item.
   */
  name: string;
  /**
   * The price of the item.
   */
  price: number;
  /**
   * The quantity of the item.
   */
  quantity: number;
  /**
   * The stock keeping unit (SKU) of the item.
   */
  sku?: string;
  /**
   * The description of the item.
   */
  description?: string;
  /**
   * The URL of the item.
   */
  url?: string;
  /**
   * The image URL of the item.
   */
  imageUrl?: string;
  /**
   * The categories the item belongs to.
   */
  categories?: string[];
  /**
   * Additional data fields for the item.
   */
  dataFields?: unknown;

  /**
   * Creates an instance of IterableCommerceItem.
   *
   * @param id - The unique identifier for the item.
   * @param name - The name of the item.
   * @param price - The price of the item.
   * @param quantity - The quantity of the item.
   * @param sku - The stock keeping unit (SKU) of the item.
   * @param description - The description of the item.
   * @param url - The URL of the item.
   * @param imageUrl - The image URL of the item.
   * @param categories - The categories the item belongs to.
   * @param dataFields - Additional data fields for the item.
   *
   * @returns A new instance of IterableCommerceItem.
   *
   * @example
   * ```typescript
   * const commerceItem = new IterableCommerceItem(
   *  '12345',
   *  'Example Item',
   *  9.99,
   *  1,
   *  'SKU123',
   *  'An example item for demonstration purposes.',
   *  'https://example.com/item',
   *  'https://example.com/item.jpg',
   *  ['Example', 'Demo'],
   *  { customField: 'value' },
   * );
   * ```
   */
  constructor(
    id: string,
    name: string,
    price: number,
    quantity: number,
    sku?: string,
    description?: string,
    url?: string,
    imageUrl?: string,
    categories?: string[],
    dataFields?: unknown
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.sku = sku;
    this.description = description;
    this.url = url;
    this.imageUrl = imageUrl;
    this.categories = categories;
    this.dataFields = dataFields;
  }
}
