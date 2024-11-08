/**
 * TODO: Add description
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
  categories?: string[];
  dataFields?: unknown;

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

export default IterableCommerceItem;
