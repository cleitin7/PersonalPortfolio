import { Fragment } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Testimonials from "@/components/Testimonials";
import MyStack from "@/components/MyStack";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main className="overflow-hidden">
        <Hero />
        <AboutMe />
        <Testimonials />
        <MyStack />
        <Services />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <MobileMenu />
    </Fragment>
  );
}
