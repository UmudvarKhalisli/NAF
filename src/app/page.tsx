import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import AboutUs from "@/components/AboutUs";
import EquipmentCards from "@/components/EquipmentCards";
import WhyUs from "@/components/WhyUs";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <EquipmentCards />
      <Categories />
      <WhyUs />
      <ContactForm />
      <Footer />
    </>
  );
}
