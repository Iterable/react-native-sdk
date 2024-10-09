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
