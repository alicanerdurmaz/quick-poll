<script>
  let spamProtection = false
  let multiplePollAnswers = false
  let requireAuth = false
</script>

<div class="container">
  <div class="option-group">
    <label>
      <input type="checkbox" bind:checked="{spamProtection}" />
      Enable Captcha
    </label>
    <label>
      <input type="checkbox" bind:checked="{multiplePollAnswers}" />
      Allow multiple votes
    </label>
    <label>
      <input type="checkbox" bind:checked="{requireAuth}" />
      Login to vote
    </label>
  </div>
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
  }
</style>
