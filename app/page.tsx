import Pagination from "./global_components/Pagination";

const page = ({
   searchParams: { page },
}: {
   searchParams: { page: string };
}) => {
   return (
      <Pagination currentPage={parseInt(page)} itemCount={100} pageSize={10} />
   );
};

export default page;
