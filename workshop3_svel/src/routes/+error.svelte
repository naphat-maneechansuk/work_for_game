<script lang="ts">
  import { page } from '$app/state';
  console.log(page.error);

</script>
<h1> Error! :{page.status}</h1>
<p>{page.error?.message}</p>