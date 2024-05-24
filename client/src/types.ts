type GlobalState = {
  id: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  formData: string;
  setFormData: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  // Add other state variables and their setters here
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
  price: number | undefined;
  setPrice: (value: number | undefined) => void;
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
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
};
type CategorySelectProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: Category[];
};

type FormControlsProps = {
  updatedAt: string;
  createdAt: string;
  category: string;
  sizes: any;
  images: any;
  gender: string;
  _id: string;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  shippingPolicy: string;
  setShippingPolicy: React.Dispatch<React.SetStateAction<string>>;
  brand: string;
  setBrand: React.Dispatch<React.SetStateAction<string>>;
  setSelectedGender: React.Dispatch<React.SetStateAction<string>>;
  selectedGender: string;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSizes: string[];
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>;
  inStock: boolean;
  setInStock: React.Dispatch<React.SetStateAction<boolean>>;
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
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
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  selectedItem: SearchResult | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<SearchResult | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateModalOpen: boolean;
  setUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTotalPages: any;
  setCurrentPage: any;
  totalPages: any;
  currentPage: any;
};
