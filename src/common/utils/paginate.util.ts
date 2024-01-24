export const GetPaginate = (query: any) => {
  const paginateOptions = {
    ...(query.offset && { offset: +query.offset }),
    ...(query.sort && {
      sort:
        query.sort === 'oldest'
          ? { createdAt: 1 }
          : query.sort === 'newest'
            ? { createdAt: -1 }
            : query.sort === 'asc'
              ? { reward: 1 }
              : query.sort === 'desc'
                ? { reward: -1 }
                : query.sort === 'high' && { 'balance.amount': -1 },
    }),
    page: query.page ? +query.page : +process.env.DEFAULT_PAGE,
    limit: query.limit ? +query.limit : +process.env.DEFAULT_LIMIT,
  };

  return paginateOptions;
};
