window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const onLink = 'https://api.jsonbin.io/b/5df3c10a2c714135cda0bf0f/1';
  const formItemOne = document.querySelector('form');
  const formItemTwo = document.querySelector('.form__item--two');
  const formItemThree = document.querySelector('.form__item--three')

  // const request = url => new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();
  //
  //   xhr.responseType = 'json';
  //
  //   xhr.addEventListener('load', function () {
  //     if (xhr.status === 200) {
  //       resolve(xhr.response);
  //     } else {
  //       reject('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
  //     }
  //   });
  // });

  const load = (url, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      document.body.classList.add('loaded_hiding');
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    window.setTimeout(() => {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 1000);

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();
  };

  const onError = (message) => {
    console.error(message);
  };

  const onSuccess = (data) => {
    const createProductListTemplate = (el) =>
      el
      .map(item =>
        `<li class="product__list">
        <div class="product__first">
          <h3>${item.name}</h3>
          <div>
            <span>${item.cpu.count}</span> x ${item.cpu.name}
            <span>${item.cpu.count * item.cpu.cores < 5 ? item.cpu.count * item.cpu.cores + ' ядра' : item.cpu.count * item.cpu.cores + ' ядер'}</span>
          </div>
        </div>
        <div class="product__second">
          <span>${item.ram}</span>
          <div class="product__ram">
            <span>${item.disk.value + ' ГБ'}</span>
            <span>${item.disk.type}</span>
          </div>
          <span>${item.gpu ? item.gpu : ''}</span>
        </div>
        <div class="product__right">
          <h3>${Math.floor(item.price)} ₽/месяц</h3>
          <button class="product__button button">Заказать</button>
        </div>
      </li>`
      ).join(``);
    console.log(data.map(it => it.disk))

    const renderItem = (data2) => {
      const product = document.querySelector('.product');
      product.innerHTML = createProductListTemplate(data2);
    };
    renderItem(data);

    const addOnClick = () => {
      formItemOne.addEventListener('click', (e) => {
        const {target} = e;
        const {filtered} = target.dataset;
        let filterData = Array;
        switch (filtered) {
          case 'gpu':
            filterData = data.filter((item) => item.gpu);
            break;
          case 'disk':
            filterData = data.filter((item) => item.disk.count > 1);
            break
        }
        console.log(filterData);
        renderItem(filterData);
      });
    };
    addOnClick()
  };

  load(onLink, onSuccess, onError);
});

const arr = [5, 9, 4, 45, 14, 16, 35, 69];
const sortFunc = (a, b) => a - b;

arr.sort(sortFunc);
console.log(arr);
