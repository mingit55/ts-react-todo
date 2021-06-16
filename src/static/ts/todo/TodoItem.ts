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
  isFinished: boolean;

  constructor(editor: TodoEditor, id: number, x: number, y: number) {
    const angle: number = Math.trunc(Math.random() * 12) - 6;

    this.editor = editor;
    this.x = x;
    this.y = y;
    this.isFinished = false;
    this.elem = document.createElement('div');
    this.elem.classList.add('todo-item');
    this.elem.classList.add('todo-item--zoom-in');
    this.elem.style.transform = `rotate(${angle}deg)`;
    this.elem.innerHTML = `<div class="todo-item__pin"></div><div class="todo-item__inner" contenteditable="true"></div>`;
    this.pinElem = this.elem.querySelector('.todo-item__pin') as HTMLElement;
    this.innerElem = this.elem.querySelector('.todo-item__inner') as HTMLElement;
    this.data = { id, content: '', created_at: new Date() };
    
    this.setPosition(x, y);
    document.body.append(this.elem);
    this.eventInit();
    this.innerElem.focus();
  }

  eventInit(): void {
    this.innerElem.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.keyCode === 13) {
        this.isFinished = true;
        this.elem.classList.remove('todo-item--zoom-in');
        this.innerElem.contentEditable = 'false';
      }
    });

    this.pinElem.addEventListener('click', () => {
      this.editor.deleteTodo(this.data.id);
    });
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.elem.style.left = x + 'px';
    this.elem.style.top = y + 'px';
  }
}
