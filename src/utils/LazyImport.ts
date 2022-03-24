import {lazy} from 'react';

const MINIMUM_DELAY : number = 1000; // ms
interface ImportReturnType {
    default: React.ComponentType<any>
}
/**
 * This function just simplifies the usage of React.lazy and adds an "additional" delay
 * 
 * Example: LazyImport(() => import('test.ts'))
 */
function LazyImport(funcImport: () => Promise<ImportReturnType>) {
    return lazy(async () => {
        await new Promise(resolve => setTimeout(resolve, MINIMUM_DELAY));
        return funcImport();
    });
}

export default LazyImport;