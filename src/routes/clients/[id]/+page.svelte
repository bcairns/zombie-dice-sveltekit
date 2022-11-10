<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let messages = [];

  let chat = '';

  onMount(() => {
    console.log('subscribing to event source', `/sse/${$page.params['id']}`);
    const events = new EventSource(`/sse/${$page.params['id']}`);
    events.onmessage = (event) => {
      console.log('message received from event source', `/sse/${$page.params['id']}`)
      messages = [...messages, event.data];
    };
    return () => {
      events.close();
    }
    // setInterval(async () => {
    //   await fetch(`/sse/${$page.params['id']}`, {
    //     method: 'POST',
    //     body: `Hello world from ${$page.params['id']}!`
    //   });
    // }, 3000);
  });

  const handleSubmit = async () => {
    if (chat){
      console.log('posting to ', `/sse/${$page.params['id']}`)
      await fetch(`/sse/${$page.params['id']}`, {
        method: 'POST',
        body: chat
      });
    }
  }
</script>

<section>
  <h1>hello world</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <input bind:value={chat} />
    <button type="submit">send</button>
  </form>

  {#if messages.length}
  <ul>
    {#each messages as msg}
      <li>{msg}</li>
    {/each}
  </ul>
  {/if}
</section>
