import { ITodoData } from "./js/typings";
import TodoEvent  from './js/TodoEvent'

((doc) => {

    const oInput : HTMLInputElement = document.querySelector('input');
    const oAddBtn: HTMLElement = document.querySelector('button');
    const oTodoList: HTMLElement = document.querySelector('.todo-list');

    const todoData: ITodoData[] = []

    const todoEvent = new TodoEvent(todoData, oTodoList);

    const init = () : void => {
        bindEvent();
    }

    function bindEvent () : void {
        oAddBtn.addEventListener('click', handleAddBtnClick, false);
        oTodoList.addEventListener('click', handleListClick, false);
    }

    function handleAddBtnClick () : void {
        const val: string = oInput.value.trim();

        if(val.length) {
            const ret = todoEvent.addTodo(<ITodoData> {
                id: new Date().getTime(),
                content: val,
                completed: false
            });

            if(ret && ret === 1001 ) {
                alert("列表项已存在");
            }

            oInput.value = '';
        }
    }

    function handleListClick (e: MouseEvent) : void {
        console.log(e.target);
        const tar = e.target as HTMLLIElement;
        const tagName = tar.tagName.toLowerCase();

        if (tagName === 'input' || tagName === 'button') {
            const id = parseInt(tar.dataset.id);
            switch (tagName) {
                case 'input':
                    todoEvent.toggleTodo(tar, id);
                    break;
                case 'button':
                    todoEvent.removeTodo(tar, id);
                    break;
                default: 
                    break;
            }
        }
    }

    init();
})(document)