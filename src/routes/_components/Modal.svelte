<script>
  import { createEventDispatcher, onDestroy } from 'svelte'
  const dispatch = createEventDispatcher()
  const close = () => dispatch('close')

  let modal

  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      close()
      return
    }
  }

  const previouslyFocused = typeof document !== 'undefined' && document.activeElement
  if (previouslyFocused) {
    onDestroy(() => {
      previouslyFocused.focus()
    })
  }
</script>

<svelte:window on:keydown="{handleKeydown}" />

<div class="modal-background" on:click="{close}"></div>

<div class="modal" role="dialog" aria-modal="true" bind:this="{modal}">
  <button on:click="{close}">X</button>
  <slot />
</div>

<style>
  .modal-background {
    z-index: 149;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
  .modal {
    display: relative;
    z-index: 150;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 4px;
    background: var(--background-secondary);
    border: 2px solid black;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    font-size: 1.225rem;
    line-height: 1.1;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
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
