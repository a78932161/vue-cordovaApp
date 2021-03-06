(function (win, doc) {
  let window = win;
  let document = doc;
  let docEl = document.documentElement;
  let metaEl = document.createElement('meta');
  let dpr = window.devicePixelRatio;

  const agent = navigator.userAgent;
  if(agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1){
    dpr=1;
  }

  dpr = (dpr == 2 || dpr == 3) ? dpr : 1;
  metaEl.setAttribute('name', 'viewport');
  metaEl.setAttribute('content', `width=device-width,initial-scale=${1 / dpr},maximum-scale=${1 / dpr},
   minimum-scale=${1 / dpr}, user-scalable=no`);
  docEl.firstElementChild.appendChild(metaEl);
  docEl.style.fontSize = `${docEl.clientWidth / 10}px`;
  window.addEventListener('resize',function(){
     docEl.style.fontSize = `${docEl.clientWidth / 10}px`;
  });
  docEl.setAttribute('data-dpr', dpr);
})(window, document);


