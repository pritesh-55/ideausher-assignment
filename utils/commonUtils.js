const customPaginator = (page, limit, total) => {
  const pageCount = Math.ceil(total / limit);
  return {
    totalDocs: total,
    limit,
    totalPages: pageCount,
    page,
    pagingCounter: (page - 1) * limit + 1,
    hasPrevPage: page > 1,
    hasNextPage: page < pageCount,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < pageCount ? page + 1 : null,
  };
};

module.exports = {
    customPaginator,
};