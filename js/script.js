window.onload = function() {
    const CLIENT_ID = 'K6HLHwT0DgSPJpHiuvkrh5pJG7yrcGV7KKHafIpOc-s';

    const images = document.getElementById('images');
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');
    const actions = document.getElementById('actions');

    let page = 1;
    let totalPage = null;   

    function fetchImages() {
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchInput.value}&client_id=${CLIENT_ID}`;
        images.innerHTML = '';
    
        fetch(url).then(response => response.json()).then((data) => {
            data.results.forEach(item => {
                const itemElem = document.createElement('div');
                itemElem.className = 'images-item';

                itemElem.onclick = function() {
                    window.open(item.links.html, '_blank');
                }

                const img = document.createElement('img');
                img.className = 'images-item-image';
                img.setAttribute('src', item.urls.raw);
                img.setAttribute('alt', item.alt_description);

                const imgTitle = document.createElement('div');
                imgTitle.className = 'images-item-title';
                imgTitle.innerText = item.description ? (item.description.length > 60 ? item.description.slice(0, 60) + '...' : item.description) : '';

                const imgAuthor = document.createElement('div');
                imgAuthor.className = 'images-item-author';
                imgAuthor.innerText = item.user.name;

                itemElem.appendChild(img);
                itemElem.appendChild(imgTitle);
                itemElem.appendChild(imgAuthor);
    
                images.appendChild(itemElem);
            });

            console.log(data);

            totalPage = data.total_pages;
            actions.children[1].innerText = `Страница ${page}`;
            actions.classList.add('active');
        });
    }

    searchBtn.onclick = function() {
        if(searchInput.value.length > 0) {
            searchInput.nextElementSibling.classList.remove('active');
            page = 1;
            fetchImages();
        } else {
            searchInput.nextElementSibling.classList.add('active');
        }
    };

    // prev btn
    actions.children[0].onclick = function() {
        if(page > 1) {
            page--;
            fetchImages();
        }
    }

    // next btn
    actions.children[2].onclick = function() {
        if(page < totalPage) {
            page++;
            fetchImages();
        }
    }
}
