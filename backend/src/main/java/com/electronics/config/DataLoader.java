package com.electronics.config;

import com.electronics.model.Product;
import com.electronics.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Clear existing products and reload all 160 products
        productRepository.deleteAll();
        loadSampleProducts();
    }

    private void loadSampleProducts() {
        // Smartphones
        createPhone("iPhone 15 Pro", "Latest iPhone with A17 Pro chip", 91499.00, "Apple",
                "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500");

        createPhone("Samsung Galaxy S24 Ultra", "Premium Android smartphone", 107999.00, "Samsung",
                "https://images.unsplash.com/photo-1610792516286-524726503fb2?w=500");

        createPhone("Google Pixel 8 Pro", "Pure Android experience with AI", 83099.00, "Google",
                "https://cdn.neowin.com/news/images/uploaded/2023/10/1696431529_pixel-8.jpg");

        createPhone("OnePlus 12", "Never Settle flagship phone", 70649.00, "OnePlus",
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500");

        createPhone("Xiaomi 14 Ultra", "Photography focused flagship", 78999.00, "Xiaomi",
                "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500");

        createPhone("iPhone 14", "Reliable iPhone experience", 58199.00, "Apple",
                "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500");

        createPhone("Samsung Galaxy A54", "Mid-range powerhouse", 37399.00, "Samsung",
                "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500");

        createPhone("Google Pixel 7a", "Affordable Pixel experience", 41549.00, "Google",
                "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500");

        createPhone("Nothing Phone 2", "Transparent design with Glyph interface", 49849.00, "Nothing",
                "https://images.businessupturn.com/wp-content/uploads/2023/07/nothing_phone_2_twitter_1688466810044-1.jpg");

        createPhone("Realme GT 3", "240W SuperVOOC charging", 45699.00, "Realme",
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500");

        createPhone("Sony Xperia 1 V", "Creator focused smartphone", 99699.00, "Sony",
                "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500");

        // Laptops
        createLaptop("MacBook Pro 16\"", "M3 Max chip for professionals", 207749.00, "Apple",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500");

        createLaptop("ThinkPad X1 Carbon", "Business ultrabook", 124649.00, "Lenovo",
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500");

        createLaptop("Dell XPS 13", "Premium ultrabook", 99699.00, "Dell",
                "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500");

        createLaptop("HP Spectre x360", "2-in-1 convertible laptop", 1299.99, "HP",
                "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500");

        createLaptop("Lenovo ThinkPad X1 Carbon", "Business ultrabook", 1499.99, "Lenovo",
                "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500");

        createLaptop("ASUS ZenBook 14", "Compact performance laptop", 999.99, "ASUS",
                "https://microless.com/cdn/products/36438015f42dcda9091e439b4fec566d-hi.jpg");

        createLaptop("Surface Laptop 5", "Microsoft's premium laptop", 999.99, "Microsoft",
                "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500");

        // Audio Equipment
        createSpeaker("HomePod 2nd Gen", "Smart speaker with spatial audio", 299.99, "Apple",
                "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500");

        createSpeaker("Sonos Era 100", "Compact smart speaker", 249.99, "Sonos",
                "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500");

        createSpeaker("JBL Charge 5", "Portable Bluetooth speaker", 179.99, "JBL",
                "https://rvb-img.reverb.com/image/upload/s--JX9Q04_Z--/f_auto,t_large/v1642504026/u5c8lrcs7vbit6a5nb9g.jpg");

        createSpeaker("Bose SoundLink Revolve+", "360-degree sound", 329.99, "Bose",
                "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500");

        createSpeaker("Sony WH-1000XM5", "Noise cancelling headphones", 399.99, "Sony",
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500");

        createSpeaker("AirPods Pro 2nd Gen", "Premium wireless earbuds", 249.99, "Apple",
                "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500");

        createSpeaker("Marshall Acton III", "Vintage style speaker", 279.99, "Marshall",
                "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500");

        createSpeaker("Beats Studio Buds", "True wireless earbuds", 149.99, "Beats",
                "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500");

        createSpeaker("Bose QuietComfort 45", "Premium headphones", 329.99, "Bose",
                "https://images.unsplash.com/photo-1491927570842-0261e477d937?w=500");

        createSpeaker("Sony XM4 Earbuds", "Industry leading ANC", 279.99, "Sony",
                "https://9to5toys.com/wp-content/uploads/sites/5/2021/06/Sony-XM4-Earbuds-lead.jpg");

        // Additional Speaker Products
        createSpeaker("JBL Flip 6", "Portable waterproof speaker", 129.99, "JBL",
                "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500");

        createSpeaker("Ultimate Ears BOOM 3", "360-degree wireless speaker", 149.99, "Ultimate Ears",
                "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500");

        createSpeaker("Anker Soundcore Motion+", "Hi-Res portable speaker", 99.99, "Anker",
                "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500");

        createSpeaker("Harman Kardon Onyx Studio 7", "Elegant wireless speaker", 199.99, "Harman Kardon",
                "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500");

        createSpeaker("JBL PartyBox 310", "Powerful party speaker", 399.99, "JBL",
                "https://rvb-img.reverb.com/image/upload/s--JX9Q04_Z--/f_auto,t_large/v1642504026/u5c8lrcs7vbit6a5nb9g.jpg");

        createSpeaker("Bose SoundLink Mini II", "Compact premium speaker", 199.99, "Bose",
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500");

        createSpeaker("Sony SRS-XB43", "Extra bass wireless speaker", 249.99, "Sony",
                "https://images.unsplash.com/photo-1491927570842-0261e477d937?w=500");

        createSpeaker("Marshall Kilburn II", "Vintage portable speaker", 299.99, "Marshall",
                "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500");

        createSpeaker("Tribit XSound Go", "Budget Bluetooth speaker", 39.99, "Tribit",
                "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500");

        createSpeaker("Klipsch The Three II", "Premium heritage speaker", 549.99, "Klipsch",
                "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500");

        // Smartwatches
        createSmartwatch("Apple Watch Series 9", "Advanced health monitoring", 399.99, "Apple",
                "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500");

        createSmartwatch("Samsung Galaxy Watch 6", "Premium Android smartwatch", 349.99, "Samsung",
                "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500");

        createSmartwatch("Garmin Fenix 7", "Premium multisport GPS watch", 699.99, "Garmin",
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500");

        createSmartwatch("Fitbit Sense 2", "Advanced health metrics", 299.99, "Fitbit",
                "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500");

        createSmartwatch("Apple Watch Ultra 2", "Rugged outdoor smartwatch", 799.99, "Apple",
                "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500");

        createSmartwatch("Google Pixel Watch 2", "Elegant Wear OS experience", 349.99, "Google",
                "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500");

        createSmartwatch("Amazfit GTR 4", "Long battery life smartwatch", 199.99, "Amazfit",
                "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=500");

        createSmartwatch("Huawei Watch GT 4", "Fitness focused smartwatch", 249.99, "Huawei",
                "https://images.unsplash.com/photo-1564473185935-b0a3f5c92730?w=500");

        createSmartwatch("Withings ScanWatch", "Hybrid health smartwatch", 279.99, "Withings",
                "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500");

        createSmartwatch("TicWatch Pro 5", "Wear OS with dual display", 329.99, "Mobvoi",
                "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500");

        // Keyboards
        createKeyboard("Logitech MX Keys", "Premium wireless keyboard", 119.99, "Logitech",
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500");

        createKeyboard("Keychron Q1", "Customizable mechanical keyboard", 169.99, "Keychron",
                "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500");

        createKeyboard("Razer BlackWidow V4 Pro", "Gaming mechanical keyboard", 229.99, "Razer",
                "https://images.unsplash.com/photo-1595044426077-d36d9236d44a?w=500");

        createKeyboard("Corsair K100 RGB", "Premium gaming keyboard", 249.99, "Corsair",
                "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=500");

        createKeyboard("Apple Magic Keyboard", "Minimalist Apple keyboard", 99.99, "Apple",
                "https://images.unsplash.com/photo-1561112078-7d24e04c3407?w=500");

        createKeyboard("SteelSeries Apex Pro", "Adjustable mechanical keyboard", 199.99, "SteelSeries",
                "https://images.unsplash.com/photo-1595044426125-9ea8611c7f02?w=500");

        createKeyboard("Logitech G915 TKL", "Low profile wireless gaming keyboard", 229.99, "Logitech",
                "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=500");

        createKeyboard("Ducky One 3", "Premium mechanical keyboard", 119.99, "Ducky",
                "https://images.unsplash.com/photo-1595044426077-d36d9236d44a?w=500");

        createKeyboard("GMMK Pro", "Customizable premium keyboard", 349.99, "Glorious",
                "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500");

        createKeyboard("Das Keyboard 4 Professional", "Premium typing experience", 169.99, "Das Keyboard",
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500");

        // Other Electronics
        createOther("iPad Pro 12.9\"", "M2 chip tablet for professionals", 1099.99, "Apple",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500");

        createOther("Samsung Galaxy Tab S9 Ultra", "Premium Android tablet", 1199.99, "Samsung",
                "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500");

        createOther("Nintendo Switch OLED", "Gaming console with OLED screen", 349.99, "Nintendo",
                "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500");

        createOther("PlayStation 5", "Next-gen gaming console", 58199.00, "Sony",
                "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500");

        createOther("DJI Mini 3 Pro", "Compact drone with 4K camera", 759.99, "DJI",
                "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500");

        createOther("GoPro Hero 11", "Action camera with 5.3K video", 399.99, "GoPro",
                "https://www.kompulsa.com/wp-content/uploads/2015/07/Canon-5D-Mark-III-DSLR-Camera.jpg");

        createOther("Canon EOS R7", "Mirrorless camera for enthusiasts", 1499.99, "Canon",
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500");

        createOther("Sony A7 IV", "Full-frame mirrorless camera", 2499.99, "Sony",
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500");

        // Television Products
        createOther("Samsung 55\" QLED TV", "4K Smart QLED Television", 108099.00, "Samsung",
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500");

        createOther("LG 65\" OLED TV", "Premium OLED Smart TV", 157949.00, "LG",
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500");

        createOther("Sony 43\" LED TV", "Full HD Smart LED TV", 45699.00, "Sony",
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500");

        createOther("TCL 50\" 4K TV", "Android TV with HDR", 479.99, "TCL",
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500");

        createOther("Hisense 32\" HD TV", "Compact HD Smart TV", 249.99, "Hisense",
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500");

        createOther("Panasonic 55\" 4K TV", "Ultra HD Smart TV", 649.99, "Panasonic",
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500");

        createOther("Xiaomi 43\" Mi TV", "Budget 4K Smart TV", 329.99, "Xiaomi",
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500");

        createOther("OnePlus 55\" U1S TV", "Premium Android TV", 549.99, "OnePlus",
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500");

        createOther("Realme 32\" Smart TV", "HD Ready Smart TV", 149.99, "Realme",
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500");

        createOther("VU 40\" Premium TV", "Full HD Smart TV", 299.99, "VU",
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500");

        // Router & Networking Products
        createOther("TP-Link Archer C7", "AC1750 Wireless Router", 79.99, "TP-Link",
                "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500");

        createOther("Netgear Nighthawk AX12", "WiFi 6 Gaming Router", 399.99, "Netgear",
                "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500");

        createOther("ASUS AX6000 Router", "WiFi 6 Mesh Router", 299.99, "ASUS",
                "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500");

        createOther("Linksys Velop MX10", "Mesh WiFi System", 449.99, "Linksys",
                "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500");

        createOther("D-Link DIR-867", "AC1750 MU-MIMO Router", 89.99, "D-Link",
                "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500");

        createOther("Ubiquiti Dream Machine", "Enterprise Router", 599.99, "Ubiquiti",
                "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500");

        createOther("Tenda AC23", "Budget AC2100 Router", 49.99, "Tenda",
                "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500");

        createOther("Mercusys MR70X", "AX1800 WiFi 6 Router", 69.99, "Mercusys",
                "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500");

        createOther("Cisco RV340", "Business VPN Router", 199.99, "Cisco",
                "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500");

        createOther("Eero Pro 6E", "Mesh WiFi 6E System", 329.99, "Eero",
                "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500");

        // Refrigerator Products
        createOther("Samsung 28 cu ft Refrigerator", "French Door Smart Refrigerator", 1599.99, "Samsung",
                "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500");

        createOther("LG 26 cu ft InstaView", "Door-in-Door Refrigerator", 1799.99, "LG",
                "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500");

        createOther("Whirlpool 25 cu ft Refrigerator", "Side-by-Side Refrigerator", 1199.99, "Whirlpool",
                "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500");

        createOther("GE Profile 23 cu ft", "Counter Depth Refrigerator", 1399.99, "GE",
                "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500");

        createOther("Frigidaire 18 cu ft", "Top Freezer Refrigerator", 799.99, "Frigidaire",
                "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500");

        createOther("Haier 21 cu ft Refrigerator", "Bottom Freezer Refrigerator", 899.99, "Haier",
                "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500");

        createOther("Bosch 24 cu ft Refrigerator", "French Door Refrigerator", 1599.99, "Bosch",
                "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500");

        createOther("KitchenAid 20 cu ft", "Counter Depth French Door", 1799.99, "KitchenAid",
                "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500");

        createOther("Kenmore 22 cu ft", "Side-by-Side Refrigerator", 999.99, "Kenmore",
                "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500");

        createOther("Electrolux 27 cu ft", "French Door Refrigerator", 1499.99, "Electrolux",
                "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500");

        // Washing Machine Products
        createOther("Samsung 5.2 cu ft Washer", "Front Load Washing Machine", 899.99, "Samsung",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500");

        createOther("LG 4.5 cu ft TurboWash", "High Efficiency Washer", 799.99, "LG",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500");

        createOther("Whirlpool 4.3 cu ft Washer", "Top Load Washing Machine", 649.99, "Whirlpool",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500");

        createOther("GE 4.2 cu ft Washer", "Energy Star Washer", 599.99, "GE",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500");

        createOther("Maytag 4.7 cu ft Washer", "Commercial Grade Washer", 749.99, "Maytag",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500");

        createOther("Bosch 2.2 cu ft Washer", "Compact Front Load Washer", 999.99, "Bosch",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500");

        createOther("Electrolux 4.4 cu ft", "Perfect Steam Washer", 1099.99, "Electrolux",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500");

        createOther("Speed Queen 3.3 cu ft", "Commercial Washer", 1299.99, "Speed Queen",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500");

        createOther("Amana 3.5 cu ft Washer", "Top Load Washer", 449.99, "Amana",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500");

        createOther("Insignia 2.6 cu ft", "Portable Washer", 349.99, "Insignia",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500");

        // Microwave Oven Products
        createOther("Panasonic 2.2 cu ft Microwave", "Inverter Microwave Oven", 199.99, "Panasonic",
                "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500");

        createOther("Samsung 1.9 cu ft Microwave", "Smart Sensor Microwave", 179.99, "Samsung",
                "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500");

        createOther("LG 2.0 cu ft NeoChef", "Smart Inverter Microwave", 229.99, "LG",
                "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500");

        createOther("GE 1.6 cu ft Microwave", "Countertop Microwave", 149.99, "GE",
                "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500");

        createOther("Whirlpool 1.7 cu ft", "Over-the-Range Microwave", 299.99, "Whirlpool",
                "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500");

        createOther("Sharp 1.4 cu ft Microwave", "Carousel Microwave", 119.99, "Sharp",
                "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500");

        createOther("Toshiba 1.5 cu ft", "Smart Sensor Microwave", 139.99, "Toshiba",
                "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500");

        createOther("Breville Combi Wave 3-in-1", "Microwave Air Fryer", 399.99, "Breville",
                "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500");

        createOther("Cuisinart 1.2 cu ft", "Convection Microwave", 249.99, "Cuisinart",
                "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500");

        createOther("BLACK+DECKER 0.9 cu ft", "Compact Microwave", 89.99, "BLACK+DECKER",
                "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500");

        // Air Conditioner Products
        createOther("LG 12000 BTU Window AC", "Energy Star Window AC", 449.99, "LG",
                "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500");

        createOther("Frigidaire 8000 BTU AC", "Compact Window AC", 299.99, "Frigidaire",
                "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500");

        createOther("GE 6000 BTU AC", "Smart Window AC", 249.99, "GE",
                "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500");

        createOther("Whirlpool 10000 BTU AC", "Dehumidifier AC", 399.99, "Whirlpool",
                "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500");

        createOther("Haier 5000 BTU AC", "Ultra Quiet AC", 199.99, "Haier",
                "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500");

        createOther("Midea 14000 BTU Portable", "Portable Air Conditioner", 549.99, "Midea",
                "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500");

        createOther("Honeywell 10000 BTU", "Portable AC with Remote", 399.99, "Honeywell",
                "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500");

        createOther("BLACK+DECKER 8000 BTU", "Portable AC Unit", 329.99, "BLACK+DECKER",
                "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500");

        createOther("Danby 12000 BTU AC", "Window Air Conditioner", 429.99, "Danby",
                "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500");

        createOther("Keystone 6000 BTU AC", "Energy Efficient AC", 229.99, "Keystone",
                "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500");

        // Printer & Scanner Products
        createOther("HP LaserJet Pro M404n", "Monochrome Laser Printer", 199.99, "HP",
                "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500");

        createOther("Canon PIXMA TR8620", "All-in-One Inkjet Printer", 149.99, "Canon",
                "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500");

        createOther("Epson EcoTank ET-4760", "Supertank All-in-One", 399.99, "Epson",
                "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500");

        createOther("Brother HL-L2350DW", "Compact Laser Printer", 129.99, "Brother",
                "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500");

        createOther("HP OfficeJet Pro 9015e", "Smart All-in-One Printer", 229.99, "HP",
                "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500");

        createOther("Canon imageCLASS MF445dw", "Laser All-in-One", 299.99, "Canon",
                "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500");

        createOther("Epson WorkForce WF-2830", "Wireless All-in-One", 99.99, "Epson",
                "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500");

        createOther("Brother MFC-J995DW", "INKvestment Tank", 179.99, "Brother",
                "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500");

        createOther("HP Envy 6055e", "Wireless All-in-One", 119.99, "HP",
                "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500");

        createOther("Lexmark MB2236adw", "Monochrome Laser MFP", 169.99, "Lexmark",
                "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500");

        // Power Bank & Charger Products
        createOther("Anker PowerCore 10000", "Portable Power Bank", 29.99, "Anker",
                "https://images.unsplash.com/photo-1609592806562-3d0e3c8c4e3f?w=500");

        createOther("RAVPower 26800mAh", "High Capacity Power Bank", 49.99, "RAVPower",
                "https://images.unsplash.com/photo-1609592806562-3d0e3c8c4e3f?w=500");

        createOther("Belkin 65W USB-C Charger", "Fast Wall Charger", 39.99, "Belkin",
                "https://images.unsplash.com/photo-1609592806562-3d0e3c8c4e3f?w=500");

        createOther("Samsung 25W Charger", "Super Fast Charging", 24.99, "Samsung",
                "https://images.unsplash.com/photo-1609592806562-3d0e3c8c4e3f?w=500");

        createOther("Apple 20W USB-C Charger", "Power Adapter", 19.99, "Apple",
                "https://images.unsplash.com/photo-1609592806562-3d0e3c8c4e3f?w=500");

        createOther("Aukey 20000mAh Power Bank", "Wireless Power Bank", 34.99, "Aukey",
                "https://images.unsplash.com/photo-1609592806562-3d0e3c8c4e3f?w=500");

        createOther("Mophie Powerstation Plus", "Built-in Cables Power Bank", 59.99, "Mophie",
                "https://images.unsplash.com/photo-1609592806562-3d0e3c8c4e3f?w=500");

        createOther("INIU 10000mAh Power Bank", "Slim Portable Charger", 19.99, "INIU",
                "https://images.unsplash.com/photo-1609592806562-3d0e3c8c4e3f?w=500");

        createOther("Baseus 30000mAh Power Bank", "Digital Display Power Bank", 44.99, "Baseus",
                "https://images.unsplash.com/photo-1609592806562-3d0e3c8c4e3f?w=500");

        createOther("Spigen 10000mAh MagSafe", "Magnetic Wireless Charger", 49.99, "Spigen",
                "https://images.unsplash.com/photo-1609592806562-3d0e3c8c4e3f?w=500");

        // Tablet Products
        createOther("iPad Air 10.9-inch", "M1 Chip Tablet", 54049.00, "Apple",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500");

        createOther("Samsung Galaxy Tab S8", "Android Tablet with S Pen", 62349.00, "Samsung",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500");

        createOther("Microsoft Surface Pro 9", "2-in-1 Laptop Tablet", 99699.00, "Microsoft",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500");

        createOther("Amazon Fire HD 10", "Budget 10-inch Tablet", 179.99, "Amazon",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500");

        createOther("Lenovo Tab P11 Plus", "11-inch Android Tablet", 229.99, "Lenovo",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500");

        createOther("ASUS ZenPad 3S 10", "Premium Android Tablet", 299.99, "ASUS",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500");

        createOther("Huawei MatePad 11", "HarmonyOS Tablet", 349.99, "Huawei",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500");

        createOther("Xiaomi Pad 5", "11-inch MIUI Tablet", 399.99, "Xiaomi",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500");

        createOther("OnePlus Pad", "11.61-inch Android Tablet", 479.99, "OnePlus",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500");

        createOther("Realme Pad Mini", "Compact 8.7-inch Tablet", 179.99, "Realme",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500");

        System.out.println("✅ Loaded 160 sample products into database");
    }

    private void createPhone(String name, String description, double price, String brand, String imageUrl) {
        Map<String, String> specs = new HashMap<>();
        specs.put("Display", "6.1-6.7 inch OLED");
        specs.put("Storage", "128GB - 1TB");
        specs.put("Camera", "48MP - 200MP");
        specs.put("Battery", "3000-5000 mAh");
        specs.put("OS", brand.equals("Apple") ? "iOS" : "Android");

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory("Phone");
        product.setBrand(brand);
        product.setImageUrl(imageUrl);
        product.setSpecifications(specs);
        product.setInStock(true);
        product.setStockQuantity((int) (Math.random() * 50) + 10);

        productRepository.save(product);
    }

    private void createLaptop(String name, String description, double price, String brand, String imageUrl) {
        Map<String, String> specs = new HashMap<>();
        specs.put("Display", "13-16 inch Retina/4K");
        specs.put("Processor", "Intel i7/M2/AMD Ryzen");
        specs.put("RAM", "8-32 GB");
        specs.put("Storage", "256GB - 2TB SSD");
        specs.put("Graphics", "Integrated/Dedicated GPU");

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory("Laptop");
        product.setBrand(brand);
        product.setImageUrl(imageUrl);
        product.setSpecifications(specs);
        product.setInStock(true);
        product.setStockQuantity((int) (Math.random() * 30) + 5);

        productRepository.save(product);
    }

    private void createSpeaker(String name, String description, double price, String brand, String imageUrl) {
        Map<String, String> specs = new HashMap<>();
        specs.put("Type", "Bluetooth/Smart Speaker");
        specs.put("Battery Life", "8-24 hours");
        specs.put("Connectivity", "Bluetooth 5.0/WiFi");
        specs.put("Features", "Water Resistant/ANC");
        specs.put("Drivers", "20mm - 50mm");

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory("Speaker");
        product.setBrand(brand);
        product.setImageUrl(imageUrl);
        product.setSpecifications(specs);
        product.setInStock(true);
        product.setStockQuantity((int) (Math.random() * 40) + 15);

        productRepository.save(product);
    }
    
    private void createSmartwatch(String name, String description, double price, String brand, String imageUrl) {
        Map<String, String> specs = new HashMap<>();
        specs.put("Display", "1.2-2.0 inch AMOLED/Retina");
        specs.put("Battery Life", "18-72 hours");
        specs.put("Water Resistance", "5-10 ATM");
        specs.put("Health Features", "Heart Rate/ECG/SpO2");
        specs.put("OS", brand.equals("Apple") ? "watchOS" : "Wear OS/Proprietary");

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory("Smartwatch");
        product.setBrand(brand);
        product.setImageUrl(imageUrl);
        product.setSpecifications(specs);
        product.setInStock(true);
        product.setStockQuantity((int) (Math.random() * 45) + 10);

        productRepository.save(product);
    }
    
    private void createKeyboard(String name, String description, double price, String brand, String imageUrl) {
        Map<String, String> specs = new HashMap<>();
        specs.put("Type", "Mechanical/Membrane");
        specs.put("Switch Type", "Cherry MX/Gateron/Proprietary");
        specs.put("Connectivity", "Wired/Wireless/Bluetooth");
        specs.put("Layout", "Full-size/TKL/60%");
        specs.put("Features", "RGB/Programmable Keys/Hot-swappable");

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory("Keyboard");
        product.setBrand(brand);
        product.setImageUrl(imageUrl);
        product.setSpecifications(specs);
        product.setInStock(true);
        product.setStockQuantity((int) (Math.random() * 35) + 8);

        productRepository.save(product);
    }

    private void createOther(String name, String description, double price, String brand, String imageUrl) {
        Map<String, String> specs = new HashMap<>();
        specs.put("Type", "Smart Device/Gaming/Camera");
        specs.put("Connectivity", "WiFi/Bluetooth/USB-C");
        specs.put("Features", "Water Resistant/High Performance");
        specs.put("Battery Life", "8-24 hours");
        specs.put("Compatibility", "iOS/Android/Cross-Platform");

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory("Other");
        product.setBrand(brand);
        product.setImageUrl(imageUrl);
        product.setSpecifications(specs);
        product.setInStock(true);
        product.setStockQuantity((int) (Math.random() * 35) + 10);

        productRepository.save(product);
    }
}