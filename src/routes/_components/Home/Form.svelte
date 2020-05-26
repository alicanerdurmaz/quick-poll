<script>
  import { goto } from '@sapper/app'
  import { onMount, getContext } from 'svelte'
  import { flip } from 'svelte/animate'
  import Modal from '../Modal.svelte'
  import { textAreaResize } from '../../../helpers/textarea-auto-resize'
  import FormOption from './FormOption.svelte'
  import PollSettings from './PollSettings.svelte'
  import Loading from '../Loading.svelte'

  let formRef
  let listRef
  let questionRef

  let error = false
  let errorMessage = 'Something went wrong. Please try again later'
  let loading = false
  let showModal = false

  let question = ''
  let optionList = [
    { text: '', id: 'default1' },
    { text: '', id: 'default2' },
  ]
  let pollSettings = {
    loginToVote: false,
    multiplePollAnswers: false,
    captcha: false,
  }

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

    const afterHeight = beforeHeight - e.target.parentNode.parentNode.offsetHeight
    formRef.style.height = afterHeight + 'px'

    setTimeout(() => {
      formRef.style.height = null
    }, 600)
  }

  function saveAsDraft() {
    const poll = {
      pollSettings: pollSettings,
      optionList: optionList,
      question: question,
    }

    history.pushState({ page: 1 }, null, `#${encodeURIComponent(JSON.stringify(poll))}`)
    showModal = true
  }

  function createPoll() {
    if (question.length < 3) {
      errorMessage = 'Question length should be more than 3'
      error = true
      setTimeout(() => {
        error = false
      }, 3000)
      return
    }

    let emptyOption = false
    optionList.forEach((option) => {
      if (option.id === 'default1' || option.id === 'default2') {
        if (option.text.length < 1) {
          emptyOption = true
        }
      }
    })

    if (emptyOption) {
      errorMessage = 'There must be at least 2 options'
      error = true
      setTimeout(() => {
        error = false
      }, 3000)
      return
    }

    loading = true
    saveToDb()
  }

  async function saveToDb() {
    const { fs, db } = await import('../../../helpers/firebase.js')

    const filteredOptionList = optionList
      .filter((e) => e.text.length >= 1)
      .map((e) => {
        return e.text
      })

    try {
      const docPollRef = await db
        .collection('poll')
        .add({ pollSettings, optionList: filteredOptionList, question, createdAt: fs.FieldValue.serverTimestamp() })

      filteredOptionList.forEach(async (e, i) => {
        await db
          .collection('poll')
          .doc(docPollRef.id)
          .update({
            [i]: 0,
          })
      })
      const docPollVotedUserListRef = await db.collection('poll').doc(docPollRef.id).collection('VotedUserList')

      loading = false

      goto(`/poll/${docPollRef.id}`)
    } catch (err) {
      errorMessage = err.message
      error = true
      loading = false
      console.log(err)
      setTimeout(() => {
        error = false
      }, 3000)
    }
  }
</script>

{#if showModal}
  <Modal on:close="{() => (showModal = false)}">
    <p>The URL of this page has been updated with the poll information.</p>
    <p>At any time, you can continue to edit same poll with using this url</p>
  </Modal>
{/if}
<main>
  <form bind:this="{formRef}">
    <div class="question-container" bind:this="{questionRef}">
      <label for="question" class="label">Question</label>
      <textarea
        use:textAreaResize
        class="question"
        placeholder="E.g. What is your favorite programming language ?"
        autocomplete="off"
        maxlength="240"
        bind:value="{question}"
      ></textarea>
    </div>

    <ul bind:this="{listRef}">
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

  <div class="pollsettings-container">
    {#if error}
      <div class="error">
        <p class="error-message">{errorMessage}</p>
      </div>
    {/if}
    {#if loading}
      <Loading />
    {:else}
      <PollSettings bind:pollSettings saveAsDraft="{saveAsDraft}" createPoll="{createPoll}" />
    {/if}
  </div>

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
  .pollsettings-container {
    text-align: center;
    margin-top: 2rem;
    background-color: var(--background-secondary);
    border: 2px solid black;
    padding: 1rem 1rem;
  }
  .error {
    background: var(--error);
    border-radius: 4px;
  }
  .error-message {
    margin: 0rem 0;
    padding: 0.5rem 0;
  }
</style>
