import { useEffect, useState } from "react";
import "./Pagination.css";

interface PaginationProps {
    totalVacations: number;
    limit: number; // number of vacations per page.
    paginate: Function;
}

function Pagination(props: PaginationProps): JSX.Element {

    const pageNumbers = [];
    const totalPages = Math.ceil(props.totalVacations / props.limit); 
    
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