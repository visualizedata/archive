<template>
  <footer>
    <MaxWidth>
      <div class="wrapper">
        <div class="footer-row">
          <div class="footer-col">
            <TNSLogo style="width: 5em; height: 5em" />
          </div>
          <div class="footer-col">
            <ul>
              <li>Information</li>
              <li>
                <a
                  href="http://www.newschool.edu/parsons/ms-data-visualization/"
                >
                  MS Data Visualization
                </a>
              </li>
              <li>
                <a
                  href="http://www.newschool.edu/parsons/art-media-technology-school-amt/"
                >
                  School of Art, Media and Technology
                </a>
              </li>
              <li>
                <a href="https://www.newschool.edu/parsons/">
                  Parsons School of Design
                </a>
              </li>
              <li>
                <a href="https://www.newschool.edu/"> The New School </a>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <ul>
              <li>Social Media</li>
              <li>
                <a href="https://github.com/visualizedata"> GitHub </a>
              </li>
              <li>
                <a href="https://twitter.com/ParsonsDataViz"> Twitter </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-row">
          <div class="footer-col">
            &copy; {{ new Date().getFullYear() }} The New School
          </div>
        </div>
      </div>
    </MaxWidth>
  </footer>
</template>

<script setup>
import TNSLogo from '@/assets/logos/tns-logo.svg'
import MaxWidth from '../common/MaxWidth.vue'
</script>

<style scoped>
footer {
  @apply bg-gray-50 text-gray-900 p-6 border-t;

  a {
    @apply text-gray-500 hover:text-gray-900 focus:text-white;
  }

  .wrapper {
    @apply w-container m-auto max-w-full border-gray-700 py-16;

    @apply space-y-16;

    .footer-row {
      @apply space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4;

      .footer-col {
        @apply pr-4;
        ul {
          li {
            @apply first:text-gray-900 first:font-medium text-gray-500;
          }
        }
      }
    }
  }
}
</style>
