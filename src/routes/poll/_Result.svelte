<script>
  export let optionList

  let optionListSorted = sortList(optionList)
  $: optionList, () => sortList(optionList)

  function sortList(list) {
    const tempList = [...list]
    return tempList.sort(function (a, b) {
      return b.voteCount - a.voteCount
    })
  }
  $: console.log(optionListSorted)
</script>

<div class="container"></div>

<style>
  .container {
    padding: 1rem;
    border-radius: 4px;
    border: 2px solid black;
    background-color: var(--background-secondary);
  }
</style>
