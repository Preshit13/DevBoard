import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

function Pagination({ page, total, limit, onPageChange }) {
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  if (total === 0) return null;

  return (
    <div className="pagination">
      <div className="pagination-controls">
        <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
          ← Previous
        </button>
        <span className="pagination-info">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next →
        </button>
      </div>
      <p className="pagination-summary">
        Showing {start}–{end} of {total} records
      </p>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  total: PropTypes.number,
  limit: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagination;
