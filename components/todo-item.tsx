import { deleteTodo, toggleTodo, updateTodo } from "@/app/todos/actions";

type Todo = { id: string; title: string; completed: boolean };

export function TodoItem({ item }: { item: Todo }) {
  return (
    <li>
      <div className="todo-item">
        <form action={toggleTodo}>
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="completed" value={String(item.completed)} />
          <button className={`check-button ${item.completed ? "checked" : ""}`} aria-label={item.completed ? "ทำเครื่องหมายว่ายังไม่เสร็จ" : "ทำเครื่องหมายว่าเสร็จ"}>{item.completed ? "✓" : ""}</button>
        </form>
        <span className={`todo-title ${item.completed ? "done" : ""}`}>{item.title}</span>
        <div className="item-actions">
          <details className="edit-details">
            <summary className="icon-button">แก้ไข</summary>
            <form className="edit-popover" action={updateTodo}>
              <input type="hidden" name="id" value={item.id} />
              <input className="input" name="title" defaultValue={item.title} minLength={1} maxLength={255} required aria-label="แก้ไขชื่องาน" />
              <button className="button button-primary">บันทึก</button>
            </form>
          </details>
          <form action={deleteTodo}>
            <input type="hidden" name="id" value={item.id} />
            <button className="icon-button delete">ลบ</button>
          </form>
        </div>
      </div>
    </li>
  );
}
