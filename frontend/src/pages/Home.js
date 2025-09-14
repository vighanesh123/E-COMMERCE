import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Smartphone, Laptop, Speaker, Watch, Star, ShoppingCart, Users, Shield, Truck, Keyboard } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ImageSlider from '../components/ImageSlider';
import { productService } from '../services/productService';

const Home = () => {
  const [categoryProducts, setCategoryProducts] = useState({});
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(true);
  const navigate = useNavigate();
  
  // Debug state changes
  console.log('Current state - selectedCategory:', selectedCategory);
  console.log('Current state - showAllCategories:', showAllCategories);
  
  // When selectedCategory changes, update showAllCategories
  useEffect(() => {
    console.log('Selected category changed:', selectedCategory);
    if (selectedCategory) {
      setShowAllCategories(false);
      // Log the available categories and products
      console.log('All category products:', categoryProducts);
      console.log('Products for selected category:', categoryProducts[selectedCategory]?.length || 0);
    }
  }, [selectedCategory, categoryProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const allProducts = await productService.getAllProducts();
        console.log('Products fetched:', allProducts.length);
        
        // Get 10 products for each category
        const productsByCategory = {};
        
        // Define the categories we want to display
        const categoryTypes = ['Phone', 'Laptop', 'Speaker', 'Smartwatch', 'Keyboard', 'Other'];
        
        console.log('Category types to process:', categoryTypes);
        console.log('Categories from UI:', categories.map(c => c.categoryType));
        
        // Sample keyboard products (since there are no keyboard products        // Keyboard Products
        const sampleKeyboardProducts = [
          {
            id: 'kb1',
            name: 'Mechanical RGB Keyboard',
            description: 'Mechanical keyboard with RGB lighting and Cherry MX switches',
            price: 10799.00,
            imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=300&fit=crop',
            category: 'Keyboard',
            brand: 'MechKeys',
            stockQuantity: 15
          },
          {
            id: 'kb2',
            name: 'Wireless Gaming Keyboard',
            description: 'Low latency wireless keyboard for gaming enthusiasts',
            price: 12469.00,
            imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=300&fit=crop',
            category: 'Keyboard',
            brand: 'GameTech',
            stockQuantity: 8
          },
          {
            id: 'kb3',
            name: 'Compact 60% Keyboard',
            description: 'Space-saving 60% layout mechanical keyboard',
            price: 7479.00,
            imageUrl: 'https://os-jo.com/image/cache/catalog/products/Accessories/Keyboard/Glorious-GMMK-COMPACT/615pwbp8bjL._AC_SL1500_-1200x1200.jpg',
            category: 'Keyboard',
            brand: 'MiniType',
            stockQuantity: 12
          },
          {
            id: 'kb4',
            name: 'Ergonomic Split Keyboard',
            description: 'Split design keyboard for improved typing ergonomics',
            price: 16619.00,
            imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=300&fit=crop',
            category: 'Keyboard',
            brand: 'ErgoTech',
            stockQuantity: 5
          },
          {
            id: 'kb5',
            name: 'Low Profile Mechanical Keyboard',
            description: 'Slim design with mechanical switches for quiet typing',
            price: 9969.00,
            imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=300&fit=crop',
            category: 'Keyboard',
            brand: 'SlimType',
            stockQuantity: 10
          },
          {
            id: 'kb6',
            name: 'Programmable Macro Keyboard',
            description: 'Customizable keyboard with programmable macro keys',
            price: 13299.00,
            imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=300&fit=crop',
            category: 'Keyboard',
            brand: 'ProKeys',
            stockQuantity: 7
          },
          {
            id: 'kb7',
            name: 'Bluetooth Multi-Device Keyboard',
            description: 'Connect to multiple devices with easy switching',
            price: 6649.00,
            imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=300&fit=crop',
            category: 'Keyboard',
            brand: 'MultiConnect',
            stockQuantity: 20
          },
          {
            id: 'kb8',
            name: 'Mechanical Numpad',
            description: 'Standalone mechanical numpad for productivity',
            price: 4159.00,
            imageUrl: 'https://m.media-amazon.com/images/I/61wusK+8J3L._AC_.jpg',
            category: 'Keyboard',
            brand: 'NumWorks',
            stockQuantity: 15
          },
          {
            id: 'kb9',
            name: 'Retro Typewriter Keyboard',
            description: 'Vintage typewriter style with modern connectivity',
            price: 14129.00,
            imageUrl: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=500&h=300&fit=crop',
            category: 'Keyboard',
            brand: 'RetroType',
            stockQuantity: 6
          },
          {
            id: 'kb10',
            name: 'Silent Gaming Keyboard',
            description: 'Ultra-quiet mechanical switches for late night gaming',
            price: 11629.00,
            imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=300&fit=crop',
            category: 'Keyboard',
            brand: 'SilentForce',
            stockQuantity: 9
          }
        ];
        
        // Sample smartwatch products
        const sampleSmartwatchProducts = [
          {
            id: 'sw1',
            name: 'Fitness Tracker Watch',
            description: 'Track your fitness goals with heart rate monitoring',
            price: 8309.00,
            imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=300&fit=crop',
            category: 'Smartwatch',
            brand: 'FitTrack',
            stockQuantity: 25
          },
          {
            id: 'sw2',
            name: 'Premium Smartwatch',
            description: 'Premium design with all smart features and long battery life',
            price: 24929.00,
            imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=300&fit=crop',
            category: 'Smartwatch',
            brand: 'SmartLife',
            stockQuantity: 15
          },
          {
            id: 'sw3',
            name: 'Sports Smartwatch',
            description: 'Rugged design for outdoor activities with GPS tracking',
            price: 16619.00,
            imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=300&fit=crop',
            category: 'Smartwatch',
            brand: 'ActiveTrack',
            stockQuantity: 18
          },
          {
            id: 'sw4',
            name: 'Health Monitoring Watch',
            description: 'Advanced health sensors for comprehensive health tracking',
            price: 20774.00,
            imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=300&fit=crop',
            category: 'Smartwatch',
            brand: 'HealthTech',
            stockQuantity: 12
          },
          {
            id: 'sw5',
            name: 'Kids Smartwatch',
            description: 'Child-friendly smartwatch with location tracking',
            price: 6649.00,
            imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=300&fit=crop',
            category: 'Smartwatch',
            brand: 'KidTrack',
            stockQuantity: 30
          },
          {
            id: 'sw6',
            name: 'Luxury Smartwatch',
            description: 'Premium materials with elegant design and smart features',
            price: 33239.00,
            imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=300&fit=crop',
            category: 'Smartwatch',
            brand: 'LuxTech',
            stockQuantity: 8
          },
          {
            id: 'sw7',
            name: 'Minimalist Smartwatch',
            description: 'Simple design with essential smart features',
            price: 12469.00,
            imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=300&fit=crop',
            category: 'Smartwatch',
            brand: 'MinimalTech',
            stockQuantity: 20
          },
          {
            id: 'sw8',
            name: 'Swimming Tracker Watch',
            description: 'Waterproof design with swimming metrics tracking',
            price: 14959.00,
            imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=300&fit=crop',
            category: 'Smartwatch',
            brand: 'AquaTrack',
            stockQuantity: 14
          },
          {
            id: 'sw9',
            name: 'ECG Smartwatch',
            description: 'Medical-grade ECG monitoring in a smartwatch',
            price: 27419.00,
            imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=300&fit=crop',
            category: 'Smartwatch',
            brand: 'CardioTech',
            stockQuantity: 10
          },
          {
            id: 'sw10',
            name: 'Solar Powered Smartwatch',
            description: 'Eco-friendly smartwatch with solar charging capability',
            price: 19109.00,
            imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=300&fit=crop',
            category: 'Smartwatch',
            brand: 'SolarTech',
            stockQuantity: 16
          }
        ];
        
        // Initialize categories with empty arrays
        categoryTypes.forEach(category => {
          productsByCategory[category] = [];
        });
        
        // First, categorize all products from the database
        allProducts.forEach(product => {
          const category = product.category || 'Other';
          
          // Fix product image URLs
          if (product.name && product.name.toLowerCase().includes('google pixel 8 pro')) {
            console.log('Home: Updating Google Pixel 8 Pro image');
            product.imageUrl = 'https://cdn.neowin.com/news/images/uploaded/2023/10/1696431529_pixel-8.jpg';
          }
          if (product.name && product.name.toLowerCase().includes('nothing phone 2')) {
            console.log('Home: Updating Nothing Phone 2 image');
            product.imageUrl = 'https://images.businessupturn.com/wp-content/uploads/2023/07/nothing_phone_2_twitter_1688466810044-1.jpg';
          }
          if (product.name && product.name.toLowerCase().includes('asus zenbook 14')) {
            console.log('Home: Updating ASUS ZenBook 14 image');
            product.imageUrl = 'https://microless.com/cdn/products/36438015f42dcda9091e439b4fec566d-hi.jpg';
          }
          if (product.name && product.name.toLowerCase().includes('jbl charge 5')) {
            console.log('Home: Updating JBL Charge 5 image');
            product.imageUrl = 'https://rvb-img.reverb.com/image/upload/s--JX9Q04_Z--/f_auto,t_large/v1642504026/u5c8lrcs7vbit6a5nb9g.jpg';
          }
          if (product.name && product.name.toLowerCase().includes('sony xm4 earbuds')) {
            console.log('Home: Updating Sony XM4 Earbuds image');
            product.imageUrl = 'https://9to5toys.com/wp-content/uploads/sites/5/2021/06/Sony-XM4-Earbuds-lead.jpg';
          }
          if (product.name && product.name.toLowerCase().includes('compact 60% keyboard')) {
            console.log('Home: Updating Compact 60% Keyboard image');
            product.imageUrl = 'https://os-jo.com/image/cache/catalog/products/Accessories/Keyboard/Glorious-GMMK-COMPACT/615pwbp8bjL._AC_SL1500_-1200x1200.jpg';
          }
          if (product.name && product.name.toLowerCase().includes('mechanical numpad')) {
            console.log('Home: Updating Mechanical Numpad image');
            product.imageUrl = 'https://m.media-amazon.com/images/I/61wusK+8J3L._AC_.jpg';
          }
          if (product.name && product.name.toLowerCase().includes('nintendo switch oled')) {
            console.log('Home: Updating Nintendo Switch OLED image');
            product.imageUrl = 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500';
          }
          if (product.name && product.name.toLowerCase().includes('sony a7 iv')) {
            console.log('Home: Updating Sony A7 IV image');
            product.imageUrl = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500';
          }
          if (product.name && product.name.toLowerCase().includes('gopro hero 11')) {
            console.log('Home: Updating GoPro Hero 11 image');
            product.imageUrl = 'https://www.kompulsa.com/wp-content/uploads/2015/07/Canon-5D-Mark-III-DSLR-Camera.jpg';
          }
          
          // Check if this category is in our defined types
          if (categoryTypes.includes(category)) {
            productsByCategory[category].push(product);
            console.log(`Added product ${product.name} to category ${category}`);
          } else {
            // If not in our defined types, add to Other
            productsByCategory['Other'].push(product);
            console.log(`Added product ${product.name} to Other category (original: ${category})`);
          }
        });
        
        // Then add sample products for categories that need them
        if (productsByCategory['Keyboard'].length === 0) {
          productsByCategory['Keyboard'] = [...sampleKeyboardProducts];
          console.log('Using sample keyboard products:', sampleKeyboardProducts.length);
        }
        
        if (productsByCategory['Smartwatch'].length === 0) {
          productsByCategory['Smartwatch'] = [...sampleSmartwatchProducts];
          console.log('Using sample smartwatch products:', sampleSmartwatchProducts.length);
        }
        
        // Limit each category to 10 products
        categoryTypes.forEach(category => {
          productsByCategory[category] = productsByCategory[category].slice(0, 10);
          console.log(`Final count for ${category}: ${productsByCategory[category].length} products`);
        });
        
        // Get only laptops and phones for featured section
        const laptopsAndPhones = allProducts.filter(product => 
          product.category === 'Laptop' || product.category === 'Phone'
        ).map(product => {
          // Fix product image URLs in featured products too
          if (product.name && product.name.toLowerCase().includes('google pixel 8 pro')) {
            return {
              ...product,
              imageUrl: 'https://cdn.neowin.com/news/images/uploaded/2023/10/1696431529_pixel-8.jpg'
            };
          }
          if (product.name && product.name.toLowerCase().includes('nothing phone 2')) {
            return {
              ...product,
              imageUrl: 'https://images.businessupturn.com/wp-content/uploads/2023/07/nothing_phone_2_twitter_1688466810044-1.jpg'
            };
          }
          if (product.name && product.name.toLowerCase().includes('asus zenbook 14')) {
            return {
              ...product,
              imageUrl: 'https://microless.com/cdn/products/36438015f42dcda9091e439b4fec566d-hi.jpg'
            };
          }
          return product;
        });
        
        const shuffled = laptopsAndPhones.sort(() => 0.5 - Math.random());
        const featured = shuffled.slice(0, 15);
        
        console.log('Featured products:', featured.length);
        console.log('Category products:', Object.keys(productsByCategory).map(k => `${k}: ${productsByCategory[k].length}`));
        
        setCategoryProducts(productsByCategory);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    {
      name: 'Smartphones',
      description: 'Latest phones with cutting-edge technology',
      icon: Smartphone,
      link: '/products/category/Phone',
      categoryType: 'Phone', // Added to match categoryTypes
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=300&fit=crop'
    },
    {
      name: 'Laptops',
      description: 'Powerful laptops for work and gaming',
      icon: Laptop,
      link: '/products/category/Laptop',
      categoryType: 'Laptop',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=300&fit=crop'
    },
    {
      name: 'Headphones & Speakers',
      description: 'Premium audio equipment for music lovers',
      icon: Speaker,
      link: '/products/category/Speaker',
      categoryType: 'Speaker',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop'
    },
    {
      name: 'Smartwatches',
      description: 'Wearable tech for fitness and connectivity',
      icon: Watch,
      link: '/products/category/Smartwatch',
      categoryType: 'Smartwatch',
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=300&fit=crop'
    },
    {
      name: 'Keyboards',
      description: 'Mechanical and gaming keyboards for enthusiasts',
      icon: Keyboard,
      link: '/products/category/Keyboard',
      categoryType: 'Keyboard',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=300&fit=crop'
    },
    {
      name: 'Other Electronics',
      description: 'Tablets, gaming, and cameras',
      icon: Watch,
      link: '/products/category/Other',
      categoryType: 'Other',
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=300&fit=crop'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Trusted by Millions',
      description: 'Join over 1 million satisfied customers worldwide'
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Your data and transactions are always protected'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over ₹1000 with quick delivery'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ImageSlider />

      {/* Categories Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Shop by Category
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">
              Discover our wide range of premium electronics
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer relative z-20 w-full text-left block"
                  onClick={() => navigate(category.link)}
                >
                  <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 sm:p-4 lg:p-6">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <Icon className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 mr-1 sm:mr-2 lg:mr-3 flex-shrink-0" />
                      <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 leading-tight">{category.name}</h3>
                    </div>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2 sm:mb-4 line-clamp-2">{category.description}</p>
                    <Link
                      to={category.link}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium text-xs sm:text-sm lg:text-base"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View All <ArrowRight size={12} className="ml-1 sm:ml-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">
              Discover our most popular tech products
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose TechMart?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-12 px-4">
              We provide the best shopping experience for all your tech needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-4 sm:p-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Icon size={20} className="text-blue-600 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;