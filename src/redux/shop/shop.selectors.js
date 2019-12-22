import {
    createSelector
} from 'reselect'


const shopCollections = state => state.shop

export const selectShopCollections = createSelector(
    [shopCollections],
    shop => shop.collections
)

//converts shop collections object into an array of keys and map
export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => Object.keys(collections).map(key => collections[key])
)
export const selectCollection = collectionUrlParam =>
    createSelector(
        [selectShopCollections],
        //finds the collection with matching type
        collections => collections[collectionUrlParam]

    )