import React from "react";
import "./style.css";

const Pagination = ({ total, perpage, currentPage, setCurrentPage }) => {
    const pages = [];

    for (let i = 1; i <= Math.ceil(total / perpage); i++) {
        pages.push(i);
    }

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const pageRange = 4;
    const startIndex = Math.max(currentPage - Math.floor(pageRange / 2), 1);
    const endIndex = Math.min(startIndex + pageRange - 1, pages.length);

    return (
        <div className="pageContainer">
            <button
                onClick={() => handlePrevClick()}
                className={currentPage > 1 ? "button" : "disablebutton"}
            >
                Prev
            </button>
            {pages.slice(startIndex - 1, endIndex).map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "pageactive" : "button"}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => handleNextClick()}
                className={currentPage < pages.length ? "button" : "disablebutton"}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
