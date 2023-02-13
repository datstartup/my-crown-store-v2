import { createContext, useEffect, useState } from 'react';

import SHOP_DATA from '../../shop-data';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    var [categoriesMap, setCategoriesMap] = useState({});

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocuments('categories');
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        };
        getCategoryMap();
    }, []);

    const value = { categoriesMap };

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
