/* eslint-disable @typescript-eslint/no-unsafe-member-access -- snaps api not yet supported */

/* eslint-disable @typescript-eslint/no-unsafe-call -- snaps api not yet supported  */
import type {
    GetSnapsResponse,
    InvokeSnapParams,
    RequestSnapsParams,
    RequestSnapsResponse,
} from '@/lib/types/snap';


export const useSnaps = () => {
    const getSnaps = async () => {
        //@ts-ignore
        const snaps = (await window.ethereum?.request({
            method: 'wallet_getSnaps',
            params: [],
        })) as GetSnapsResponse;

        return snaps;
    };

    const requestSnaps = async (params: RequestSnapsParams) => {
        //@ts-ignore
        const snaps = (await window.ethereum?.request({
            method: 'wallet_requestSnaps',
            params,
        })) as RequestSnapsResponse;

        return snaps;
    };


    const invokeSnap = async (params: InvokeSnapParams) => {
        //@ts-ignore
        const result = (await window.ethereum?.request({
            method: 'wallet_invokeSnap',
            params,
        })) as object;

        return result;
    };

    return { getSnaps, requestSnaps, invokeSnap };
};
