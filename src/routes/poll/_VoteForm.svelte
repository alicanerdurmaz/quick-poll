<script>
  export let poll
  export let selectedOptions
</script>

<div class="container">
  <div class="question-container">
    <h1 class="question">{poll.question}</h1>
  </div>

  <div class="option-container">
    {#each poll.optionList as option, i}
      <label>
        {#if poll.pollSettings.multiplePollAnswers}
          <input type="checkbox" bind:group="{selectedOptions}" value="{i}" />
          <p>{option}</p>
        {:else}
          <input type="radio" bind:group="{selectedOptions}" value="{i}" />
          <p>{option}</p>
        {/if}
      </label>
    {/each}
  </div>
</div>

<style>
  .container {
    padding: 1rem;
    border-radius: 4px;
    border: 2px solid black;
    background-color: var(--background-secondary);
  }
  .question-container {
    padding-top: 0.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid var(--text-secondary);
  }
  .question {
    line-height: 1.1;
    font-size: 1.5rem;
    font-weight: 700;
    padding: 0 0.5rem;
    padding-right: 0;
    font-family: Lato;
  }
  .option-container {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  label {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 1rem 0rem;
    width: 100%;
  }
  p {
    display: block;
    padding: 0;
    margin: 0;
    margin-left: 8px;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 190ms ease;
    will-change: padding;
    width: 100%;
  }

  input {
    position: relative;
    min-height: 2rem;
    min-width: 2rem;
    max-height: 2rem;
    max-width: 2rem;

    user-select: none;
    cursor: pointer;

    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;

    border: 2px solid #f6acc8b8;
    border-radius: 2rem;
    background-color: var(--background);
  }

  input::after {
    position: absolute;
    top: 4px;
    left: 9px;
    width: 10px;
    height: 16px;
    display: inline-block;
    transform: rotate(45deg);
    border-bottom: 3px solid var(--primary);
    border-right: 3px solid var(--primary);
  }
  input[type='checkbox']:checked::after {
    content: '';
  }
  input[type='radio']:checked::after {
    content: '';
  }
  input[type='checkbox']:checked + p {
    border: 2px solid #5fdde5d9;
    border-radius: 16px;
    padding: 1rem;
  }
  input[type='radio']:checked + p {
    border: 2px solid #5fdde5d9;
    border-radius: 16px;
    padding: 1rem;
  }
</style>
