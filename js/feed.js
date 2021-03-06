const getData=()=>{
  const data = localStorage.getItem('usuario')
  const dataObj = JSON.parse(data)
  const navPerfil = document.getElementById('nav-perfil')
  navPerfil.innerHTML=`${dataObj.nombre}`
  const usuarioPerfil = document.getElementById('nombre-perfil')
  usuarioPerfil.innerHTML=`${dataObj.nombre}`
  const emailPerfil = document.getElementById('email-perfil')
  emailPerfil.innerHTML=`${dataObj.email}`
}
getData()

const openMenu=()=>{
  const menu = document.getElementById('menu')
  const contenedor = document.getElementById('contenedor')

  contenedor.classList.add('hover')
  menu.classList.remove('d-lg-none')
  menu.classList.add('d-lg-flex')
}

const closeMenu=()=>{
  const menu = document.getElementById('menu')
  const contenedor = document.getElementById('contenedor')

  contenedor.classList.remove('hover')
  menu.classList.add('d-lg-none')
  menu.classList.remove('d-lg-flex')
}

const mostrarInputPosteo = ()=>{
  const inputPublicaion=document.getElementById('input-publicacion')
  const inputPublicaionImg=document.getElementById('input-publicacion-img')
  inputPublicaion.classList.remove('d-none')
  inputPublicaionImg.classList.add('d-none')
  inputPublicaionImg.classList.remove('d-lg-flex')

}

const mostrarInputImg = ()=>{
  const inputPublicaion=document.getElementById('input-publicacion')
  const inputPublicaionImg=document.getElementById('input-publicacion-img')
  inputPublicaion.classList.add('d-none')
  inputPublicaionImg.classList.remove('d-none')
  inputPublicaionImg.classList.add('d-lg-flex')
}

const previsualizacion =()=>{
  const inputPublicaion=document.getElementById('img-publicacion')
  const previsualizacionImg=document.getElementById('img-previsualizacion')
  previsualizacionImg.classList.remove('d-none')
  const archivos = inputPublicaion.files
  const muetra = archivos[0]
  const objectURL = URL.createObjectURL(muetra)
  previsualizacionImg.src = objectURL
}

let arrayCards = []

const crearPublicacion=()=>{
  const data = localStorage.getItem('usuario')
  const dataObj = JSON.parse(data)

  const texto = document.getElementById('input-text')
  const area = document.getElementById('publicaiones-nuevas')

  const date = new Date()
  const fechaNumero=date.toLocaleString('sp',  {day: 'numeric'} )
  const fechaMes=date.toLocaleString('sp', {month: 'long'})
  const fechaA??o=date.toLocaleString('sp', {year:'numeric'})
  const fecha = `${fechaMes} ${fechaNumero}, ${fechaA??o}`

  const fechahora = new Date()
  let hora = fechahora.getHours() 
  let minuto = fechahora.getMinutes()
  let meridiano = "AM";
  if(hora == 0){
      hora = 12
  }
  if(hora > 12) {
      hora = hora - 12
      meridiano = "PM"
  }
  hora = (hora < 10) ? "0" + hora : hora
  minuto = (minuto < 10) ? "0" + minuto : minuto   
  const tiempo =hora + ":" + minuto + " " + meridiano   

  if(!texto.value){
    return
  }
  const contenedor = document.createElement('div')
  area.prepend(contenedor)
  const cards = `
    <div class="publicacion-nueva my-2">
      <div class="input-publicacion d-flex align-items-center flex-column justify-content-between card-feed col">
        <div class="d-flex flex-row bd-highlight format-text justify-content-start">
          <div class="">
            <img class="format-perfil rounded-circle" src="/img/Imagen-de-perfil.jpg" alt="">
          </div>
          <div class="d-flex align-items-center format-nombre">
            <h3>${dataObj.nombre}</h3>
          </div>
        </div>
        <div class="format-text">
        ${texto.value}
        </div>
        <div class="d-flex flex-row bd-highlight justify-content-between format-text">
          <div id="current_date">${fecha} -- ${tiempo}</div>
          <div class="">
            <button><img class="format-img" src="./img/icono-like.jpg" alt="boton-like"></button>
            <button><img class="format-img" src="./img/icono-guardar.png" alt="boton-guardar"></button>
          </div>
        </div>
      </div>
    </div>
  `
  contenedor.innerHTML=cards

  texto.value=''

  arrayCards.unshift(cards)

  localStorage.setItem('cards', arrayCards)
}

const crearPublicacionConFoto=()=>{
  const data = localStorage.getItem('usuario')
  const dataObj = JSON.parse(data)

  const texto = document.getElementById('input-text-img')
  const area = document.getElementById('publicaiones-nuevas')
  const previsualizacionImg=document.getElementById('img-previsualizacion')


  const imgPublicacion = document.getElementById('img-publicacion')
  const publicaion = imgPublicacion.files
  const primerarchivo = publicaion[0]
  const url = URL.createObjectURL(primerarchivo)


  const date = new Date()
  const fechaNumero=date.toLocaleString('sp',  {day: 'numeric'} )
  const fechaMes=date.toLocaleString('sp', {month: 'short'})
  const fechaA??o=date.toLocaleString('sp', {year:'numeric'})
  const fecha = `${fechaNumero}/${fechaMes}/${fechaA??o}`

  const fechahora = new Date()
  let hora = fechahora.getHours() 
  let minuto = fechahora.getMinutes()
  let meridiano = "AM";
  if(hora == 0){
      hora = 12
  }
  if(hora > 12) {
      hora = hora - 12
      meridiano = "PM"
  }
  hora = (hora < 10) ? "0" + hora : hora
  minuto = (minuto < 10) ? "0" + minuto : minuto   
  const tiempo =hora + ":" + minuto + " " + meridiano   

  const contenedor = document.createElement('div')
  area.prepend(contenedor)
  const cards = `
    <div class="input-publicacion d-flex align-items-center flex-column justify-content-between card-feed col">
      <div class="d-flex flex-row bd-highlight format-text justify-content-start">
        <div class="">
          <img class="format-perfil rounded-circle" src="/img/Imagen-de-perfil.jpg" alt="">
        </div>
        <div class="d-flex align-items-center format-nombre">
          <h3>${dataObj.nombre}</h3>
        </div>
      </div>
      <div class="d-flex justify-content-center flex-column">
        <div class="d-flex justify-content-center align-items-center">
          <img class="format-pub w-100 mt-1" src="${url}" alt="foto" id="foto">
        </div>
      </div>
      <div class="format-text ">
          ${texto.value}
      </div>
      <div class="d-flex flex-row bd-highlight justify-content-between format-text">
        <div id="current_date">${fecha} -- ${tiempo}</div>
        <div class="">
          <button><img class="format-img" src="./img/icono-like.jpg" alt="boton-like"></button>
          <button><img class="format-img" src="./img/icono-guardar.png" alt="boton-guardar"></button>
        </div>
      </div>
    </div>

  `
  contenedor.innerHTML=cards

  previsualizacionImg.classList.add('d-none')
  texto.value=''
  imgPublicacion.value=''

  arrayCards.unshift(cards)

  localStorage.setItem('cards', arrayCards)
}

const cargarCards=()=>{
  const area = document.getElementById('publicaiones-viejas')
  const contenedor = document.createElement('div')
  const regex = /,/gi
  area.prepend(contenedor)
  const card = localStorage.getItem('cards')
  contenedor.innerHTML=card.replace(regex,' ')

  arrayCards.unshift(card)
}
cargarCards()

// CHAT

const chatApi = async () => {
  const urlChatApi = await fetch('https://randomuser.me/api/?results=9');
  const jsonChatsApi = await urlChatApi.json();
  return jsonChatsApi.results
}

 const dataChat = async () => {
   const dataChatApi = await chatApi()
   console.log(dataChatApi)
   const chatContainer = document.getElementById('chat-info')
   
   console.log(dataChatApi)

const divChat = dataChatApi.map(user => `
  <div class="d-flex justify-content-center">
    <img src="${user.picture.large}" class="image-perfil-chat rounded-circle" id="foto-de-perfil" alt="foto de perfil">
    <h5 class="name-style-chat d-flex align-items-center fw-bold"">${user.name.first} ${user.name.last}
    </h5>
  </div>
   `)
  chatContainer.innerHTML = divChat.join('')
 }

 dataChat()
