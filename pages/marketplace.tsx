"use client";

import React, {useState} from 'react';
import { useRequest } from '@/lib/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';
import { type DateRange } from 'react-day-picker';


const marketplace = () => {
    const { getAllRequestsData, data } = useRequest();
    console.log("data", data)

    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(1719775001000),
        to: new Date(4875323911000),
    });

    const { data: requests, refetch } = useQuery({
        queryKey: ['requests', date],
        queryFn: async () => {
            const from = date?.from?.getTime()
                ? Math.round(date.from.getTime() / 1000)
                : undefined;
            const to = date?.to?.getTime()
                ? Math.round(date.to.getTime() / 1000)
                : undefined;

            return await getAllRequestsData(from, to);
        },
        initialData: [],
        enabled: Boolean(data),
    });

    console.log("requests", requests , "dates", date)

    return (
        <div>marketplace</div>
    )
}

export default marketplace