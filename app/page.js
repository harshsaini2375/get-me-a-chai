import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <div className="cont h-[82vh] max-sm:h-[84vh] max-xl:h-[91vh]  overflow-y-scroll overflow-x-hidden">
        <div className="intro text-white flex flex-col justify-center items-center gap-3 py-20  h-fit ">
          <div className="flex justify-center items-center gap-4">
            <div className="font-bold text-3xl">Buy me a Chai</div>
            <div className="w-12"><Image height={50} width={50} className="rounded-full" src="/tea.gif" alt="teaimg" /></div>
          </div>
          <p className="md:p-0 px-5 text-center">A crowdfunding platform for creators. Get funded by your fans and followers. Start now&#33;</p>

          <div className="btn md:p-0 pt-2">
            <Link href={'/login'}>
              <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
            </Link>

            <Link href={'/about'}>
              <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
            </Link>
          </div>
        </div>

        <div className="separation  h-1 bg-slate-600"></div>

        <div className="istpart md:pt-2 md:pb-10 pb-5  h-fit  text-white flex flex-col items-center ">
          <h2 className="text-2xl font-bold py-5 md:py-10">Your fans can buy you a Chai</h2>

          <div className="flex w-screen justify-around flex-col md:flex-row">
            <div className="action flex flex-col items-center md:p-0 py-2">
              <div className="w-16 "><Image height={70} width={70}className="rounded-full" src="/man.gif" alt="mangif" /></div>
              <span className="font-bold">Fans want to help</span>
              <span className="text-center">Your fans are avalaible to help you</span>
            </div>

            <div className="action flex flex-col items-center  md:p-0 py-2">
              <div className="w-16 "><Image height={70} width={70} className="rounded-full" src="/coin.gif" alt="coingif" /></div>
              <span className="font-bold">Fans want to contribute</span>
              <span className="text-center">Your fans are willing to contribute financially</span>
            </div>

            <div className="action flex flex-col items-center  md:p-0 py-2">
              <div className="w-16 "><Image height={70} width={70}     className="rounded-full" src="/group.gif" alt="groupgif" /></div>
              <span className="font-bold">Fans want to collaborate</span>
              <span className="text-center">Your fans are ready to collaborate with you</span>
            </div>
          </div>

        </div>

        <div className="separation  h-1 bg-slate-600"></div>

        <div className="secondpsrt h-fit  px-5 pb-10">
          <h2 className="text-white text-2xl font-bold text-center py-5">Learn more about us</h2>
          <div className="flex justify-center items-center h-56">
          <iframe width="400" height="215" src="https://www.youtube-nocookie.com/embed/ynhq3OvbOKY?si=GZ7KMz2e9qINtXe1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
