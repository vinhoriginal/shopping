export const REGEX_PASSWORD =
  //eslint-disable-next-line
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–\[{}\]:;',?\*~$^\+=<>]).{8,20}$/;

export const TOKEN_KEY = "shopping_end";
export const USER_INFO = "shopping_user";
export const TAB_MENU = [
  { name: "Home", key: "home", path: "/home" },
  {
    name: "Pages",
    key: "pages",
    path: "/pages",
  },
  {
    name: "Products",
    key: "products",
    path: "/products",
  },
  {
    name: "Blog",
    key: "blog",
    path: "/blog",
  },
  {
    name: "Shop",
    key: "shop",
    path: "/shop",
  },
  {
    name: "Contact",
    key: "contact",
    path: "/contact",
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
  },
  {
    isChecked: false,
    name: "$150.00 - $350.00",
    value: "$150.00 - $350.00",
  },
  {
    isChecked: false,
    name: "$150.00 - $504.00",
    value: "$150.00 - $504.00",
  },
  {
    isChecked: false,
    name: "$450.00 +",
    value: "$450.00",
  },
];
