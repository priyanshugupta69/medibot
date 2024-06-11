import Image from "next/image";
import PrivacyPolicy from "@/components/privacy";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main >
      <Navbar/>
      <PrivacyPolicy/>
    </main>
  );
}