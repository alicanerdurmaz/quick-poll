<script>
  export let optionList
</script>

<ul class="option-container">
  {#each optionList as option (option.index)}
    <li>
      <div class="line1">
        <h1>{option.text}</h1>
        <span class="percentage">%50</span>
      </div>
      <div class="progress-background">
        <span class="progress"></span>
      </div>
      <div class="vote-count">{option.voteCount} Votes</div>
    </li>
  {/each}
</ul>

<style>
  ul {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-top: 1rem;
    margin: 0.5rem 0rem;
    width: 100%;
    border: 2px solid black;
    border-radius: 4px;
    background: #0e141b;
    padding: 0.5rem 1rem;
  }
  h1 {
    display: block;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    transition: all 190ms ease;
    will-change: padding;
    width: 100%;
    font-weight: 400;
  }
  .percentage {
    font-family: Lato;
    font-size: 1.5rem;
    font-weight: 700;
  }
  .progress-background {
    width: 100%;
    height: 0.5rem;
    background: var(--background);
    border-radius: 0.5rem;
  }
  .progress {
    display: block;
    width: 50%;
    height: 100%;
    background-color: brown;
    transition: all 0.8s ease;
    border-radius: 0.5rem;
  }
  .vote-count {
    color: var(--text-secondary);
  }
  div {
    margin: 0.5rem 0rem;
  }
  .line1 {
    display: flex;
    width: 100%;
  }
</style>
