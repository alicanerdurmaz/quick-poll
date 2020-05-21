<script>
  export let pollSettings
  export let saveAsDraft
</script>

<div class="container">

  <div class="option-group">
    <label>
      <input type="checkbox" bind:checked="{pollSettings.captcha}" />
      <span>Enable Captcha</span>
    </label>
    <label>
      <input type="checkbox" bind:checked="{pollSettings.multiplePollAnswers}" />
      <span>Allow multiple votes</span>
    </label>
    <label>
      <input type="checkbox" bind:checked="{pollSettings.loginToVote}" />
      <span>Login to vote</span>
    </label>
  </div>
  <button class="create">Create Poll</button>
  <button class="draft" on:click="{saveAsDraft}">Save as Draft</button>
</div>

<style>
  .container {
    margin-top: 2rem;
    background-color: var(--background-secondary);
    border: 2px solid black;
    padding: 1rem 1rem;
  }
  .option-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem 0rem;
  }
  span {
    display: block;
    margin-left: 8px;
  }
  input[type='checkbox'] {
    padding: 0;
    margin: 0;
  }
  input {
    user-select: none;
    position: relative;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    height: 1rem;
    width: 1rem;
    border: 2px solid #f6acc8b8;
    border-radius: 2px;
    background-color: var(--background);
  }
  input::after {
    position: absolute;
    top: -6px;
    left: 4px;
    height: 16px;
    width: 8px;
    display: inline-block;
    transform: rotate(45deg);
    border-bottom: 3px solid var(--primary);
    border-right: 3px solid var(--primary);
  }
  input[type='checkbox']:checked::after {
    content: '';
  }
  button {
    width: 100%;
    margin-top: 1rem;
    cursor: pointer;
    user-select: none;
    color: #ffffff;
    border-radius: 2px;
    border: none;
    font-weight: 600;
    padding: 0.5rem 0rem;
    font-size: 1rem;
  }
  .create {
    background: #aa4b6b; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #3b8d99, #6b6b83, #aa4b6b); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #3b8d99,
      #6b6b83,
      #aa4b6b
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .draft {
    background: #141e30; /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #243b55, #141e30); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to left,
      #243b55,
      #141e30
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  button:focus {
    outline: auto;
    outline-color: #68e3ff;
  }
</style>
