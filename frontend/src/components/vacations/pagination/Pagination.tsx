import { useEffect, useState } from "react";
import "./Pagination.css";
// import Pagination from "../../../models/Pagination";

interface PaginationProps {
    // pagination: Pagination;
    totalVacations: number;
    limit: number; // number of vacations per page (the demand in the project = 10).
    paginate: Function;
}

function Pagination(props: PaginationProps): JSX.Element {

    const pageNumbers = [];
    const totalPages = Math.ceil(props.totalVacations / props.limit); 
    // for example: if there is 12 vacations, and we want just 10 vacations per page --> 1.2 --> ceil to 2 pages.
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

    return (
        <div className="Pagination">
            <nav aria-label="...">
                <ul className="pagination pagination-sm">
                    {pageNumbers.map(page => (
                        <li className="page-item" aria-current="page" key={page}>
                                <button className="page-link" key={page} onClick={() => props.paginate(page)}>{page}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;