<script>
  import { goto } from '@sapper/app'
</script>

<header>
  <nav>
    <ul>
      <li on:click="{() => goto('/login')}">Log In</li>
      <li class="create-poll" on:click="{() => goto('/')}">Create Poll</li>
    </ul>
  </nav>
  <div>
    <h1 on:click="{() => goto('/')}">
      Quick
      <span class="pink">Poll</span>
    </h1>
    <p>Create instant, real&#8209;time polls for free</p>
  </div>
</header>

<style>
  nav {
    height: 3rem;
    margin-bottom: 0;
  }
  div {
    cursor: pointer;
    user-select: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-family: 'Lato', sans-serif;
    font-size: 2.25rem;
  }
  p {
    text-align: center;
    font-size: 1.825rem;
    margin-top: 8px;
  }

  ul {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .create-poll {
    cursor: pointer;
    user-select: none;
    padding: 4px 8px;
    margin: 4px;
    font-weight: bold;
    background: #00b4db;
    color: #ffffff;
    border-radius: 4px;
    opacity: 1;
  }
  .create-poll:hover {
    background: white;
    color: #00b4db;
  }
  li {
    cursor: pointer;
    user-select: none;
    margin: 8px;
    font-weight: bold;
    opacity: 0.75;
  }
  li:last-child {
    margin-right: 16px;
  }
  li:hover {
    color: var(--primary);
  }

  .pink {
    color: var(--secondary);
  }
  @media (max-width: 450px) {
    ul {
      justify-content: center;
      align-items: center;
    }
    li {
      margin: 16px;
    }
  }
</style>
