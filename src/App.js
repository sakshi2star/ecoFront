import Navbar from "./camponent/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInForm from "./page/signIn";
import SignUppForm from "./page/signUpp";
import Product from "./page/product";
import ShopCategory from "./page/shopCategory";
import AddTocart from "./page/cart";
import Footer from "./camponent/footer";
// import AddProductData from "./page/prdData";
import PaymentPage from "./page/payment";
import ConfirmationPage from "./page/confirm";
import Home from "./page/home";
import MenBanner1 from './banner/men.jpg'
import MenBanner2 from './banner/men.jpg'
import Wishlist from "./page/wishList";
// import ImageUpload from "./page/image";
// import ProductUpload from "./page/addPrd";



function App() {
  return (
    <div className="flex items-center justify-center  bg-cyan-300">
      <div className="bg-white p-2 rounded-lg shadow-md w-full max-w-full  max-h-full ">
        <BrowserRouter>
          <Navbar />
          {/* <ProductUpload/> */}
          {/* <ImageUpload/> */}
      
          {/* <AddProductData /> local storage */}
          <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignInForm />} />
            <Route path="/signUp" element={<SignUppForm />} />
            <Route path="/men" element={<ShopCategory banners={[MenBanner1, MenBanner2]} category="Men" />} />
            <Route path="/women" element={<ShopCategory category="Women"  />} />
            <Route path="/kids" element={<ShopCategory category="Kids" />} />
            <Route path="/beauty" element={<ShopCategory category="Beauty" />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/wish" element={<Wishlist />} /> 
            <Route path="/cart" element={<AddTocart />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/confirm" element={<ConfirmationPage />} />
          </Routes>
     

          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
