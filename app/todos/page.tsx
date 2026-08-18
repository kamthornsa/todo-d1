import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { createTodo } from "./actions";
import { getDb } from "@/db";
import { todo } from "@/db/schema";
import { LogoutButton } from "@/components/logout-button";
import { TodoItem } from "@/components/todo-item";
import { requireSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function TodosPage() {
  const session = await requireSession();
  const items = await getDb().select().from(todo).where(eq(todo.userId, session.user.id)).orderBy(desc(todo.createdAt));
  const completed = items.filter((item) => item.completed).length;

  return (
    <main className="todo-page">
      <div className="shell">
        <nav className="nav"><Link className="brand" href="/todos"><span className="brand-mark">✓</span>Simple Todo</Link><LogoutButton /></nav>
        <header className="todo-head"><div><div className="eyebrow">รายการของฉัน</div><h1>สวัสดี, {session.user.name}</h1><p>เลือกสิ่งสำคัญ แล้วค่อย ๆ ทำให้เสร็จ</p></div></header>
        <section className="todo-board">
          <form className="add-form" action={createTodo}>
            <input className="input" name="title" placeholder="มีอะไรต้องทำ?" minLength={1} maxLength={255} required autoFocus />
            <button className="button button-primary">เพิ่มงาน</button>
          </form>
          {items.length === 0 ? <div className="empty"><strong>ยังไม่มีรายการ Todo</strong>เริ่มต้นด้วยการเพิ่มงานแรกของคุณ</div> : <ul className="todo-list">{items.map((item) => <TodoItem key={item.id} item={item} />)}</ul>}
          <div className="stats">{completed} จาก {items.length} งานเสร็จแล้ว</div>
        </section>
      </div>
    </main>
  );
}

