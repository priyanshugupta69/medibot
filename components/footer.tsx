const Footer = (msgLen:any) => {
  return (
    <footer>
      <div className='w-full fixed bottom-0 mx-auto text-center text-xs bg-white'>
        &copy; {new Date().getFullYear()} Medibot. Made with ❤️
      </div>
    </footer>
  )
}

export default Footer