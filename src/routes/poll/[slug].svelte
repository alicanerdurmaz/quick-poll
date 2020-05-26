<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params

    const res = await this.fetch(
      `https://firestore.googleapis.com/v1/projects/testproject-506b0/databases/(default)/documents/poll/${slug}`
    )
    const result = await res.json()

    if (result.error) {
      this.error(404, 'Not found')
      return
    }

    const tempPoll = result.fields

    const optionList = tempPoll.optionList.arrayValue.values.map((e) => e.stringValue)

    const pollSettings = {}
    for (const key in tempPoll.pollSettings.mapValue.fields) {
      pollSettings[key] = tempPoll.pollSettings.mapValue.fields[key].booleanValue
    }

    const question = tempPoll.question.stringValue
    const poll = { pollSettings, optionList, question, pollID: slug }

    return { poll }
  }
</script>

<script>
  import { onMount, onDestroy } from 'svelte'
  import { goto } from '@sapper/app'
  import { submitVoteToDb, checkCurrentUserVote } from '../../helpers/firebase-functions.js'
  import VoteForm from './_VoteForm.svelte'
  import Result from './_Result.svelte'
  import Loading from '../_components/Loading.svelte'

  export let poll

  let loading = true
  let selectedOptions = []
  let optionListBinded = poll.optionList.map((e, i) => {
    return {
      text: e,
      voteCount: 0,
      index: i,
    }
  })

  let globalUser = null
  let firestore = null
  let firebasefirestore = null

  $: globalUser, checkUserIsVoted()
  let isCurrentUserVoted = null

  async function checkUserIsVoted() {
    if (globalUser) isCurrentUserVoted = await checkCurrentUserVote(firestore, poll.pollID, globalUser.uid)
  }

  onMount(async () => {
    const { auth, db, fs } = await import('../../helpers/firebase.js')

    await auth.signInAnonymously()

    auth.onAuthStateChanged(function (user) {
      globalUser = user || null
    })

    firestore = db
    firebasefirestore = fs
    loading = false

    const docRef = firestore.collection('poll').doc('7pwmkV5VHe8VLtjE3DST')

    let unsubscribe = await docRef.onSnapshot((doc) => {
      const data = { ...doc.data() }
      optionListBinded.forEach((e, i) => {
        optionListBinded[i].voteCount = data[i]
      })
    })

    onDestroy(() => {
      unsubscribe()
    })
  })

  async function submitVote() {
    let loading = true
    await submitVoteToDb(firestore, firebasefirestore, selectedOptions, poll.pollID, globalUser.uid)
    isCurrentUserVoted = true
    loading = false
  }
</script>

<main>

  {#if isCurrentUserVoted === true}
    <Result optionList="{optionListBinded}" />
  {:else}
    <VoteForm bind:selectedOptions poll="{poll}" />
    <div class="button-group">
      {#if loading || isCurrentUserVoted === null}
        <div class="loading-container">
          <Loading />
        </div>
      {:else}
        {#if isCurrentUserVoted === false}
          <button class="submit" on:click="{submitVote}">Submit</button>
        {/if}
        <button class="result">Show Results</button>
      {/if}
    </div>
  {/if}

</main>

<style>
  .loading-container {
    flex: 1;
    text-align: center;
    margin-top: 8px;
  }
  main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 0.5rem;
  }
  .button-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: center;
  }
  button {
    flex: 1;
    height: 2rem;
    width: 100%;
    margin: 1rem;
    cursor: pointer;
    user-select: none;
    color: #ffffff;
    border-radius: 2px;
    border: none;
    padding: 0.5rem 0rem;
    font-size: 1rem;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    line-height: 1;
    color: black;
  }
  .submit {
    background: #a8ff78; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #78ffd6, #a8ff78); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #78ffd6,
      #a8ff78
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .result {
    color: white;
    background: #355c7d; /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #c06c84, #6c5b7b, #355c7d); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #c06c84,
      #6c5b7b,
      #355c7d
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>