import catalogue from './catalogue.js';

const products = catalogue["products"]; 

const uniqueItems = (x, i, array) => array.indexOf(x) === i;
const PRODUCT_CATEGORIES = products.map(product => product.category).filter(uniqueItems);
const GENDER_CATEGORIES = products.map(product => product.gender).filter(uniqueItems);
const BRAND_CATEGORIES = products.map(product => product.brand).filter(uniqueItems);

let prod_options = []
for (let i = 0; i < PRODUCT_CATEGORIES.length; i++) {
    let pair = {name: PRODUCT_CATEGORIES[i], id: i, type:"prod"};
    prod_options.push(pair);
}

let brand_options = []
for (let i = 0; i < BRAND_CATEGORIES.length; i++) {
    let pair = {name: BRAND_CATEGORIES[i], id: i, type:"brand"};
    brand_options.push(pair);
}

let gender_options = []
for (let i = 0; i < GENDER_CATEGORIES.length; i++) {
    let pair = {name: GENDER_CATEGORIES[i], id: i, type:"gender"};
    gender_options.push(pair);
}

const categories = {
    'Products': prod_options,
    'Gender': gender_options,
    'Brands': brand_options
};
export default categories;
