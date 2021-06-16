import { Todo } from '@constant/todo.constant';

export default class TodoEditor {
  pinElem: HTMLDivElement;
  todoList: Array<Todo>;

  constructor() {
    // as 키워드 :: 컴파일러에게 해당 타입으로 컴파일하도록 명시
    this.pinElem = document.querySelector('.push-pin') as HTMLDivElement;
    this.todoList = [];
  }

  init() : void {
    this.eventInit()
  }
  
  eventInit() : void {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.pinElem !== null) { 
        const x: number = e.clientX - 10;
        const y: number = e.clientY;
  
        this.pinElem.style.left = x + 'px';
        this.pinElem.style.top = y + 'px';
      }
    });
  }
}