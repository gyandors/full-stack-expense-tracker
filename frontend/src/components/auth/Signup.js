export default function Signup() {
  return (
    <div>
      <h1>Signup</h1>
      <form>
        <div>
          <label htmlFor="name"></label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="email"></label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
