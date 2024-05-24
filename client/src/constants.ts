export const clothingSizes: string[] = ["XS", "S", "M", "L", "XL", "XXL"];
export const footwearSizes: string[] = Array.from({ length: 13 }, (_, i) =>
  (37 + i).toString()
);
export const categories = [
  { value: "Clothing", label: "Clothing", options: clothingSizes },
  { value: "Footwear", label: "Footwear", options: footwearSizes },
];

export const colors = [
  {
    value: "Black",
    label: "Black",
  },
  {
    value: "White",
    label: "White",
  },
  {
    value: "Multi-colour",
    label: "Multi-colour",
  },
  {
    value: "Red",
    label: "Red",
  },
  {
    value: "Blue",
    label: "Blue",
  },
  {
    value: "Green",
    label: "Green",
  },
  {
    value: "Yellow",
    label: "Yellow",
  },
  {
    value: "Purple",
    label: "Purple",
  },
  {
    value: "Pink",
    label: "Pink",
  },
  {
    value: "Orange",
    label: "Orange",
  },
  {
    value: "Brown",
    label: "Brown",
  },
  {
    value: "Gray",
    label: "Gray",
  },
];
