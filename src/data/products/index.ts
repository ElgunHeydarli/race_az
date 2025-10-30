
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  colors: string[];
  currency: string;
}

// export const products: Product[] = [
//   {
//     id: 1,
//     title: 'Premium Sport Shoes',
//     price: 149.99,
//     category: ProductCategory.TSHIRT,
//     image:
//       'https://s3-alpha-sig.figma.com/img/610c/7296/f494c476f8b6badb8dc0f9d06e5dc925?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hy6GerslKA3~4sG~xQh7Tn1kpvPcd-nl~HBcQayLADrOOmcsqoW7bJRTcdT8tjsYbO5Xw3H7XWIwg~v8C102r6CNwSVogIp9e3jxNPZhna~icxpIKy-m8QX9bMRQ2Uz0BUMEV7Bmb~ejrSM60EzmwLLsqU6~fY~icanGtiH~DQjNXdVBVLfoHjeB4AtPIHn22lFvkUf1-MOzDW2lG5fgj8E0eD7ucisrEvjI6mamESd5Wegkt6L6D2Ez9s6K2FAkiZ8r364Hnn-MMtQMU9TOeS3qbrKXaTdYqpu1TrGeg~WdPOLt9pQ3LPCsCwtE3OZGO4cXXYoyMeB1NWnUrzM9Pg__',
//     colors: ['#000000', '#FF0000', '#FFFFFF'],
//     currency: 'AZN',
//   },
//   {
//     id: 2,
//     title: 'Running Backpack',
//     price: 89.99,
//     category: ProductCategory.SHORTS,
//     image:
//       'https://s3-alpha-sig.figma.com/img/610c/7296/f494c476f8b6badb8dc0f9d06e5dc925?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hy6GerslKA3~4sG~xQh7Tn1kpvPcd-nl~HBcQayLADrOOmcsqoW7bJRTcdT8tjsYbO5Xw3H7XWIwg~v8C102r6CNwSVogIp9e3jxNPZhna~icxpIKy-m8QX9bMRQ2Uz0BUMEV7Bmb~ejrSM60EzmwLLsqU6~fY~icanGtiH~DQjNXdVBVLfoHjeB4AtPIHn22lFvkUf1-MOzDW2lG5fgj8E0eD7ucisrEvjI6mamESd5Wegkt6L6D2Ez9s6K2FAkiZ8r364Hnn-MMtQMU9TOeS3qbrKXaTdYqpu1TrGeg~WdPOLt9pQ3LPCsCwtE3OZGO4cXXYoyMeB1NWnUrzM9Pg__',
//     colors: ['#000000', '#3B82F6', '#374151'],
//     currency: 'AZN',
//   },
//   {
//     id: 3,
//     title: 'Performance Socks',
//     price: 12.99,
//     category: ProductCategory.SHORTS,
//     image:
//       'https://s3-alpha-sig.figma.com/img/610c/7296/f494c476f8b6badb8dc0f9d06e5dc925?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hy6GerslKA3~4sG~xQh7Tn1kpvPcd-nl~HBcQayLADrOOmcsqoW7bJRTcdT8tjsYbO5Xw3H7XWIwg~v8C102r6CNwSVogIp9e3jxNPZhna~icxpIKy-m8QX9bMRQ2Uz0BUMEV7Bmb~ejrSM60EzmwLLsqU6~fY~icanGtiH~DQjNXdVBVLfoHjeB4AtPIHn22lFvkUf1-MOzDW2lG5fgj8E0eD7ucisrEvjI6mamESd5Wegkt6L6D2Ez9s6K2FAkiZ8r364Hnn-MMtQMU9TOeS3qbrKXaTdYqpu1TrGeg~WdPOLt9pQ3LPCsCwtE3OZGO4cXXYoyMeB1NWnUrzM9Pg__',
//     colors: ['#000000', '#FFFFFF', '#6B7280'],
//     currency: 'AZN',
//   },
//   {
//     id: 4,
//     title: 'Training T-Shirt',
//     price: 34.99,
//     category: ProductCategory.TSHIRT,
//     image:
//       'https://s3-alpha-sig.figma.com/img/610c/7296/f494c476f8b6badb8dc0f9d06e5dc925?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hy6GerslKA3~4sG~xQh7Tn1kpvPcd-nl~HBcQayLADrOOmcsqoW7bJRTcdT8tjsYbO5Xw3H7XWIwg~v8C102r6CNwSVogIp9e3jxNPZhna~icxpIKy-m8QX9bMRQ2Uz0BUMEV7Bmb~ejrSM60EzmwLLsqU6~fY~icanGtiH~DQjNXdVBVLfoHjeB4AtPIHn22lFvkUf1-MOzDW2lG5fgj8E0eD7ucisrEvjI6mamESd5Wegkt6L6D2Ez9s6K2FAkiZ8r364Hnn-MMtQMU9TOeS3qbrKXaTdYqpu1TrGeg~WdPOLt9pQ3LPCsCwtE3OZGO4cXXYoyMeB1NWnUrzM9Pg__',
//     colors: ['#000000', '#10B981', '#FFFFFF'],
//     currency: 'AZN',
//   },
//   {
//     id: 5,
//     title: 'Compression Shorts',
//     price: 29.99,
//     category: ProductCategory.TSHIRT,
//     image:
//       'https://s3-alpha-sig.figma.com/img/610c/7296/f494c476f8b6badb8dc0f9d06e5dc925?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hy6GerslKA3~4sG~xQh7Tn1kpvPcd-nl~HBcQayLADrOOmcsqoW7bJRTcdT8tjsYbO5Xw3H7XWIwg~v8C102r6CNwSVogIp9e3jxNPZhna~icxpIKy-m8QX9bMRQ2Uz0BUMEV7Bmb~ejrSM60EzmwLLsqU6~fY~icanGtiH~DQjNXdVBVLfoHjeB4AtPIHn22lFvkUf1-MOzDW2lG5fgj8E0eD7ucisrEvjI6mamESd5Wegkt6L6D2Ez9s6K2FAkiZ8r364Hnn-MMtQMU9TOeS3qbrKXaTdYqpu1TrGeg~WdPOLt9pQ3LPCsCwtE3OZGO4cXXYoyMeB1NWnUrzM9Pg__',
//     colors: ['#000000', '#6366F1', '#FFFFFF'],
//     currency: 'AZN',
//   },
//   {
//     id: 6,
//     title: 'Sports Water Bottle',
//     price: 19.99,
//     category: ProductCategory.TSHIRT,
//     image:
//       'https://s3-alpha-sig.figma.com/img/610c/7296/f494c476f8b6badb8dc0f9d06e5dc925?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hy6GerslKA3~4sG~xQh7Tn1kpvPcd-nl~HBcQayLADrOOmcsqoW7bJRTcdT8tjsYbO5Xw3H7XWIwg~v8C102r6CNwSVogIp9e3jxNPZhna~icxpIKy-m8QX9bMRQ2Uz0BUMEV7Bmb~ejrSM60EzmwLLsqU6~fY~icanGtiH~DQjNXdVBVLfoHjeB4AtPIHn22lFvkUf1-MOzDW2lG5fgj8E0eD7ucisrEvjI6mamESd5Wegkt6L6D2Ez9s6K2FAkiZ8r364Hnn-MMtQMU9TOeS3qbrKXaTdYqpu1TrGeg~WdPOLt9pQ3LPCsCwtE3OZGO4cXXYoyMeB1NWnUrzM9Pg__',
//     colors: ['#F59E0B', '#3B82F6', '#10B981'],
//     currency: 'AZN',
//   },
// ];
