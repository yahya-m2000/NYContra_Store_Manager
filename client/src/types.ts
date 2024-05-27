type GlobalState = {
  id: string;
  setId: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  formData: string;
  setFormData: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  inStock: boolean;
  setInStock: (value: boolean) => void;
  isHidden: boolean;
  setIsHidden: (value: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedColors: string[];
  setSelectedColors: (value: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (value: string[]) => void;
  imageUrls: string[];
  setImageUrls: (value: string[]) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  shippingPolicy: string;
  setShippingPolicy: (value: string) => void;
  price: number;
  setPrice: (value: number) => void;
};

type Category = {
  value: string;
  label: string;
  options: string[];
};

type Color = {
  value: string;
  label: string;
};
type ImageUrlFieldProps = {
  imageUrls: string[];
  setImageUrls: (value: string[]) => void;
};
type CategorySelectProps = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: Category[];
};

type FormControlsProps = {
  updatedAt: string;
  createdAt: string;
  category: string;
  sizes: string[];
  images: string[];
  gender: string;
  _id: string;
  price: number;
  setPrice: (value: number) => void;
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  shippingPolicy: string;
  setShippingPolicy: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  setSelectedGender: (value: string) => void;
  selectedGender: string;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedColors: string[];
  setSelectedColors: (value: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (value: string[]) => void;
  inStock: boolean;
  setInStock: (value: boolean) => void;
  isHidden: boolean;
  setIsHidden: (value: boolean) => void;
  categories: Category[];
  colors: Color[];
};

//
type SearchResult = {
  id: string;
  brand: string;
  category: string;
  colors: string[];
  createdAt: string;
  description: string;
  gender: string;
  images: string[];
  name: string;
  price: number;
  shippingPolicy: string; // You need to define the type for shippingPolicy
  sizes: string[];
  updatedAt: string;
};
type SearchContextType = {
  searchResults: SearchResult[];
  setSearchResults: (value: SearchResult[] | null) => void;
  selectedItem: SearchResult | null;
  setSelectedItem: (value: SearchResult | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  isUpdateModalOpen: boolean;
  setUpdateModalOpen: (value: boolean) => void;
  setTotalPages: any;
  setCurrentPage: any;
  totalPages: any;
  currentPage: any;
};
