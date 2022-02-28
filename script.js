

const searchProduct = () => {
    const input_field = document.getElementById('input-field');
    const input_value = input_field.value;
    input_field.value = '';
    if (input_value.length > 0 && input_value.includes('  ') === false && input_value !== ' ') {
        const url = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${input_value}`
        // console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => getSearchProduct(data.drinks))
    }
    else {
        document.getElementById('parent').innerHTML = `
        <p class="mx-auto fs-1 w-50 text-danger">
        Please search by product Name</p>
        `
    }
    
}

const getSearchProduct = data => {
    if (data !== null)
    {
        const parent = document.getElementById('parent');
        parent.innerHTML = '';
        document.getElementById('details').innerHTML = '';
        data.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick = "showDetails(${item.idDrink})" class="card h-100">
                <img src="${item.strDrinkThumb}" class="card-img-top" alt="Alcohol">
                <div class="card-body">
                    <h5 class="card-title">${item.strDrink}</h5>
                    <p class="card-text">${item.strInstructions.slice(0,50)}....</p>
                </div>
            </div>
        `;
            parent.appendChild(div);
        });
    }
    else {
        document.getElementById('parent').innerHTML = `
        <p class="mx-auto fs-1 w-50 text-danger">
        This product is not available now</p>
        `
    }
}

const showDetails = data => {
    const details = document.getElementById('details');
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${data}`;
    fetch(url)
        .then(res => res.json())
        .then(data => createDetails(data.drinks[0]))
}

const createDetails = data => {
    const details = document.getElementById('details');
    details.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = 
        `
            <div class="card h-100 w-50 mx-auto">
                <img height="400px" src="${data.strDrinkThumb}" class="card-img-top" alt="Alcohol">
                <div class="card-body">
                    <h5 class="card-title">${data.strDrink}</h5>
                    </br>
                    <p class="card-text">Date: ${data.dateModified}</p>
                    <p class="card-text">Category: ${data.strCategory}</p>
                    <p class="card-text">Ingredient: ${data.strIngredient1}, ${data.strIngredient2}, ${data.strIngredient3}, ${data.strIngredient4}, ${data.strIngredient5}</p>
                    <p class="card-text">Instructions: ${data.strInstructions}</p>
                </div>
            </div>
        `;
    details.appendChild(div);
}