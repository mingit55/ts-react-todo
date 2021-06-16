export default class CursurPin {
  elem: HTMLDivElement;
  x: number;
  y: number;
  visible: boolean;

  constructor() {
    this.elem = document.querySelector('.push-pin') as HTMLDivElement;
    this.x = 0;
    this.y = 0;
    this.visible = false;
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;

    this.elem.style.left = x + 'px';
    this.elem.style.top = y + 'px';
  }

  setVisible(value: boolean): void {
    this.visible = value;
    if(value) this.elem.classList.add('push-pin--active')
    else this.elem.classList.remove('push-pin--active')
  }
}