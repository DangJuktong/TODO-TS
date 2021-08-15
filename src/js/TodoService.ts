import { ITodoData } from './typings';
import $ from 'jquery';

// 函数的装饰器参数相同
export function getTodoList (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    // 保存原有的init函数
    const _origin = descriptor.value;

    // 重写init函数
    descriptor.value = function (todoData: ITodoData[]) {
        $.get('http://localhost:8080/todolist').then((res: string) => {
            if(!res) {
                return;
            }

            todoData = JSON.parse(res);
        }).then(() => {
            // _origin的this已被改变，需要重新指定，否则为undefined
            _origin.call(this, todoData)
        })
    }
}

export function removeTodo (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
): void {
    const _origin = descriptor.value;

    descriptor.value = function (target: HTMLElement, id: number) {
        $.post('http://localhost:8080/remove', { id }).then(res => {
            _origin.call(this, target, id);
        })
    }
}

export function toggleTodo (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
): void {
    const _origin = descriptor.value;

    descriptor.value = function (target: HTMLElement, id: number) {
        $.post('http://localhost:8080/toggle', { id }).then(res => {
            _origin.call(this, target, id);
        })
    }
}

export function addTodo (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
): void {
    const _origin = descriptor.value;

    descriptor.value = function (todo: ITodoData) {
        $.post('http://localhost:8080/add', { todo: JSON.stringify(todo) }).then(res => {
            if( res.statusCode === 100) {
                alert('该项已存在');
                return;
            }
            _origin.call(this, todo);
        })
    }
}
