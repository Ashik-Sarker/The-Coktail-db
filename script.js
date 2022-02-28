

const searchProduct = () => {
    const input_field = document.getElementById('input-field');
    const input_value = input_field.value;
    const url = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${input_value}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => getSearchProduct(data.drinks))
}

const getSearchProduct = data => {
    // console.log(data);
    const parent = document.getElementById('parent');
    data.forEach(item => {
        console.log(item);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${item.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.strDrink}</h5>
                    <p class="card-text">${item.strInstructions}</p>
                </div>
            </div>
        `;
        parent.appendChild(div);
    });
}