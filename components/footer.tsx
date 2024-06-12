const Footer = (msgLen:any) => {
  return (
    <footer>
      <div className={`container mx-auto text-center text-xs  ${msgLen==0?'bg-[#fffdeb]':''}`}>
        &copy; {new Date().getFullYear()} Medibot. Made with ❤️
      </div>
    </footer>
  )
}

export default Footer