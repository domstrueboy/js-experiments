const imageUrls = [
  'https://lh3.googleusercontent.com/proxy/Erda6NB2uKsIQxe63LAxd1atJ4KpiOL55F0M0miqB5XOQL6hS4SGJdSoc9xMvfsdGvDz8CE5-Atf49Fdvfb1QE1eXF1SieK4j2An6ZK6v-YOLWv3oMei2MblkoHuFyIv',
  'https://avatars.mds.yandex.net/get-pdb/1926950/74d61eac-f630-4990-9cae-207301c4ea67/s600',
  'https://avatars.mds.yandex.net/get-pdb/234183/a754609d-5960-496c-8283-6a90516180d8/s375',
  'https://www.ejin.ru/wp-content/uploads/2017/09/16-339.jpg',
  'https://wonder-day.com/wp-content/uploads/2020/05/wonder-day-images-brawl-stars-120.jpg',
];

const images = document.querySelector('.images');
const pickers = document.querySelector('.pickers');

let imageNo = 0;

setImage(imageNo);

pickers.addEventListener('click', (event) => {
  if(!event.target.classList.contains('picker')) return;
  imageNo = parseInt(event.target.classList[1].replace('picker', ''));
  setImage(imageNo);
});

imageUrls.map((url, i) => {
  const item = document.createElement('li');
  item.className = `picker picker${i}`;
  pickers.append(item);
});

function setImage(num) {
  images.innerHTML = `<li class="image-container"><img src="${imageUrls[num]}" class="image"></li>`;
}
