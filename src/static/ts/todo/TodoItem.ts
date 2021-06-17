import { Todo } from '@constant/todo.constant';
import TodoEditor from './TodoEditor';

export default class TodoItem {
  editor: TodoEditor;
  elem: HTMLElement;
  pinElem: HTMLElement;
  innerElem: HTMLElement;
  data: Todo;
  x: number;
  y: number;
  isFocused: boolean;
  grapX: number | null;
  grapY: number | null;

  constructor(editor: TodoEditor, id: number, x: number, y: number) {
    const angle: number = Math.trunc(Math.random() * 12) - 6;

    this.editor = editor;
    this.x = x;
    this.y = y;
    this.grapX = null;
    this.grapY = null;
    this.isFocused = false;
    this.elem = document.createElement('div');
    this.elem.classList.add('todo-item');
    this.elem.style.transform = `rotate(${angle}deg)`;
    this.elem.innerHTML = `<div class="todo-item__pin"></div><div class="todo-item__inner"></div>`;
    this.pinElem = this.elem.querySelector('.todo-item__pin') as HTMLElement;
    this.innerElem = this.elem.querySelector('.todo-item__inner') as HTMLElement;
    this.data = { id, content: '', created_at: new Date() };

    this.setFocus(true);
    this.setPosition(x, y);
    document.body.append(this.elem);
    this.eventInit();
    this.innerElem.focus();
  }

  eventInit(): void {
    this.innerElem.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.keyCode === 13) {
        this.setFocus(false);
      }
    });

    this.pinElem.addEventListener('click', (e: MouseEvent) => {
      if (e.ctrlKey) {
        this.editor.deleteTodo(this.data.id);
      }
    });

    this.pinElem.addEventListener('dblclick', (e: MouseEvent) => {
      if (this.grapX || this.grapY) return;
      this.setFocus(true);
      this.grapX = e.clientX - this.x;
      this.grapY = e.clientY - this.y;
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.grapX || !this.grapY || !this.isFocused) return;
      const x = e.clientX - this.grapX;
      const y = e.clientY - this.grapY;
      this.setPosition(x, y);
    });

    window.addEventListener('click', () => {
      if (!this.grapX || !this.grapY) return;
      console.log('2');
      this.grapX = null;
      this.grapY = null;
    });
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.elem.style.left = x + 'px';
    this.elem.style.top = y + 'px';
  }

  setFocus(value: boolean): void {
    if(value === true) {
      this.isFocused = true;
      this.elem.classList.add('todo-item--zoom-in');
      this.innerElem.contentEditable = 'true';
    } else {
      this.isFocused = false;
      this.elem.classList.remove('todo-item--zoom-in');
      this.innerElem.contentEditable = 'false';
    }
  }
}
