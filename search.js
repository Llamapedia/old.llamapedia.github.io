function init() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.get('q') === null || urlParams.get('q') === '') {
        document.querySelector('h3').innerHTML = 'Type above to search.'
        return;
    }
    try {
        search(urlParams.get('q'));
    } catch (error) {
        compensation_404();
    }
}

function search(query) {
    query = validateQuery(query);
    fetch('https://nhentai-api.onrender.com/https://fuxnxx.com/search/' + query + '.html')
    .then(response => {
        if (!response.ok) {
            compensation_404();
            return undefined;
        }
        return response.text();
    })
    .then(html => {
        if (html === undefined) {
            return undefined;
        }

        document.querySelector('h3').innerHTML += query + ':';

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        console.log(doc);

        if (doc.querySelector("body > div.thumbnail > div.toptitle > h1").innerHTML.includes("Can't Found")) {
            document.querySelector('h3').innerHTML = "Couldn't find videos for: " + query + '.<br>Default selection shown below.';
        }

        //Gets the recommendation
        const recommendation_list = doc.getElementsByClassName('thumb');
        for (let recommendation of recommendation_list) {
            makeVideoThumb(recommendation);
        }
    });
}

function setCharAt(str, index, chr) {
    if (index > str.length-1) return str;
    return str.substring(0, index) + chr + str.substring(index+1);
}

function validateQuery(query) {
    for (var i = 0; i < query.length; i++) {
        if (query.charAt(i) === ' ') {
            query = setCharAt(query, i, '-');
        } else if (query.charAt(i).search(/^[a-zA-Z0-9]+$/) === -1) {
            query = setCharAt(query, i, '');
            i--;
        }
    }
    console.log(query);
    return query;
}

function makeVideoThumb(rec_element) {
    console.log(rec_element);

    const div = document.createElement('div');
    div.className = 'recommended-video';
    let url = rec_element.getElementsByTagName('a')[0].href;
    url = '/watch.html?id=' + btoa(url.split('/')[4]);
    //url = 'https://fuxnxx.com/' + url.split('/')[3] + '/' + url.split('/')[4];
    div.setAttribute('onclick', 'goto("' + url + '")');

    const img = document.createElement('img');
    let og_thumb = rec_element.querySelector('a > div.positioncnt > img');
    img.src = og_thumb.getAttribute('data-src');
    img.alt = og_thumb.alt;
    div.append(img);
    
    const h3 = document.createElement('h3');
    let og_title = rec_element.querySelector('a > div.titlethumb');
    h3.innerHTML = og_title.innerHTML;
    div.append(h3);
    
    document.getElementById('recommendation-list').append(div);
}

function compensation_404() {
    document.body.innerHTML = "";
    document.body.style.background = '#8f646c';

    const img = document.createElement("img");
    img.id = 'waifu';
    img.className = 'urbosa';
    img.src = code_404;
    document.body.appendChild(img);

    const back = document.createElement("a");
    back.href = '/';
    back.className = 'return-home';
    back.innerHTML = atob('VGFrZSB5b3VyIGNvbXBlbnNhdGlvbiBhbmQgcmV0dXJuIHRvIHRoZSBob21lcGFnZS4=');
    document.body.appendChild(back);
}

function goto(url) {
    window.location = url;
}