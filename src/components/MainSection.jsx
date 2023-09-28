import styles from "../style";
import {abstract, arrowUp, discount} from "../assets";

const MainSection = () => {
  return (
      <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
          <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
            <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
            <p className={`${styles.paragraph} ml-2`}>
              <span className="text-white">2$</span> Discount For{" "}
              <span className="text-white">2 Minutes</span> of Ads
            </p>
          </div>

          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
              Watch <br className="sm:block hidden" />
              <span className="text-gradient">And</span>
            </h1>
          </div>

          <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
            Ship.
          </h1>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Redefining the delivery experience with unmatched transparency and efficiency.
            <br/>Dive into a world where every parcel's journey is as exclusive as its destination.
          </p>

          <div className="ss:flex hidden md:mr-4 mr-0 mt-5">
            <button
                aria-label="Get Started"
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            >
            <span className="w-[23px] h-[23px] object-contain" aria-hidden="true">
                <img src={arrowUp} alt="arrow pointing up" />
            </span>
              <span className="text-gradient">Get Started</span>
            </button>
          </div>
        </div>

        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
          <img src={abstract} alt="billing" className="w-[100%] h-[100%] relative z-[5] mr-[-50%]" style={{ transform: 'rotate(90deg)' }} />

          {/* gradient start */}
          <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
          <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
          <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
          {/* gradient end */}
        </div>
      </section>
  );
};

export default MainSection;