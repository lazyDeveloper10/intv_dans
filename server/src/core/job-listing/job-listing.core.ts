import { http } from '../../environment/environment';

import { paginator } from '../../helper/paginator';

export const jobListingFindAllCore = async (paginate: any) => {
    // ?? where is total data ??
    let query = `/positions.json?page=${paginate.page}&limit=${paginate.limit}`;

    if (paginate.description) {
        query += `&description=${paginate.description}`;
    }

    // what if not berlin??
    if (paginate.location) {
        query += `&location=${paginate.location}`;
    }

    const { data } = await http.get(query);

    return data;
};

export const jobListingFindByIdCore = async (id: string) => {
    const { data } = await http.get(`/positions/${id}`);

    return data;
};
