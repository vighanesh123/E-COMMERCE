import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import { productService } from '../services/productService';

// Sample laptop products
export const sampleLaptopProducts = [
  {
    id: 'lt1',
    name: 'Ultrabook Laptop',
    description: 'Thin and light laptop with all-day battery life',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=300&fit=crop',
    category: 'Laptop',
    brand: 'TechBook',
    stockQuantity: 10
  },
  {
    id: 'lt2',
    name: 'Gaming Laptop',
    description: 'Powerful laptop for gaming with dedicated graphics',
    price: 1799.99,
    imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&h=300&fit=crop',
    category: 'Laptop',
    brand: 'GameStation',
    stockQuantity: 8
  },
  {
    id: 'lt3',
    name: 'Business Laptop',
    description: 'Reliable laptop for business professionals',
    price: 999.99,
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=300&fit=crop',
    category: 'Laptop',
    brand: 'WorkBook',
    stockQuantity: 20
  },
  {
    id: 'lt4',
    name: 'Convertible Laptop',
    description: '2-in-1 laptop with touchscreen and stylus support',
    price: 1199.99,
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=300&fit=crop',
    category: 'Laptop',
    brand: 'FlexTech',
    stockQuantity: 15
  },
  {
    id: 'lt5',
    name: 'Budget Laptop',
    description: 'Affordable laptop for everyday tasks',
    price: 599.99,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop',
    category: 'Laptop',
    brand: 'EcoBook',
    stockQuantity: 25
  },
  {
    id: 'lt6',
    name: 'Developer Laptop',
    description: 'High-performance laptop for software development',
    price: 1599.99,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop',
    category: 'Laptop',
    brand: 'CodeMachine',
    stockQuantity: 12
  },
  {
    id: 'lt7',
    name: 'Student Laptop',
    description: 'Lightweight laptop perfect for students',
    price: 799.99,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=300&fit=crop',
    category: 'Laptop',
    brand: 'StudyTech',
    stockQuantity: 30
  },
  {
    id: 'lt8',
    name: 'Workstation Laptop',
    description: 'Professional workstation for demanding applications',
    price: 2499.99,
    imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=300&fit=crop',
    category: 'Laptop',
    brand: 'ProStation',
    stockQuantity: 7
  },
  {
    id: 'lt9',
    name: 'Rugged Laptop',
    description: 'Durable laptop for harsh environments',
    price: 1899.99,
    imageUrl: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&h=300&fit=crop',
    category: 'Laptop',
    brand: 'ToughBook',
    stockQuantity: 9
  },
  {
    id: 'lt10',
    name: 'Chromebook Laptop',
    description: 'Fast and secure Chrome OS laptop',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1624571409412-1f253a42b4d9?w=500&h=300&fit=crop',
    category: 'Laptop',
    brand: 'ChromeTech',
    stockQuantity: 22
  }
];

// Sample keyboard products
export const sampleKeyboardProducts = [
  {
    id: 'kb1',
    name: 'Mechanical RGB Keyboard',
    description: 'Mechanical keyboard with RGB lighting and Cherry MX switches',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1595044426077-d36d9236d44a?w=500&h=300&fit=crop',
    category: 'Keyboard',
    brand: 'MechKeys',
    stockQuantity: 15
  },
  {
    id: 'kb2',
    name: 'Wireless Gaming Keyboard',
    description: 'Low latency wireless keyboard for gaming enthusiasts',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=300&fit=crop',
    category: 'Keyboard',
    brand: 'GameTech',
    stockQuantity: 8
  },
  {
    id: 'kb3',
    name: 'Compact 60% Keyboard',
    description: 'Space-saving 60% layout mechanical keyboard',
    price: 89.99,
    imageUrl: 'https://os-jo.com/image/cache/catalog/products/Accessories/Keyboard/Glorious-GMMK-COMPACT/615pwbp8bjL._AC_SL1500_-1200x1200.jpg',
    category: 'Keyboard',
    brand: 'MiniType',
    stockQuantity: 12
  },
  {
    id: 'kb4',
    name: 'Ergonomic Split Keyboard',
    description: 'Split design keyboard for improved typing ergonomics',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=300&fit=crop',
    category: 'Keyboard',
    brand: 'ErgoTech',
    stockQuantity: 5
  },
  {
    id: 'kb5',
    name: 'Low Profile Mechanical Keyboard',
    description: 'Slim design with mechanical switches for quiet typing',
    price: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=300&fit=crop',
    category: 'Keyboard',
    brand: 'SlimType',
    stockQuantity: 10
  },
  {
    id: 'kb6',
    name: 'Programmable Macro Keyboard',
    description: 'Customizable keyboard with programmable macro keys',
    price: 159.99,
    imageUrl: 'https://images.unsplash.com/photo-1595225593645-6262f09d8b9f?w=500&h=300&fit=crop',
    category: 'Keyboard',
    brand: 'ProKeys',
    stockQuantity: 7
  },
  {
    id: 'kb7',
    name: 'Bluetooth Multi-Device Keyboard',
    description: 'Connect to multiple devices with easy switching',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1587830315891-44d776f55ebc?w=500&h=300&fit=crop',
    category: 'Keyboard',
    brand: 'MultiConnect',
    stockQuantity: 20
  },
  {
    id: 'kb8',
    name: 'Mechanical Numpad',
    description: 'Standalone mechanical numpad for productivity',
    price: 49.99,
    imageUrl: 'https://m.media-amazon.com/images/I/61wusK+8J3L._AC_.jpg',
    category: 'Keyboard',
    brand: 'NumWorks',
    stockQuantity: 15
  },
  {
    id: 'kb9',
    name: 'Retro Typewriter Keyboard',
    description: 'Vintage typewriter style with modern connectivity',
    price: 169.99,
    imageUrl: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=500&h=300&fit=crop',
    category: 'Keyboard',
    brand: 'RetroType',
    stockQuantity: 6
  },
  {
    id: 'kb10',
    name: 'Silent Gaming Keyboard',
    description: 'Ultra-quiet mechanical switches for late night gaming',
    price: 139.99,
    imageUrl: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500&h=300&fit=crop',
    category: 'Keyboard',
    brand: 'SilentForce',
    stockQuantity: 9
  }
];

// Sample smartwatch products
export const sampleSmartwatchProducts = [
  {
    id: 'sw1',
    name: 'Fitness Tracker Watch',
    description: 'Track your fitness goals with heart rate monitoring',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=500&h=300&fit=crop',
    category: 'Smartwatch',
    brand: 'FitTrack',
    stockQuantity: 25
  },
  {
    id: 'sw2',
    name: 'Premium Smartwatch',
    description: 'Premium design with all smart features and long battery life',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop',
    category: 'Smartwatch',
    brand: 'SmartLife',
    stockQuantity: 12
  },
  {
    id: 'sw3',
    name: 'Sports Smartwatch',
    description: 'Rugged design for outdoor activities with GPS tracking',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=300&fit=crop',
    category: 'Smartwatch',
    brand: 'ActiveTrack',
    stockQuantity: 18
  },
  {
    id: 'sw4',
    name: 'Health Monitoring Watch',
    description: 'Advanced health sensors for comprehensive health tracking',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=500&h=300&fit=crop',
    category: 'Smartwatch',
    brand: 'HealthTech',
    stockQuantity: 10
  },
  {
    id: 'sw5',
    name: 'Kids Smartwatch',
    description: 'Child-friendly smartwatch with location tracking',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4a39819d1?w=500&h=300&fit=crop',
    category: 'Smartwatch',
    brand: 'KidTrack',
    stockQuantity: 15
  },
  {
    id: 'sw6',
    name: 'Luxury Smartwatch',
    description: 'Premium materials with elegant design and smart features',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=300&fit=crop',
    category: 'Smartwatch',
    brand: 'LuxTech',
    stockQuantity: 8
  },
  {
    id: 'sw7',
    name: 'Minimalist Smartwatch',
    description: 'Simple design with essential smart features',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=300&fit=crop',
    category: 'Smartwatch',
    brand: 'MinimalTech',
    stockQuantity: 20
  },
  {
    id: 'sw8',
    name: 'Swimming Tracker Watch',
    description: 'Waterproof design with swimming metrics tracking',
    price: 179.99,
    imageUrl: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=300&fit=crop',
    category: 'Smartwatch',
    brand: 'AquaTrack',
    stockQuantity: 14
  },
  {
    id: 'sw9',
    name: 'ECG Smartwatch',
    description: 'Medical-grade ECG monitoring in a smartwatch',
    price: 329.99,
    imageUrl: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500&h=300&fit=crop',
    category: 'Smartwatch',
    brand: 'CardioTech',
    stockQuantity: 7
  },
  {
    id: 'sw10',
    name: 'Solar Powered Smartwatch',
    description: 'Eco-friendly smartwatch with solar charging capability',
    price: 229.99,
    imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&h=300&fit=crop',
    category: 'Smartwatch',
    brand: 'SolarTech',
    stockQuantity: 11
  }
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const category = params.category;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    fetchProducts();
  }, [category]);

  // Category filtering has been removed

  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Products page: Fetching products...');
      let data;
      
      if (category) {
        console.log(`Products page: Fetching products for category: ${category}`);
        
        // Try to fetch from backend first
        try {
          data = await productService.getProductsByCategory(category);
          console.log(`Products page: Fetched ${data.length} products from backend for category: ${category}`);
        } catch (error) {
          console.error(`Products page: Error fetching products for category ${category}, using sample data:`, error);
          
          // Fallback to sample products if backend fails
          const samplePhoneProducts = [
            {
              id: 'ph1',
              name: 'Google Pixel 8 Pro',
              description: 'Pure Android experience with AI',
              price: 899.99,
              imageUrl: 'https://cdn.neowin.com/news/images/uploaded/2023/10/1696431529_pixel-8.jpg',
              category: 'Phone',
              brand: 'Google',
              stockQuantity: 25
            },
            {
              id: 'ph2',
              name: 'Budget Smartphone',
              description: 'Affordable smartphone with great performance',
              price: 349.99,
              imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop',
              category: 'Phone',
              brand: 'MobileValue',
              stockQuantity: 40
            },
            {
              id: 'ph3',
              name: 'Gaming Smartphone',
              description: 'Designed for mobile gaming with cooling system',
              price: 699.99,
              imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=300&fit=crop',
              category: 'Phone',
              brand: 'GamePhone',
              stockQuantity: 15
            }
          ];

          const sampleSpeakerProducts = [
            {
              id: 'sp1',
              name: 'Bluetooth Speaker',
              description: 'Portable Bluetooth speaker with 360° sound',
              price: 129.99,
              imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop',
              category: 'Speaker',
              brand: 'SoundWave',
              stockQuantity: 30
            },
            {
              id: 'sp2',
              name: 'Smart Speaker',
              description: 'Voice-controlled smart speaker with assistant',
              price: 199.99,
              imageUrl: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&h=300&fit=crop',
              category: 'Speaker',
              brand: 'VoiceHub',
              stockQuantity: 25
            },
            {
              id: 'sp3',
              name: 'Bookshelf Speakers',
              description: 'Premium bookshelf speakers for home audio',
              price: 349.99,
              imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=300&fit=crop',
              category: 'Speaker',
              brand: 'AudioPerfect',
              stockQuantity: 12
            }
          ];
          
          // Combine all sample products
          const allSampleProducts = [
            ...samplePhoneProducts,
            ...sampleLaptopProducts,
            ...sampleSpeakerProducts,
            ...sampleKeyboardProducts,
            ...sampleSmartwatchProducts
          ];
          
          // Map category names to their respective sample products
          const categoryMap = {
            'Phone': 'Phone',
            'Laptop': 'Laptop',
            'Speaker': 'Speaker',
            'Smartwatch': 'Smartwatch',
            'Keyboard': 'Keyboard',
            'Other': 'Other'
          };
          
          const mappedCategory = categoryMap[category] || category;
          
          data = allSampleProducts.filter(product => 
            product.category.toLowerCase() === mappedCategory.toLowerCase()
          );
          
          if (data.length === 0) {
            // If no exact match, try to find products that contain the category string
            data = allSampleProducts.filter(product => 
              product.category.toLowerCase().includes(mappedCategory.toLowerCase())
            );
          }
        }
        
        console.log(`Products page: Found ${data.length} products for category: ${category}`);
      } else {
        // When no category is specified, try to fetch all products from backend
        try {
          data = await productService.getAllProducts();
          console.log('Products page: Fetched all products from backend:', data.length);
        } catch (error) {
          console.error('Products page: Error fetching all products, using sample data:', error);
          // If backend fetch fails, use sample data
          data = [];
        }
      }
      
      console.log('Products page: Products fetched:', data);
      setProducts(data);
    } catch (error) {
      console.error('Products page: Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Always add sample products to ensure we have products to display
    // This ensures products are shown even if backend connection fails
    filtered = [...filtered, ...sampleKeyboardProducts, ...sampleSmartwatchProducts, ...sampleLaptopProducts];
    
    // FORCE UPDATE: Replace product images with correct ones
    filtered = filtered.map(product => {
      if (product.name && product.name.toLowerCase().includes('google pixel 8 pro')) {
        console.log('Found Google Pixel 8 Pro, updating image:', product);
        return {
          ...product,
          imageUrl: 'https://cdn.neowin.com/news/images/uploaded/2023/10/1696431529_pixel-8.jpg',
          name: 'Google Pixel 8 Pro',
          description: 'Pure Android experience with AI',
          price: 899.99,
          category: 'Phone',
          brand: 'Google'
        };
      }
      if (product.name && product.name.toLowerCase().includes('nothing phone 2')) {
        console.log('Found Nothing Phone 2, updating image:', product);
        return {
          ...product,
          imageUrl: 'https://images.businessupturn.com/wp-content/uploads/2023/07/nothing_phone_2_twitter_1688466810044-1.jpg'
        };
      }
      if (product.name && product.name.toLowerCase().includes('asus zenbook 14')) {
        console.log('Found ASUS ZenBook 14, updating image:', product);
        return {
          ...product,
          imageUrl: 'https://microless.com/cdn/products/36438015f42dcda9091e439b4fec566d-hi.jpg'
        };
      }
      if (product.name && product.name.toLowerCase().includes('jbl charge 5')) {
        console.log('Found JBL Charge 5, updating image:', product);
        return {
          ...product,
          imageUrl: 'https://rvb-img.reverb.com/image/upload/s--JX9Q04_Z--/f_auto,t_large/v1642504026/u5c8lrcs7vbit6a5nb9g.jpg'
        };
      }
      if (product.name && product.name.toLowerCase().includes('sony xm4 earbuds')) {
        console.log('Found Sony XM4 Earbuds, updating image:', product);
        return {
          ...product,
          imageUrl: 'https://9to5toys.com/wp-content/uploads/sites/5/2021/06/Sony-XM4-Earbuds-lead.jpg'
        };
      }
      if (product.name && product.name.toLowerCase().includes('nintendo switch oled')) {
        console.log('Found Nintendo Switch OLED, updating image:', product);
        return {
          ...product,
          imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500'
        };
      }
      if (product.name && product.name.toLowerCase().includes('sony a7 iv')) {
        console.log('Found Sony A7 IV, updating image:', product);
        return {
          ...product,
          imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500'
        };
      }
      if (product.name && product.name.toLowerCase().includes('gopro hero 11')) {
        console.log('Found GoPro Hero 11, updating image:', product);
        return {
          ...product,
          imageUrl: 'https://www.kompulsa.com/wp-content/uploads/2015/07/Canon-5D-Mark-III-DSLR-Camera.jpg'
        };
      }
      return product;
    });
    
    console.log('All products after filtering:', filtered.map(p => ({ name: p.name, imageUrl: p.imageUrl })));
    
    // If we're filtering by category, only keep products of that category
    if (category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === category.toLowerCase() ||
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Filter by search query with enhanced search including synonyms
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      
      // Define search synonyms for better matching (includes plural forms and common typos)
      const searchSynonyms = {
        'mobile': ['phone', 'smartphone', 'iphone', 'android', 'mobiles', 'phones', 'smartphones', 'mobil', 'moble', 'movile'],
        'mobiles': ['phone', 'smartphone', 'iphone', 'android', 'mobile', 'phones', 'smartphones', 'mobils', 'mobles'],
        'phone': ['mobile', 'smartphone', 'iphone', 'android', 'phones', 'mobiles', 'smartphones', 'fone', 'phon'],
        'phones': ['mobile', 'smartphone', 'iphone', 'android', 'phone', 'mobiles', 'smartphones', 'fones', 'phons'],
        'smartphone': ['phone', 'mobile', 'iphone', 'android', 'smartphones', 'phones', 'mobiles', 'smartfone', 'smart phone'],
        'smartphones': ['phone', 'mobile', 'iphone', 'android', 'smartphone', 'phones', 'mobiles', 'smartfones', 'smart phones'],
        'laptop': ['notebook', 'computer', 'macbook', 'ultrabook', 'laptops', 'notebooks', 'computers', 'leptop', 'laptap', 'lap top'],
        'laptops': ['notebook', 'computer', 'macbook', 'ultrabook', 'laptop', 'notebooks', 'computers', 'leptops', 'laptaps'],
        'computer': ['laptop', 'notebook', 'pc', 'macbook', 'computers', 'laptops', 'notebooks', 'compter', 'computr'],
        'computers': ['laptop', 'notebook', 'pc', 'macbook', 'computer', 'laptops', 'notebooks', 'compters', 'computrs'],
        'headphone': ['headset', 'earphone', 'earbud', 'audio', 'speaker', 'headphones', 'headsets', 'earphones', 'headfone', 'head phone'],
        'headphones': ['headset', 'earphone', 'earbud', 'audio', 'speaker', 'headphone', 'headsets', 'earphones', 'headfones', 'head phones'],
        'speaker': ['audio', 'sound', 'bluetooth', 'headphone', 'earphone', 'headset', 'speakers', 'speeker', 'speakr'],
        'speakers': ['audio', 'sound', 'bluetooth', 'headphone', 'earphone', 'headset', 'speaker', 'speekers', 'speakrs'],
        'audio': ['speaker', 'headphone', 'sound', 'earphone', 'headset', 'speakers', 'headphones', 'audi', 'audeo'],
        'sound': ['speaker', 'audio', 'headphone', 'bluetooth', 'speakers', 'headphones', 'sond', 'sownd'],
        'bluetooth': ['speaker', 'audio', 'wireless', 'headphone', 'speakers', 'headphones', 'blutooth', 'blue tooth'],
        'watch': ['smartwatch', 'wearable', 'fitness tracker', 'watches', 'smartwatches', 'wach', 'watc'],
        'watches': ['smartwatch', 'wearable', 'fitness tracker', 'watch', 'smartwatches', 'waches', 'watces'],
        'smartwatch': ['watch', 'wearable', 'fitness tracker', 'smart watch', 'smartwatches', 'watches', 'smartwach', 'smart wach'],
        'smartwatches': ['watch', 'wearable', 'fitness tracker', 'smart watch', 'smartwatch', 'watches', 'smartwaches', 'smart waches'],
        'wearable': ['smartwatch', 'watch', 'fitness tracker', 'wearables', 'smartwatches', 'watches', 'werable', 'wearabel'],
        'wearables': ['smartwatch', 'watch', 'fitness tracker', 'wearable', 'smartwatches', 'watches', 'werables', 'wearabels'],
        'fitness': ['smartwatch', 'watch', 'tracker', 'wearable', 'smartwatches', 'watches', 'fitnes', 'fitnes'],
        'keyboard': ['keyboards', 'typing', 'mechanical', 'gaming', 'keybord', 'key board'],
        'keyboards': ['keyboard', 'typing', 'mechanical', 'gaming', 'keybords', 'key boards'],
        'tablet': ['ipad', 'tab', 'tablets', 'tablit', 'tablat'],
        'tablets': ['ipad', 'tab', 'tablet', 'tablits', 'tablats'],
        'ipad': ['tablet', 'apple', 'tab', 'ipads', 'i pad'],
        'ipads': ['tablet', 'apple', 'tab', 'ipad', 'i pads']
      };
      
      filtered = filtered.filter(product => {
        // Standard search in product fields
        const standardMatch = 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);
        
        // Enhanced fuzzy matching for typos and partial words
        let fuzzyMatch = false;
        const queryWords = query.split(' ').filter(word => word.length > 0);
        const productNameWords = product.name.toLowerCase().split(' ');
        const productDescWords = product.description.toLowerCase().split(' ');
        const productBrandWords = product.brand.toLowerCase().split(' ');
        
        // Function to calculate similarity between two strings (Levenshtein distance)
        const calculateSimilarity = (str1, str2) => {
          const len1 = str1.length;
          const len2 = str2.length;
          const matrix = Array(len1 + 1).fill().map(() => Array(len2 + 1).fill(0));
          
          for (let i = 0; i <= len1; i++) matrix[i][0] = i;
          for (let j = 0; j <= len2; j++) matrix[0][j] = j;
          
          for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
              if (str1[i - 1] === str2[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
              } else {
                matrix[i][j] = Math.min(
                  matrix[i - 1][j] + 1,
                  matrix[i][j - 1] + 1,
                  matrix[i - 1][j - 1] + 1
                );
              }
            }
          }
          
          const maxLen = Math.max(len1, len2);
          return maxLen === 0 ? 1 : (maxLen - matrix[len1][len2]) / maxLen;
        };
        
        // Check if all query words are found with fuzzy matching
        if (queryWords.length > 0) {
          fuzzyMatch = queryWords.every(queryWord => {
            // Check exact partial matches first
            const exactMatch = 
              productNameWords.some(nameWord => nameWord.includes(queryWord)) ||
              productDescWords.some(descWord => descWord.includes(queryWord)) ||
              productBrandWords.some(brandWord => brandWord.includes(queryWord));
            
            if (exactMatch) return true;
            
            // If no exact match, try fuzzy matching for typos (similarity > 0.7)
            const fuzzyNameMatch = productNameWords.some(nameWord => 
              nameWord.length > 2 && queryWord.length > 2 && calculateSimilarity(nameWord, queryWord) > 0.7
            );
            const fuzzyDescMatch = productDescWords.some(descWord => 
              descWord.length > 2 && queryWord.length > 2 && calculateSimilarity(descWord, queryWord) > 0.7
            );
            const fuzzyBrandMatch = productBrandWords.some(brandWord => 
              brandWord.length > 2 && queryWord.length > 2 && calculateSimilarity(brandWord, queryWord) > 0.7
            );
            const fuzzyCategoryMatch = queryWord.length > 2 && product.category.length > 2 && 
              calculateSimilarity(product.category.toLowerCase(), queryWord) > 0.7;
            
            return fuzzyNameMatch || fuzzyDescMatch || fuzzyBrandMatch || fuzzyCategoryMatch;
          });
        }
        
        // Enhanced search with synonyms
        let synonymMatch = false;
        if (searchSynonyms[query]) {
          synonymMatch = searchSynonyms[query].some(synonym => 
            product.name.toLowerCase().includes(synonym) ||
            product.description.toLowerCase().includes(synonym) ||
            product.brand.toLowerCase().includes(synonym) ||
            product.category.toLowerCase().includes(synonym)
          );
        }
        
        // Also check if any synonym of the product category matches the search query
        let categoryMatch = false;
        const productCategory = product.category.toLowerCase();
        Object.keys(searchSynonyms).forEach(key => {
          if (searchSynonyms[key].includes(productCategory) && key.includes(query)) {
            categoryMatch = true;
          }
        });
        
        return standardMatch || fuzzyMatch || synonymMatch || categoryMatch;
      });
    }

    console.log('Filtered products:', filtered.length);
    console.log('Laptops in filtered products:', filtered.filter(p => p.category === 'Laptop').length);
    console.log('Phones in filtered products:', filtered.filter(p => p.category === 'Phone').length);
    
    setFilteredProducts(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Category filtering has been removed

  const getCategoryTitle = () => {
    return category ? `${category} Products` : 'All Products';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 mb-4 sm:mb-6 lg:mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              {getCategoryTitle()}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 px-2">
              Discover our complete collection of premium electronics
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Results Summary */}
        <div className="mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-gray-600 px-2">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16 sm:h-24 sm:w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-3.5M4 13h3.5M9 13h6M4 13V8" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {searchQuery
                ? 'Try adjusting your search'
                : 'Products will appear here once they are loaded'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                }}
                className="btn-primary text-sm sm:text-base px-4 py-2"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;