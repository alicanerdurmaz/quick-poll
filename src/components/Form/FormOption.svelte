<script>
  import { textAreaResize } from '../../helpers/textarea-auto-resize'
</script>

<ul>
  <li class="li">
    <label for="question" class="label">Option</label>
    <textarea
      class="option"
      placeholder="E.g. Javascript"
      autocomplete="off"
      data-height="1rem"
      use:textAreaResize
      maxlength="240"
    ></textarea>
  </li>
  <li>
    <label for="question" class="label">Option</label>
    <textarea
      class="option"
      placeholder="E.g. Rust"
      autocomplete="off"
      data-height="1rem"
      use:textAreaResize
      maxlength="240"
    ></textarea>
  </li>
</ul>

<style>
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  li {
    width: 100%;
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
  }
</style>
