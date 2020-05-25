<script>
  import { fly, scale } from 'svelte/transition'
  import { textAreaResize } from '../../../helpers/textarea-auto-resize'

  export let index
  export let option
  export let deleteOption
</script>

<li in:fly="{{ x: -100, duration: 500 }}" out:scale|local="{{ duration: 800, delay: 0 }}">
  <label for="question" class="label">Option</label>
  <textarea
    use:textAreaResize
    class="option"
    placeholder="Enter Poll Option"
    autocomplete="off"
    maxlength="240"
    bind:value="{option.text}"
  ></textarea>
  {#if option.id > 2}
    <button on:click="{(e) => deleteOption(e, index)}">X</button>
  {/if}
</li>

<style>
  li {
    width: 100%;
    display: flex;
    padding: 1rem;
    border-radius: 4px;
    position: relative;
    border: solid 2px var(--text-secondary);
    z-index: 1;
    text-align: center;
    margin: 1rem 0rem;

    cursor: pointer;
    cursor: hand;
    cursor: grab;
    cursor: -webkit-grab;
    cursor: -moz-grab;
  }
  li:active {
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
  }
  li:focus-within {
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
    padding: 0;
    margin: 0;
    z-index: 1;
    resize: none;
    outline: none;
    border: none;
    -webkit-appearance: none;
    background: none;
    color: white;
    font-size: 16px;
    overflow: scroll;
  }
  button {
    user-select: none;
    cursor: pointer;
    height: 24px;
    width: 24px;
    border-radius: 24px;
    position: absolute;
    right: -12px;
    top: -16px;
    border: 1px solid rgba(0, 0, 0, 0.404);
    background-color: var(--secondary-accent);
    font-size: 1rem;
    text-align: center;
    font-weight: bolder;
    padding-top: 3px;
  }
</style>
