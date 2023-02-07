export const paginator = (items: any, pageNumber: number, limit: number) => {
    let page = pageNumber || 1;
    let per_page = limit || 10;
    let offset = (page - 1) * per_page;

    let paginatedItems = items.slice(offset).slice(0, per_page);
    let total_pages = Math.ceil(items.length / per_page);

    return {
        page: page,
        limit: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}
