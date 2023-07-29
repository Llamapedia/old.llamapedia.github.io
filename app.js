//GLOBAL VARIABLES
var timerID;
var recommendation_count = 0;

function init() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    videoAmbiance();

    if (urlParams.get('id') === 'urbosa') {
        watchUrbosa();
        return;
    }

    console.log(btoa('teamskeet-blake-blossom-teamskeet-allstars-fuck-cabin-in-the-woods-24074'));

    if (urlParams.get('id') === null || urlParams.get('id') === '') {
        compensation_404();
        return;
    }
    try {
        initWebsite(atob(urlParams.get('id')));
    } catch (error) {
        compensation_404();
    }
}

function videoAmbiance() {
    canvas = document.getElementById('playback-canvas');
    ctx = canvas.getContext('2d');

    var video = document.getElementById('main-video');

    video.addEventListener('play', function () {
        //video.currentTime = 0;
        timerID = window.setInterval(function () {
            ctx.drawImage(video, 0, 0, 600, 460)
        }, 30);
    });

    video.addEventListener('pause', function () {
        //stopTimer();
    });

    video.addEventListener('ended', function () {
        //stopTimer();
    });
}

function initWebsite(id) {
    fetch('https://nhentai-api.onrender.com/https://fuxnxx.com/xxx/' + id + '.html')
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

            //Gets the video title
            const video_title = doc.querySelector("body > div.thumbnail > div.toptitle > h1");
            document.getElementById('video-title').innerHTML = video_title.innerHTML;

            if (video_title.innerHTML === 'Error404 Try Other Videos') {
                compensation_404();
                return undefined;
            }

            //Gets the tags
            const tags_element = doc.getElementsByClassName('tagsstyle');
            console.log(tags_element)
            for (let tag of tags_element) {
                let tag_el = document.createElement('li');
                tag_el.className = 'tags';
                tag_el.innerHTML = tag.firstChild.innerHTML;
                tag_el.setAttribute('onclick', 'goto("/tags.html?tag=' + tag.firstChild.href.split('/')[4].split('.')[0] + '")');
                document.querySelector("#tag-list").append(tag_el);
            }

            //Gets the recommendation
            const recommendation_list = doc.getElementsByClassName('thumb');
            for (let recommendation of recommendation_list) {
                makeVideoThumb(recommendation);
            }

            //Gets the video itself
            const og_video = doc.querySelector("body > div.thumbnail > div.player > div > iframe");
            var video_source = og_video.src;
            video_source = 'https://fuxnxx.com/' + String(video_source).split('/')[3];
            console.log(video_source);
            makeSystemPlayer(video_source);

        });
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

    const blur = img.cloneNode();
    blur.alt = '';
    blur.className = 'blur-thumb';
    div.append(blur)

    const h3 = document.createElement('h3');
    let og_title = rec_element.querySelector('a > div.titlethumb');
    h3.innerHTML = og_title.innerHTML;
    div.append(h3);

    document.getElementById('recommendation-list').append(div);
}

function makeSystemPlayer(embed_url) {
    fetch('https://nhentai-api.onrender.com/' + embed_url)
        .then(response => {
            if (!response.ok) {
                return undefined;
            }
            return response.text();
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const original_video = doc.querySelector("#my-video");
            console.log(original_video);
            const dest_video = document.querySelector('#main-video');
            dest_video.setAttribute('poster', original_video.getAttribute('poster'));
            var list = original_video.getElementsByTagName('source');
            let src_tag = document.createElement('source');
            src_tag.src = list[2].src;
            dest_video.append(src_tag);
            //for(let item of list) {
            //    let src_tag = document.createElement('source');
            //    src_tag.src = item.src;
            //    dest_video.append(src_tag);
            //}
        });
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

function watchUrbosa() {
    const dest_video = document.querySelector('#main-video');
    dest_video.setAttribute('poster', '');
    let src_tag = document.createElement('source');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has('pose')) {
        var val = parseInt(urlParams.get('pose'));
    } else {
        var val = Math.floor(Math.random() * 4);
    }

    if (val > 4 || val < 0) {
        val = Math.floor(Math.random() * 4);
    }

    console.log(val);

    if (val === 0) {
        src_tag.src = 'https://drive.google.com/u/0/uc?id=1CSfEsTG7Yq9npc0PuGZSQOPeBbGaE6BF';
        document.getElementById('video-title').innerHTML = 'Urbosa sucking dick';
    } else if (val === 1) {
        src_tag.src = 'https://drive.google.com/u/0/uc?id=1Lajzeg02NMCHq6P_TYqrNi1Y3csNk_cd';
        document.getElementById('video-title').innerHTML = 'Urbosa taking it from behind';
    } else if (val === 2) {
        src_tag.src = 'https://drive.google.com/u/0/uc?id=1gkbK8vU3-rm-wgXV4VDTaDA8kddxPNsU';
        document.getElementById('video-title').innerHTML = 'Urbosa carefully stroking and sucking';
    } else if (val === 3) {
        src_tag.src = 'https://drive.google.com/u/0/uc?id=12U1xOcb8Umebg5uEp7umPUsjxiUf0pfb';
        document.getElementById('video-title').innerHTML = 'Urbosa undressed missionary';
    } else if (val === 4) {
        src_tag.src = 'https://drive.google.com/u/0/uc?id=1pwXWpCVXuPj5kxqD8fz6giDBJEfJSm8y';
        document.getElementById('video-title').innerHTML = 'Urbosa sucks it sideways';
    }
    dest_video.append(src_tag);
    document.querySelector('div.tag-container').remove();
    document.querySelector('div.recommended-videos').remove();
}

function goto(url) {
    window.location = url;
}