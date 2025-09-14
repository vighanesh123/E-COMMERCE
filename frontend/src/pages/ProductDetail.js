import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { productService } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log('ProductDetail: Fetching product with ID:', id);
        const data = await productService.getProductById(id);
        console.log('ProductDetail: Product data received:', data);
        
        // Fix product image URLs
        if (data && data.name && data.name.toLowerCase().includes('google pixel 8 pro')) {
          console.log('ProductDetail: Updating Google Pixel 8 Pro image');
          data.imageUrl = 'https://cdn.neowin.com/news/images/uploaded/2023/10/1696431529_pixel-8.jpg';
        }
        if (data && data.name && data.name.toLowerCase().includes('nothing phone 2')) {
          console.log('ProductDetail: Updating Nothing Phone 2 image');
          data.imageUrl = 'https://images.businessupturn.com/wp-content/uploads/2023/07/nothing_phone_2_twitter_1688466810044-1.jpg';
        }
        if (data && data.name && data.name.toLowerCase().includes('asus zenbook 14')) {
          console.log('ProductDetail: Updating ASUS ZenBook 14 image');
          data.imageUrl = 'https://microless.com/cdn/products/36438015f42dcda9091e439b4fec566d-hi.jpg';
        }
        if (data && data.name && data.name.toLowerCase().includes('jbl charge 5')) {
          console.log('ProductDetail: Updating JBL Charge 5 image');
          data.imageUrl = 'https://rvb-img.reverb.com/image/upload/s--JX9Q04_Z--/f_auto,t_large/v1642504026/u5c8lrcs7vbit6a5nb9g.jpg';
        }
        if (data && data.name && data.name.toLowerCase().includes('sony xm4 earbuds')) {
          console.log('ProductDetail: Updating Sony XM4 Earbuds image');
          data.imageUrl = 'https://9to5toys.com/wp-content/uploads/sites/5/2021/06/Sony-XM4-Earbuds-lead.jpg';
        }
        if (data && data.name && data.name.toLowerCase().includes('compact 60% keyboard')) {
          console.log('ProductDetail: Updating Compact 60% Keyboard image');
          data.imageUrl = 'https://os-jo.com/image/cache/catalog/products/Accessories/Keyboard/Glorious-GMMK-COMPACT/615pwbp8bjL._AC_SL1500_-1200x1200.jpg';
        }
        if (data && data.name && data.name.toLowerCase().includes('mechanical numpad')) {
          console.log('ProductDetail: Updating Mechanical Numpad image');
          data.imageUrl = 'https://m.media-amazon.com/images/I/61wusK+8J3L._AC_.jpg';
        }
        if (data && data.name && data.name.toLowerCase().includes('ergonomic split keyboard')) {
          console.log('ProductDetail: Updating Ergonomic Split Keyboard image');
          data.imageUrl = 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=300&fit=crop';
        }
        if (data && data.name && data.name.toLowerCase().includes('retro typewriter keyboard')) {
          console.log('ProductDetail: Updating Retro Typewriter Keyboard image');
          data.imageUrl = 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=500&h=300&fit=crop';
        }
        if (data && data.name && data.name.toLowerCase().includes('nintendo switch oled')) {
          console.log('ProductDetail: Updating Nintendo Switch OLED image');
          data.imageUrl = 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500';
        }
        if (data && data.name && data.name.toLowerCase().includes('sony a7 iv')) {
          console.log('ProductDetail: Updating Sony A7 IV image');
          data.imageUrl = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500';
        }
        if (data && data.name && data.name.toLowerCase().includes('gopro hero 11')) {
          console.log('ProductDetail: Updating GoPro Hero 11 image');
          data.imageUrl = 'https://www.kompulsa.com/wp-content/uploads/2015/07/Canon-5D-Mark-III-DSLR-Camera.jpg';
        }
        
        setProduct(data);
      } catch (error) {
        console.error('ProductDetail: Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(true);
      const result = await addToCart(product.id, quantity);
      if (result.success) {
        setShowToast(true);
        console.log('Product added to cart successfully');
      } else {
        alert(result.error || 'Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Shield,
      title: '1 Year Warranty',
      description: 'Comprehensive coverage included'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $99'
    },
    {
      icon: RotateCcw,
      title: '30-Day Returns',
      description: 'Easy return policy'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft size={16} className="mr-2 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <Heart size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="sm:w-5 sm:h-5" fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm sm:text-base text-gray-600">(4.5 out of 5)</span>
                <span className="text-gray-400 hidden sm:inline">•</span>
                <span className="text-sm sm:text-base text-gray-600">256 reviews</span>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="border-t pt-4 sm:pt-6">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-base sm:text-lg text-gray-500 line-through">
                  ₹{(product.price * 1.2).toLocaleString('en-IN')}
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs sm:text-sm">
                  Save 17%
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                Stock: {product.stockQuantity > 0 ? (
                  <span className="text-green-600 font-medium">
                    {product.stockQuantity} available
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Out of stock</span>
                )}
              </p>
            </div>

            {/* Quantity Selector */}
            {product.stockQuantity > 0 && (
              <div className="border-t pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <span className="text-sm sm:text-base text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg w-fit">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 text-sm sm:text-base"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 sm:px-4 py-2 border-x text-sm sm:text-base">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 text-sm sm:text-base"
                      disabled={quantity >= product.stockQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-3 sm:py-4 text-base sm:text-lg disabled:opacity-50"
                >
                  <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
                  <span>
                    {addingToCart ? 'Adding...' : 'Add to Cart'}
                  </span>
                </button>
              </div>
            )}

            {/* Product Features */}
            <div className="border-t pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                What's Included
              </h3>
              <div className="grid gap-3 sm:gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                        <Icon size={16} className="text-blue-600 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          {feature.title}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && typeof product.specifications === 'object' && (
              <div className="border-t pt-4 sm:pt-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Specifications
                </h3>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                        <span className="font-medium text-gray-700 text-sm sm:text-base">{key}:</span>
                        <span className="text-gray-600 text-sm sm:text-base">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {showToast && (
        <Toast
          type="cart"
          productName={product.name}
          productImage={product.imageUrl}
          message={`${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart`}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;