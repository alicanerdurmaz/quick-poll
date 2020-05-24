<script>
  import { goto } from '@sapper/app'
</script>

<header>
  <nav>
    <ul>
      <li on:click="{() => goto('/login')}">Log In</li>
    </ul>
  </nav>
  <div on:click="{() => goto('/')}">
    <h1>
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
    text-align: center;
  }
  h1 {
    font-family: 'Lato', sans-serif;
    font-size: 2.25rem;
    text-align: center;
  }
  p {
    font-size: 1.825rem;
    margin-top: 8px;
  }

  ul {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
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
