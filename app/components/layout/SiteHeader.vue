<template>
  <div class="header">
    <div class="header-row header-row-border-bottom">
      <span class="title-tns">The New School</span>
    </div>

    <div class="header-row">
      <div class="section-border-top" />
      <div>
        <span class="title-dv"> Data Visualization </span>
        <div class="title-thesis">Thesis Projects And Research</div>
      </div>
    </div>

    <div v-if="$props.description" class="header-row">
      <div class="body-description">
        {{ $props.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiteHeader',
}
</script>

<style scoped>
.header {
  @apply mb-4;
}

.header-row {
  display: flex;
  width: 100%;
}

.header-row-border-bottom {
  border-bottom: 3px solid black;
}

.section-border-top {
  margin-top: 3px;
  width: 10%;
  display: inline-block;
  border-top: 3px solid black;
}

.title-tns {
  @apply font-neue-display-random;
  font-size: 1.5em;
  line-height: 1em;
}

.title-dv {
  @apply font-neue-display-random text-tns-red leading-none pt-2 pb-2;
  font-size: 2.5em;
  text-decoration: none;
  display: flex;
  text-align: left;
}

.title-thesis {
  @apply font-neue-display-random;
  font-size: 1em;
  color: black;
  text-align: left;
  line-height: 0;
}

.body-description {
  @apply font-neue-regular flex-grow;
  font-size: 1.5em;
  font-weight: 500;
  color: black;
  text-align: left;
  padding: 25px 0px 25px 10%;
  border-bottom: 3px solid black;
}

@media (max-width: 399px) {
  .header {
    margin: 10px 0;
  }

  .title-dv {
    font-size: 1.5em;
    margin-top: 5px;
  }

  .title-thesis {
    line-height: 1em;
  }

  .section-border-top {
    width: 0;
  }

  .body-description {
    font-size: 1em;
    padding: 15px 0px;
  }
}
</style>
