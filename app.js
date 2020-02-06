const resultsTable = document.querySelector('#results');

const nav=document.querySelector('.nav-tabs');
//console.log(nav);


const productsPromise   = axios.get('https://acme-users-api-rev.herokuapp.com/api/products')
const companiesPromise  = axios.get('https://acme-users-api-rev.herokuapp.com/api/companies')

const dataPromise = Promise.all([productsPromise, companiesPromise])
    .then(responses => {
        return responses.map(response=>response.data);
        });

dataPromise.then (results => {
    renderNavigation(results);
});
    
const renderNavigation = (results=>{
    
    const [products,companies]=results;
    const tabs=`
        <li class="nav-item">
            <a class="nav-link active" href="#products" id="product">Products (${products.length})
            </a> 
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#companies" id="company">Companies (${companies.length})
            </a>
        </li>`
    nav.innerHTML=tabs;
    renderProducts(products);
    //renderCompanies(companies);
});       
    
    

window.addEventListener('hashchange',()=>{
    id=window.location.hash.slice(1);
    console.log(id);
    console.log(nav);
   
    dataPromise.then(results=>{
        const [products,companies]=results;
        
    //console.log(document.querySelectorAll('.nav-link').);
    const navLinks=[...document.querySelectorAll('.nav-link')];
    console.log(navLinks);
   
     if(id==='products'){
        navLinks[0].classList.add('active');
        navLinks[1].classList.remove('active');
        renderProducts(products);
    }
    else if(id==='companies'){
        navLinks[0].classList.remove('active');
        navLinks[1].classList.add('active');
        renderCompanies(companies);
    } 
    });    
});

const renderProducts = (products) => {
    
    const productsHeading=Object.keys(products[0]);
    const htmlHeading=productsHeading.map(cols=>{
        return `        
                <th>${cols.toUpperCase()}</th>
                `
    }).join('');

    const html = products.map(product => {
        return `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.suggestedPrice}</td>
            <td>${product.createdAt}</td>
            <td>${product.updatedAt}</td>
        </tr>
        `
    }).join('')
    resultsTable.innerHTML = htmlHeading.concat(html);
    
}
const renderCompanies = (companies) => {
    const companiesHeading=Object.keys(companies[0]);
    const htmlHeading=companiesHeading.map(cols=>{
        return `        
                <th>${cols.toUpperCase()}</th>
                `
    }).join('');

    const html = companies.map(company => {
        return `
        <tr>
            <td>${company.id}</td>
            <td>${company.name}</td>
            <td>${company.phone}</td>
            <td>${company.state}</td>
            <td>${company.catchPhrase}</td>
            <td>${company.createdAt}</td>
            <td>${company.updatedAt}</td>
        </tr>
        `
    }).join('')
    resultsTable.innerHTML = htmlHeading.concat(html);
}