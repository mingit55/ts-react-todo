import '../scss/fonts.scss';
import '../scss/common.scss';
import '../scss/todo.scss';
import TodoEditor from './todo/TodoEditor';

window.onload = () => {
  const app : TodoEditor = new TodoEditor();
  app.init();
};
