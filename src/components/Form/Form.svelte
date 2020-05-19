<script>
  import { textAreaResize } from '../../helpers/textarea-auto-resize'
  import FormOption from './FormOption.svelte'
</script>

<form>

  <div class="question-container">
    <label for="question" class="label">Question</label>
    <textarea
      class="question"
      placeholder="E.g. What is your favorite programming language ?"
      autocomplete="off"
      use:textAreaResize
      maxlength="240"
      data-height="5rem"
    ></textarea>
  </div>

  <FormOption />

</form>

<style>
  form {
    width: 100%;
    padding: 0 0.5rem;
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
