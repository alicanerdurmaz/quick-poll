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
    const poll = { pollSettings, optionList, question, pollID: slug }
    return { poll }
  }
</script>

<script>
  import VoteForm from './_VoteForm.svelte'
  import { onMount } from 'svelte'
  import { goto } from '@sapper/app'
  export let poll

  let selectedOptions = []
  let globalUser = null
  $: console.log(globalUser && globalUser.uid)

  onMount(async () => {
    const { auth, db } = await import('../../helpers/firebase.js')

    auth.signInAnonymously()

    auth.onAuthStateChanged(function (user) {
      globalUser = user || null
    })
  })
</script>

<main>
  <VoteForm bind:selectedOptions poll="{poll}" />
  <div class="button-group">
    <button>Submit</button>
    <button>Show Result</button>
  </div>
</main>

<style>
  main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 0.5rem;
  }
  .button-group {
    width: 100%;
  }
</style>
