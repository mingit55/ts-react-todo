import { Todo } from '@constant/todo.constant';

export default class TodoItem {
  elem: HTMLElement;
  innerElem: HTMLElement;
  data: Todo;
  x: number;
  y: number;
  isFinished: boolean;

  constructor(id: number, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.isFinished = false;
    this.elem = document.createElement('div');
    this.elem.classList.add('todo-item');
    this.elem.classList.add('todo-item--zoom-in');
    this.elem.innerHTML = `<div class="todo-item__inner" contenteditable="true"></div>`;
    this.innerElem = this.elem.firstElementChild as HTMLElement;
    this.data = { id, content: '', created_at: new Date() };

    this.eventInit();
    this.setPosition(x, y);
    document.body.append(this.elem);
    this.innerElem.focus();
  }

  eventInit(): void {
    this.innerElem.addEventListener('keydown', (e: KeyboardEvent) => {
      if(e.ctrlKey && e.keyCode === 13) {
        this.isFinished = true;
        this.elem.classList.remove('todo-item--zoom-in');
        this.innerElem.contentEditable = 'false';
      }
    });
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.elem.style.left = x + 'px';
    this.elem.style.top = y + 'px';
  }
}
