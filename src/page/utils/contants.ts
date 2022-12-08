export const REGEX_PASSWORD =
  //eslint-disable-next-line
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–\[{}\]:;',?\*~$^\+=<>]).{8,20}$/;

export const TOKEN_KEY = "shopping_end";
export const USER_INFO = "shopping_user";
export const FORMAT_DATE = {
  YYYY_MM_DD: "YYYY-MM-DD",
  DDMMYYYY: "DD/MM/YYYY",
};
export const TAB_MENU = [
  { name: "Trang chủ", key: "home", path: "/home" },
  // {
  //   name: "Pages",
  //   key: "pages",
  //   path: "/pages",
  // },
  {
    name: "Danh mục sản phẩm",
    key: "products",
    path: "/products",
  },
  // {
  //   name: "Blog",
  //   key: "blog",
  //   path: "/blog",
  // },
  {
    name: "Lịch sử mua hàng",
    key: "history",
    path: "/history",
  },
  {
    name: "Danh sách yêu thích",
    key: "listLike",
    path: "/list-like",
  },
];
export const PRODUCT_BRAND = [
  {
    isChecked: false,
    name: "Coaster Furniture",
    value: 1,
  },
  {
    isChecked: false,
    name: "Fusion Dot High Fashion",
    value: 2,
  },
  {
    isChecked: false,
    name: "Unique Furnitture Restor",
    value: 3,
  },
  {
    isChecked: false,
    name: "Dream Furnitture Flipping",
    value: 4,
  },
  {
    isChecked: false,
    name: "Young Repurposed",
    value: 5,
  },
  {
    isChecked: false,
    name: "Green DIY furniture",
    value: 6,
  },
];
export const DISCOUNT_OFFER = [
  {
    isChecked: false,
    name: "20% Cashback",
    value: 1,
  },
  {
    isChecked: false,
    name: "5% Cashback Offer",
    value: 2,
  },
  {
    isChecked: false,
    name: "25% Discount Offer",
    value: 3,
  },
];
export const RATING_ITEM = [
  {
    isChecked: false,
    total: "54321",
    image: [
      require("../../assets/rate.png"),
      require("../../assets/rate.png"),
      require("../../assets/rate.png"),
      require("../../assets/rate.png"),
      require("../../assets/rate.png"),
    ],
    rate: 5,
  },
  {
    isChecked: false,
    total: "4321",
    image: [
      require("../../assets/rate.png"),
      require("../../assets/rate.png"),
      require("../../assets/rate.png"),
      require("../../assets/rate.png"),
      require("../../assets/rate-none.png"),
    ],
    rate: 4,
  },
  {
    isChecked: false,
    total: "321",
    image: [
      require("../../assets/rate.png"),
      require("../../assets/rate.png"),
      require("../../assets/rate.png"),
      require("../../assets/rate-none.png"),
      require("../../assets/rate-none.png"),
    ],
    rate: 3,
  },
  {
    isChecked: false,
    total: "21",
    image: [
      require("../../assets/rate.png"),
      require("../../assets/rate.png"),
      require("../../assets/rate-none.png"),
      require("../../assets/rate-none.png"),
      require("../../assets/rate-none.png"),
    ],
    rate: 2,
  },
  {
    isChecked: false,
    total: "1",
    image: [
      require("../../assets/rate.png"),
      require("../../assets/rate-none.png"),
      require("../../assets/rate-none.png"),
      require("../../assets/rate-none.png"),
      require("../../assets/rate-none.png"),
    ],
    rate: 1,
  },
];

export const CATAGORIES = [
  {
    isChecked: false,
    name: "Prestashop",
    value: 1,
  },
  {
    isChecked: false,
    name: "Magento",
    value: 2,
  },
  {
    isChecked: false,
    name: "Bigcommerce",
    value: 3,
  },
  {
    isChecked: false,
    name: "osCommerce",
    value: 4,
  },
  {
    isChecked: false,
    name: "3dcart",
    value: 5,
  },
  {
    isChecked: false,
    name: "Bags",
    value: 6,
  },
  {
    isChecked: false,
    name: "Watches",
    value: 7,
  },
];

export const PRICE_FILTER = [
  {
    isChecked: false,
    name: "$0.00 - $150.00",
    value: "$0.00 - $150.00",
    from: "0.00",
    to: "150.00",
  },
  {
    isChecked: false,
    name: "$150.00 - $350.00",
    value: "$150.00 - $350.00",
    from: "150.00",
    to: "350.00",
  },
  {
    isChecked: false,
    name: "$150.00 - $504.00",
    value: "$150.00 - $504.00",
    from: "150.00",
    to: "504.00",
  },
  {
    isChecked: false,
    name: "$450.00 +",
    value: "$450.00",
    from: "450.00",
    to: "",
  },
];

export const PRODUCTS_ITEM = "products_item";
export const FAKE_PRODUCTS_ITEM = [
  {
    id: 1,
    image: require("../../assets/item.png"),
    name: "Dictum morbi",
    price: "26.00",
    oldPrice: "30.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnain est adipiscing in phasellus non in justo",
  },
];

export const VALUE_MEMO = "asdasfsdg";
export const VALUE_INP_COMMENT = "sdgvbcnvbcn";
export const PRODUCTS = "TẤT CẢ SẢN PHẨM";
export const PRODUCT_BRANDS = "Nhãn hàng";
export const PRODUCT_CATEGORY = "Danh mục sản phẩm";
export const PRODUCT_STAR = "Đánh giá sản phẩm";
export const PRODUCT_DISCOUNT = "Khuyến mãi";
export const PRODUCT_PRICE_FILTER = "Lọc giá sản phẩm";
