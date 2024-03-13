import Footer from "./_components/footer";
import Heading from "./_components/heading";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1F1F1F] overflow-y-auto">
      <div className="flex items-center mx-auto text-center justify-between gap-y-8 flex-1 pb-10">
        <Heading />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
