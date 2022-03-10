<script lang="ts">
  import AppBar from '@/components/AppBar/index.svelte'
  import V1Shift from '@/components/Shift/v1.svelte'
  import V2Shift from '@/components/Shift/v2.svelte'
</script>

<div class="wrap">
  <AppBar />
  <V2Shift />
  <V1Shift />
</div>

<style lang="scss">

  .wrap {
    max-width: 1280px;
    margin: 0px auto;
  }

  @media screen and (max-width: 768px) {
    .wrap {
      margin: 0px 0px;
    }
  }
</style>
