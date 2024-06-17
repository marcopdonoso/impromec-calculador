const getTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  await new Promise((resolve) => {
    setTimeout(resolve, 3000)
  })
  return await res.json()
}
export default async function Todos() {
  const todos = await getTodos()

  const filtered = todos.filter((t: {}, index: number) => index < 10 && t)

  return filtered.map((todo: any) => <p key={todo.id}>{todo.title}</p>)
}
