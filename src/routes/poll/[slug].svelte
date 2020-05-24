<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(
      `https://firestore.googleapis.com/v1/projects/testproject-506b0/databases/(default)/documents/poll/ljiNqhutHoOpuHP5hO0W`
    )

    const result = await res.json()
    const poll = result.fields.pollObject.mapValue.fields

    return { poll }
  }
</script>

<script>
  export let poll
  console.log(poll)
</script>

<h1>{poll.question.stringValue}</h1>
