/**
 * IterableCommerceItem represents a single item in a shopping cart.
 * It is used to represent the items in a user's cart when making a purchase.
 *
 * @example
 * ```typescript
 * const commerceItem = new IterableCommerceItem(
 *    '12345',
 *    'Item Name',
 *    10.0,
 *    1,
 *    'SKU12345',
 *    'Item Description',
 *    'https://example.com/item',
 *    'https://example.com/item.jpg',
 *    ['Category1', 'Category2'],
 *    { customField: 'value' }
 * );
 * ```
 *
 * @hideconstructor
 */
export class IterableCommerceItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sku?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  categories?: Array<string>;
  dataFields?: any;

  constructor(
    id: string,
    name: string,
    price: number,
    quantity: number,
    sku?: string,
    description?: string,
    url?: string,
    imageUrl?: string,
    categories?: Array<string>,
    dataFields?: any | undefined
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
