import { backgroundColor } from "@/lib/utils"

const Footer = (msgLen:any) => {
  return (
    <footer>
      <div className={`w-full z-[-1] fixed bottom-0 mx-auto text-center text-xs bg-[${backgroundColor}]`}>
        &copy; {new Date().getFullYear()} Medibot. Made with ❤️
      </div>
    </footer>
  )
}

export default Footer