<script lang="ts">
  export let form;

  let message: string | undefined;

  $: message = form?.message;
</script>

{#if message}
  <p>{message}</p>
{/if}

<form method="post">
  <fieldset>
    <input name="username" type="username" placeholder="Username" />
    <input name="password" type="password" placeholder="Password" />
    <input type="submit" value="Login" />
  </fieldset>
</form>
