
class Navbar {
  
  private navbar: HTMLElement;
  private sidebar: HTMLElement;
  private links: NodeListOf<HTMLAnchorElement>;
  private backdrop: HTMLElement;
  private menuBtn: HTMLElement;
  private closeBtn: HTMLElement;

  constructor(){

    this.navbar = <HTMLElement> document.querySelector(".navbar-component");
    this.sidebar = <HTMLElement> document.querySelector('.sidebar-component');
    const linksSelector = '.navbar-component a, .sidebar-component a'
    this.links = <NodeListOf<HTMLAnchorElement>> document.querySelectorAll(linksSelector);
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


  private createCloseButton() : HTMLElement {

    const temp = <HTMLTemplateElement> document.createElement('template');
    temp.innerHTML = BTN_CLOSE;
    this.sidebar.insertBefore(temp.content, this.sidebar.firstChild);
    return <HTMLElement> this.sidebar.querySelector('.btn-close');
  }


  private createMenuButton(){
    const temp = <HTMLTemplateElement> document.createElement('template');
    temp.innerHTML = BTN_MENU;
    this.navbar.appendChild(temp.content);
    return <HTMLElement> this.navbar.querySelector('.menu-btn');
  }


  private createBackdrop() : HTMLElement {
    const temp = <HTMLTemplateElement> document.createElement('template');
    temp.innerHTML = /*html*/`<div class="sidebar-component-backdrop close"></div>`;    
    this.sidebar.parentNode!.insertBefore(temp.content, this.sidebar);
    return <HTMLElement> document.querySelector('.sidebar-component-backdrop');
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

export default new Navbar();