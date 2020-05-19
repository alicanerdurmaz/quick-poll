<script>
  import Header from '../components/Header.svelte'

  export let segment
</script>

<main>
  <Header segment="{segment}" />
  <slot />
</main>

<style>
  main {
    width: 100%;
    height: 100%;
  }
</style>
