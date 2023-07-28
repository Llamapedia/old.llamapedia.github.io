function init() {
    generatePhrase();
    try {
        home();
    } catch (error) {
        compensation_404();
    }
}

function home() {
    fetch('https://nhentai-api.onrender.com/https://fuxnxx.com/')
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

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        console.log(doc);

        //Gets the recommendation
        const recommendation_list = doc.getElementsByClassName('thumb');
        for (let recommendation of recommendation_list) {
            makeVideoThumb(recommendation);
        }
    });
}

function generatePhrase() {
    let phrase = '';
    let val = Math.floor(Math.random() * 100);
    console.log(val)
    switch (true) {
        case (val < 50):
            phrase = 'Some good fucking porn for free.';
            break;
        case (val === 50):
            phrase = 'Your coins seem to land on the edges.';
            break;
        case (val === 69):
            phrase = 'Urbosa is fucking hot!!';
            document.querySelector('h3').setAttribute('onclick', 'goto("/watch.html?id=urbosa")');
            break;
        case (val > 80):
            phrase = 'milfs fotw';
            break;
        case (val > 60):
            phrase = "streching assholes.";
            break;
        case (val > 50):
            phrase = "good shit on here";
            break;
        default:
            phrase = 'Ummm... you good?';
            break;
    }
    document.querySelector('h3').innerHTML = phrase;
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