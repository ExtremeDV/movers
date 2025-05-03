<script setup lang="ts">
  const nuxtApp = useNuxtApp();
  const { activeHeadings, updateHeadings } = useScrollspy();

  const items = computed(() => [
    {
      label: "Home",
      to: "/",
      active:
        activeHeadings.value.includes("home") &&
        !activeHeadings.value.includes("calc"),
    },
    {
      label: "Services",
      to: "#services",
      active:
        activeHeadings.value.includes("services") &&
        !activeHeadings.value.includes("calc"),
    },
    {
      label: "Calculate",
      to: "#calc",
      active: activeHeadings.value.includes("calc"),
    },
    {
      label: "Why we",
      to: "#whywe",
      active:
        activeHeadings.value.includes("whywe") &&
        !activeHeadings.value.includes("calc"),
    },
  ]);

  nuxtApp.hooks.hookOnce("page:finish", () => {
    updateHeadings(
      [
        document.querySelector("#home"),
        document.querySelector("#services"),
        document.querySelector("#calc"),
        document.querySelector("#whywe"),
      ].filter(Boolean) as Element[]
    );
  });
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <LogoPro class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <template #right>
      <UNavigationMenu :items="items" variant="link" class="hidden lg:block" />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
