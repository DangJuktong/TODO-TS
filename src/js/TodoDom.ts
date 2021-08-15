import { ITodoData } from './typings';
import TodoTemplate from "./TodoTemplate";
import { findParentNode, createItem } from './utils';

class TodoDom extends TodoTemplate {
    private todoWrapper: HTMLElement;

    constructor(todoWrapper: HTMLElement) {
        super();
        this.todoWrapper = todoWrapper;
    }

    protected initList (todoData: ITodoData[]) {
        if(todoData.length) {
            const oFrag: DocumentFragment = document.createDocumentFragment();
            todoData.map((todo: ITodoData) => {
                const oItem: HTMLElement = createItem('div', 'todo-item', this.todoView(todo));
                oFrag.appendChild(oItem);
            });
            this.todoWrapper.appendChild(oFrag);
        }
    }

    // 只暴露给子类TodoEvent
    protected addItem (todo: ITodoData) {
        const oItem: HTMLElement = createItem('div', 'todo-item', this.todoView(todo));
        this.todoWrapper.appendChild(oItem);
    }

    protected removeItem (target: HTMLElement) {
        // 为避免后续结构变化，将查找父元素的逻辑抽出来
        const oParentNode : HTMLElement = findParentNode(target, 'todo-item');
        oParentNode.remove();
    }

    protected changeCompleted (target: HTMLElement, completed: boolean) {
        const oParentNode : HTMLElement = findParentNode(target, 'todo-item');
        const oContent : HTMLElement = oParentNode.getElementsByTagName('span')[0];

        oContent.style.textDecoration = completed ? 'line-through' : 'none'
    }
}

export default TodoDom;