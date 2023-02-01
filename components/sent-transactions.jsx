import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Transaction from "./transaction";



export default function PaidTo({ data }) {

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    if(data) {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(prev => data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex flex-col gap-8 p-5">
        {currentItems.map((item, id) => (
          <Transaction
            key={id}
            address={item.to}
            amount={item.value.toString().substring(0, 6) + item.asset}
          />
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next  >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
}
