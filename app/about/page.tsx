import Image from "next/image";
import About from "@/components/about";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main >
      <Navbar/>
     <About/> 
    </main>
  );
}