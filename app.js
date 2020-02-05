const products = document.querySelector('#products');
const companies = document.querySelector('.companies');

const productsPromise = axios.get('https://acme-users-api-rev.herokuapp.com/api/products')
const companiesPromise = axios.get('https://acme-users-api-rev.herokuapp.com/api/companies')

Promise.all([productsPromise, companiesPromise])
    .then(responses => {
        renderProducts(responses[0].data);
        renderCompanies(responses[1].data);
    })



const renderProducts = (products) => {
    let html = products.map(product => {
        return `
        <th>${product.id}</th>
        <th>${product.name}</th>
        <th>${product.description}</th>
        <th>${product.suggestedPrice}</th>
        <th>${product.createdAt}</th>
        <th>${product.updatedAt}</th>
        `
    }).join('')
    products.innerHTML = html;
    console.log(html);
}

const renderCompanies = (company) => {

}