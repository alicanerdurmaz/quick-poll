<script>
  import { textAreaResize } from '../helpers/textarea-auto-resize'
  import Form from './Form/Form.svelte'
</script>

<main>
  <Form />
</main>

<style>
  main {
    max-width: 800px;
    margin: 2rem auto;
  }

  /* background-color: var(--background-secondary);
    max-width: 1200px;
    height: 60px;
    margin: 0 auto;
    text-align: center;
    background-color: var(--background-secondary);
    border: 2px solid black;
    border-top: 0px;
    border-bottom-left-radius: 24px;
		border-bottom-right-radius: 24px; */
</style>
