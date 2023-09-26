import React from "react";
import "./style.css";

const Pagination = ({ total, perpage, currentPage, setCurrentPage }) => {
    console.log(currentPage)
    const pages = [];
    console.log("From pagination")
    for (let i = 1; i <= Math.ceil(total / perpage); i++) {
        pages.push(i);
    }

    const handlePrevClick = () => {
        if (currentPage > 1) {
            console.log("Called prev")
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="pageContainer">
            <button onClick={() => handlePrevClick()} className={currentPage - 1 ? "button" : "disablebutton"}>Prev</button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "pageactive" : "button"}
                >
                    {page}
                    {console.log(typeof page)}

                </button>
            ))}
            <button onClick={() => handleNextClick()} className={currentPage === pages.length ? "disablebutton" : "button"}>Next</button>
        </div >
    );
};

export default Pagination;
