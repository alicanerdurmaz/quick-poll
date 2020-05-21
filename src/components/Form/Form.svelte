<script>
  import { onMount } from 'svelte'
  import { flip } from 'svelte/animate'
  import { tick } from 'svelte'
  import { textAreaResize } from '../../helpers/textarea-auto-resize'
  import FormOption from './FormOption.svelte'
  import PollSettings from './PollSettings.svelte'

  let formRef

  let question = ''
  let optionList = [
    { text: '', id: 1 },
    { text: '', id: 2 },
  ]
  let pollSettings = {
    loginToVote: false,
    multiplePollAnswers: false,
    captcha: false,
  }
  // $: console.log({ question, optionList, pollSettings })
  onMount(() => {
    const draftData = window.location.hash.substring(1)

    if (!draftData) return
    let newDraft
    try {
      newDraft = JSON.parse(decodeURIComponent(draftData))
    } catch (error) {
      return
    }
    question = newDraft.question
    optionList = newDraft.optionList
    pollSettings = newDraft.pollSettings
  })

  function addOption() {
    const newHeight = formRef.offsetHeight + 87
    formRef.style.height = newHeight + 'px'
    optionList = [...optionList, { text: '', id: Date.now() }]
  }

  async function deleteOption(e, index) {
    const beforeHeight = formRef.offsetHeight
    formRef.style.height = beforeHeight + 'px'

    e.target.blur()
    e.preventDefault()
    e.stopPropagation()

    optionList.splice(index, 1)
    optionList = optionList

    const afterHeight = beforeHeight - 87
    formRef.style.height = afterHeight + 'px'
  }
  function saveAsDraft() {
    const poll = {
      pollSettings: pollSettings,
      optionList: optionList,
      question: question,
    }
    console.log(poll)
    history.pushState({ page: 1 }, null, `#${encodeURIComponent(JSON.stringify(poll))}`)
  }
</script>

<main>
  <form bind:this="{formRef}">
    <div class="question-container">
      <label for="question" class="label">Question</label>
      <textarea
        class="question"
        placeholder="E.g. What is your favorite programming language ?"
        autocomplete="off"
        maxlength="240"
        bind:value="{question}"
      ></textarea>
    </div>

    <ul>
      {#each optionList as option, index (option.id)}
        <div animate:flip="{{ duration: 190 }}">
          <FormOption bind:option deleteOption="{deleteOption}" index="{index}" />
        </div>
      {/each}
    </ul>
  </form>

  <button on:click="{addOption}">
    Add Option
    <div class="plus"></div>
  </button>

  <PollSettings bind:pollSettings saveAsDraft="{saveAsDraft}" />

</main>

<div class="button-group"></div>

<style>
  main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 0.5rem;
  }
  .button-group {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 0.5rem;
  }
  form {
    will-change: height;
    transition: all 190ms ease;
    width: 100%;
  }

  .question-container {
    width: 100%;
    margin-bottom: 2.5rem;
    border-radius: 4px;
    position: relative;
    border: solid 2px var(--text-secondary);
    z-index: 1;
    padding: 1rem;
  }
  .question-container:focus-within {
    border: solid 2px var(--primary);
  }
  label {
    display: block;
    background-color: var(--background);
    position: absolute;
    top: -0.5rem;
    left: 1rem;
    padding: 0px 0.225rem;
    z-index: 99;
    color: var(--text-secondary);
    font-size: 11px;
  }

  textarea {
    width: 100%;
    resize: none;
    outline: none;
    -webkit-appearance: none;
    background: none;
    color: white;
    border: none;
    font-size: 16px;
    height: 5rem;
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  button {
    margin-top: 1rem;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    color: #ffffff;
    border-radius: 2px;
    border: none;
    font-weight: 600;
    padding-left: 1rem;
    background: #00b4db; /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #0083b0, #00b4db); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to top,
      #0083b0,
      #00b4db
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  button:focus {
    outline: auto;
    outline-color: #68e3ff;
  }

  .plus {
    display: inline-block;
    width: 36px;
    height: 36px;
    background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff);
    background-position: center;
    background-size: 50% 2px, 2px 50%; /*thickness = 2px, length = 50% (25px)*/
    background-repeat: no-repeat;
    margin-left: 4px;
    margin-right: 4px;
  }
</style>
