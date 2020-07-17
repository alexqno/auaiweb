import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Pagination as LayoutPagination,
  PaginationItem,
  PaginationLink,
} from '~/components';

export default function Pagination(props) {
  const { activePage, pageCount, onPageChange } = props;

  function handlePageClick(page) {
    if (page !== activePage) {
      onPageChange(page);
    }
  }

  return (
    <LayoutPagination className="ml-auto px-4">
      <PaginationItem disabled={activePage === 1}>
        <PaginationLink
          previous
          href="#"
          onClick={e => {
            e.preventDefault();
            handlePageClick(1);
          }}
        >
          <i className="fa fa-angle-double-left" />
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={activePage === 1}>
        <PaginationLink
          previous
          href="#"
          onClick={e => {
            e.preventDefault();
            handlePageClick(activePage - 1);
          }}
        >
          <i className="fa fa-angle-left" />
        </PaginationLink>
      </PaginationItem>
      {_.times(
        pageCount,
        idx =>
          idx + 1 >= activePage - 3 &&
          idx + 1 <= activePage + 3 && (
            <PaginationItem key={idx} active={idx + 1 === activePage}>
              <PaginationLink
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handlePageClick(idx + 1);
                }}
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          )
      )}
      <PaginationItem disabled={activePage === pageCount}>
        <PaginationLink
          next
          href="#"
          onClick={e => {
            e.preventDefault();
            handlePageClick(activePage + 1);
          }}
        >
          <i className="fa fa-angle-right" />
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={activePage === pageCount}>
        <PaginationLink
          next
          href="#"
          onClick={e => {
            e.preventDefault();
            handlePageClick(pageCount);
          }}
        >
          <i className="fa fa-angle-double-right" />
        </PaginationLink>
      </PaginationItem>
    </LayoutPagination>
  );
}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
