import Footer from "./_components/footer";
import Heading from "./_components/heading";
import { Heroes } from "./_components/heroes";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1F1F1F] overflow-y-auto">
      <div className="flex items-center mx-auto lg:text-start text-center justify-between gap-y-8 flex-1 lg:px-60 md:px-30 sm:px-15 pb-10">
        <Heading />
        <Heroes/>
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
