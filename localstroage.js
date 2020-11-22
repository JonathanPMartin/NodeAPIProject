import LocalStorage from 'node-localstorage'
localStorage= new LocalStorage('./scratch')
localStorage.setItem('data',[])
console.log(localStorage.getItem('data'))