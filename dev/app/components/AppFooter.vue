<script setup lang="ts">
const columns = [{
  label: 'Resources',
  children: [{
    label: 'Help center'
  }, {
    label: 'Docs'
  }, {
    label: 'Roadmap'
  }, {
    label: 'Changelog'
  }]
}, {
  label: 'Features',
  children: [{
    label: 'Affiliates'
  }, {
    label: 'Portal'
  }, {
    label: 'Jobs'
  }, {
    label: 'Sponsors'
  }]
}, {
  label: 'Company',
  children: [{
    label: 'About'
  }, {
    label: 'Pricing'
  }, {
    label: 'Careers'
  }, {
    label: 'Blog'
  }]
}]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  toast.add({
    title: 'Subscribed!',
    description: 'You\'ve been subscribed to our newsletter.'
  })
}
</script>

<template>
  <USeparator
    class="h-px"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <p class="text-center font-bold text-xl m-2">RHINO - <span class="text-primary">MOVERS.COM</span></p>
        <p class="text-sm text-muted text-center whitespace-pre-line">
          <span class="font-bold text-white">Flat Rates. No Surprises.</span> <br>
          Every service is billed at a flat rate, so you know the full cost up front. No hidden fees, no last‑minute changes. <br>
          <span class="font-bold text-white">7614 Oak Park Ave Van Nuys, CA 91406, United States of America</span> <br>
        </p>
        <p class="text-center font-bold text-xl m-2">Call RHINO <a class="text-primary" href="tel:+17472459992">+1 747 245-99-92</a></p>
      </UContainer>
    </template>

    <template #left>
      <p class="text-sm text-muted text-center">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>
    <template #right>
      <p class="text-sm text-muted text-center">
        Dev by NeedApp 2025
      </p>
      <UColorModeButton />
      </template>
  </UFooter>
</template>
