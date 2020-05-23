<!-- <script>
  import { onMount } from 'svelte'
  import Loading from '../components/Loading.svelte'

  let localAuth = null
  let localGoogleProvider = null

  onMount(async () => {
    const { googleProvider, auth } = await import('../helpers/firebase.js')
    localAuth = auth
    localGoogleProvider = googleProvider
  })
</script>{#if localAuth || localGoogleProvider}
  <button on:click="{loginWithGoogle}">Login</button>
{:else}
  <Loading />
{/if}

 -->

<h1>Login</h1>
