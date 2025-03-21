import Image from "next/image"


const Navbar = () => {
  return (
    <nav className='bg-white w-[82vw] fixed top-12 right-[8.5vw] rounded-full p-3 flex flex-row items-center justify-between text-[15px]'>
      <div className="flex flex-row items-center gap-17">
        <Image src="/Linktree-logo.png" alt="Linktree Logo" width={115} height={30} className="ms-8" />
        <ul className="flex flex-row gap-8.5 text-[#676b5f] font-semibold">
          <li>Templates</li>
          <li>Marketplace</li>
          <li>Discover</li>
          <li>Pricing</li>
          <li>Learn</li>
        </ul>
      </div>
      <div className="font-sans font-semibold">
        <button className="login bg-[#eff0ec] py-5 px-8 rounded-xl me-2">Log in</button>
        <button className="signup bg-[#1e2330] py-5 px-8 rounded-full text-white">Sign up free</button>
      </div>
    </nav>
  )
}

export default Navbar