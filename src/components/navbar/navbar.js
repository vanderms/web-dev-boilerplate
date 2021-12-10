
class Navbar {
  
  
  constructor(){

    this.navbar = document.querySelector(".navbar-component");
    this.sidebar = document.querySelector('.sidebar-component');
    if(!this.navbar || !this.sidebar){
      return;
    }
    
    const linksSelector = '.navbar-component a, .sidebar-component a'
    this.links = document.querySelectorAll(linksSelector);
    this.backdrop = this.createBackdrop();
    this.menuBtn =  this.createMenuButton();
    this.closeBtn = this.createCloseButton();

    this.menuBtn.addEventListener('click', ()=> this.open());    
    this.backdrop.addEventListener('click', ()=> this.close());    
    this.closeBtn.addEventListener('click', ()=> this.close()); 

    this.links.forEach(link =>{    
      link.addEventListener('click', () => this.close());
    });
  }


  createCloseButton()  {

    const temp =  document.createElement('template');
    temp.innerHTML = BTN_CLOSE;
    this.sidebar.insertBefore(temp.content, this.sidebar.firstChild);
    return  this.sidebar.querySelector('.btn-close');
  }


  createMenuButton(){
    const temp =  document.createElement('template');
    temp.innerHTML = BTN_MENU;
    this.navbar.appendChild(temp.content);
    return  this.navbar.querySelector('.menu-btn');
  }


  createBackdrop()  {
    const temp =  document.createElement('template');
    temp.innerHTML = /*html*/`<div class="sidebar-component-backdrop close"></div>`;    
    this.sidebar.parentNode.insertBefore(temp.content, this.sidebar);
    return  document.querySelector('.sidebar-component-backdrop');
  }
  

  open(){
    [this.navbar, this.sidebar, this.backdrop, this.menuBtn].forEach(e => e.classList.remove('close'));  
  }


  close(){
    [this.navbar, this.sidebar, this.backdrop, this.menuBtn].forEach(e => e.classList.add('close')); 
  }
}



const BTN_CLOSE = /*html*/`    
<button class='btn-close' aria-hole='close side navegation menu'>
  <div class="css-image">
    <span></span>
    <span></span>
</div>
</button>
`;


const BTN_MENU = /*html*/`    
<button class='menu-btn close' aria-hole='open side navegation menu'> 
  <div class="hamburguer">
    <span></span>
    <span></span>
    <span></span>
  </div>        
</button>
`;    

new Navbar();