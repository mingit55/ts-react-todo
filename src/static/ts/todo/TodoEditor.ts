import CursorPin from './CursorPin';
import TodoItem from './TodoItem';

export default class TodoEditor {
  mode: string;
  cursorPin: CursorPin;
  todoList: Array<TodoItem>;
  autoIncrementCounter: number;

  constructor() {
    // as 키워드 :: 컴파일러에게 해당 타입으로 컴파일하도록 명시
    this.mode = 'normal';
    this.cursorPin = new CursorPin();
    this.todoList = [];
    this.autoIncrementCounter = 1;
  }

  get hasFocusedTodo(): boolean {
    return this.todoList.some((v) => v.isFocused);
  }

  init(): void {
    this.eventInit();
  }

  setMode(value: string): void {
    switch (value) {
      case 'normal':
        this.mode = 'normal';
        break;
      case 'add':
        this.mode = 'add';
        break;
    }
  }

  eventInit(): void {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      const x: number = e.clientX - 10;
      const y: number = e.clientY;

      this.cursorPin.setPosition(x, y);

      const target = e.target as Element;
      this.cursorPin.setVisible(target.nodeName === 'BODY' && this.mode === 'add');
    });

    document.body.addEventListener('dblclick', (e: MouseEvent) => {
      if (this.mode === 'add' || this.hasFocusedTodo) return;

      const target = e.target as Element;
      if (target.nodeName !== 'BODY') return;
      this.setMode('add');
    });

    document.body.addEventListener('click', (e: MouseEvent) => {
      if (this.mode === 'normal') return;

      const target = e.target as Element;
      if (target.nodeName !== 'BODY') return;

      const x: number = e.clientX - 160;
      const y: number = e.clientY + 20;
      this.insertTodo(x, y);

      this.setMode('normal');
      this.cursorPin.setVisible(false);
    });
  }

  insertTodo(x: number, y: number): void {
    const id: number = this.autoIncrementCounter++;
    const todoItem: TodoItem = new TodoItem(this, id, x, y);
    this.todoList.push(todoItem);
  }

  deleteTodo(id: number): void {
    const idx: number = this.todoList.findIndex((v: TodoItem) => v.data.id === id);
    if(idx >= 0) {
      const todo: TodoItem = this.todoList[idx];
      todo.elem.remove();
      this.todoList.splice(idx, 1);
    }
  }
}
