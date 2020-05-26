<script>
  import { onMount } from 'svelte'
  import { flip } from 'svelte/animate'
  export let optionList
  export let totalVoteCount

  let renderList
  $: optionList, prepareToRender()

  function prepareToRender() {
    renderList = [...optionList]
    renderList.sort(function (a, b) {
      return b.voteCount - a.voteCount
    })
    renderList.forEach((e) => {
      e.percentage = Math.round((e.voteCount * 100) / totalVoteCount)
    })
  }
</script>

<ul class="option-container">
  {#each renderList as option, i (option.index)}
    <li animate:flip="{{ duration: 900 }}">
      <div class="line1">
        <h1>{option.text}</h1>
        <span class="percentage">{option.percentage}%</span>
      </div>
      <div class="progress-background">
        <span class="{`progress color${i}`}" style="{`width:${option.percentage}%`}"></span>
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
    background-color: #fbf4f9;
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

  .color0 {
    background-color: var(--progress-color0);
  }
  .color1 {
    background-color: var(--progress-color1);
  }
  .color2 {
    background-color: var(--progress-color2);
  }
  .color3 {
    background-color: var(--progress-color3);
  }
  .color4 {
    background-color: var(--progress-color4);
  }
</style>
