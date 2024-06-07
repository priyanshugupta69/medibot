import Image from "next/image";
import ChatApp from "../components/chatapp";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main >
      <Navbar/>
     <ChatApp/> 
    </main>
  );
}
