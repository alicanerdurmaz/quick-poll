<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params

    const res = await this.fetch(
      `https://firestore.googleapis.com/v1/projects/testproject-506b0/databases/(default)/documents/poll/${slug}`
    )

    const result = await res.json()
    const tempPoll = result.fields.pollObject.mapValue.fields

    const optionList = tempPoll.optionList.arrayValue.values.map((e) => {
      return {
        text: e.mapValue.fields.text.stringValue,
        voteCount: e.mapValue.fields.voteCount.integerValue,
      }
    })
    const pollSettings = {}
    for (const key in tempPoll.pollSettings.mapValue.fields) {
      pollSettings[key] = tempPoll.pollSettings.mapValue.fields[key].booleanValue
    }
    const question = tempPoll.question.stringValue
    const poll = { pollSettings, optionList, question }
    return { poll }
  }
</script>

<script>
  export let poll

  let selectedOptions = []
  $: console.log(selectedOptions)
</script>

<main>
  <div class="container">
    <div class="question-container">
      <h1 class="question">{poll.question}</h1>
    </div>

    <div class="option-container">
      {#each poll.optionList as { text }, i}
        <label>
          <input type="checkbox" bind:group="{selectedOptions}" value="{i}" />
          <p>{text}</p>
        </label>
      {/each}
    </div>

  </div>
</main>

<style>
  main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 0.5rem;
  }
  .container {
    padding: 1rem;
    border-radius: 4px;
    border: 2px solid black;
    background-color: var(--background-secondary);
  }
  .question-container {
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
    align-items: flex-start;
    margin: 1rem 0rem;
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
  }

  input {
    margin-top: 2px;
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
  input[type='checkbox']:checked + p {
    border: 2px solid #5fdde5d9;
    border-radius: 16px;
    padding: 1rem;
  }
</style>
