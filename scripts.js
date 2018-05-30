import reddit from './reddit.js';
const searchForm = document.getElementById('search-form');
const serachInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e =>{
    const searchTerm = serachInput.value;
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    const searchLimit = document.getElementById('limit').value;



    if(searchTerm === ''){
        showMessage('Pole nie może być puste!', 'alert-danger');
    }

    serachInput.value = '';

    reddit.search(searchTerm, sortBy, searchLimit)
        .then(resoult => {
            let output = '<div class="card-columns">';
            console.log(resoult)
            resoult.forEach(post => {

                let image = post.preview ? post.preview.images[0].source.url : 
                'https://static.makeuseof.com/wp-content/uploads/2013/05/reddit-alien.jpg';

                output += `
                <div class="card">
                    <img class="card-img-top" src="${image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${shortTitle(post.title)}</h5>
                        <p class="card-text">${shortText(post.selftext, 100) }</p>
                        <a href="${post.url}" target="_blank" class="btn btn-primary">Czytaj...</a>
                    </div>
                </div>
                `
            });

            output += "</div>";
            document.getElementById('results').innerHTML = output;
            console.log(output)
        });

    e.preventDefault();

    
});

function showMessage(message, className){

    const div = document.createElement('div');

    div.className = "alert " + className;

    div.innerText = message;

    const searchContainer = document.getElementById('search-container');

    const search = document.getElementById('search')

    searchContainer.insertBefore(div, search);

    setTimeout(()=> document.querySelector('.alert').remove(), 4000)
}

function shortText(text, limit){
    const short = text.indexOf(' ', limit);
    if(short == -1){ return text};
    return text.substring(0, short);
}

function shortTitle(text){
    return text.slice(0,20)+'...';
}


