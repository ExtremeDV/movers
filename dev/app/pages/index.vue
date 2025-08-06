<script setup lang="ts">
  const { data: page } = await useAsyncData('index', () => queryCollection('content').first())
  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  useSeoMeta({
  title: page.value.seo?.title || page.value.title,
  ogTitle: page.value.seo?.title || page.value.title,
  ogImage: 'http://rhino-movers.com/images/screen.jpg',
  description: page.value.seo?.description || page.value.description,
  ogDescription: page.value.seo?.description || page.value.description
})
</script>

<template>
  <div v-if="page" class="relative">
    <div id="home"></div>
    <div class="hidden lg:block">
      <UColorModeImage light="/images/light/line-1.svg" dark="/images/dark/line-1.svg"
        class="absolute pointer-events-none pb-10 left-0 top-0 object-cover h-[650px]" />
    </div>

    <UPageHero :headline="page.hero.headline" :description="page.description" :links="page.hero.links"
      :ui="{ container: 'md:pt-18 lg:pt-20' }">
      <template #title>
        <MDC :value="page.title" class="*:leading-11 sm:*:leading-19 max-w-3xl mx-auto" />
        <div class="*:leading-11 sm:*:leading-19 max-w-3xl mx-auto"><a class="text-4xl font-medium" href="tel:+17472459992">+1 (747) 245-99-92</a></div>
      </template>
    </UPageHero>

    <UPageSection :description="page.section.description" :features="page.section.features" orientation="horizontal"
      :ui="{
        container: 'lg:px-2 2xl:px-20 mx-0 max-w-none md:mr-10',
        features: 'gap-0'
      }" reverse>
      <template #title>
        <MDC :value="page.section.title" class="sm:*:leading-11" />
      </template>
      <img :src="page.section.images.desktop" :alt="page.section.title"
        class="hidden lg:block 2xl:hidden left-0 w-full max-w-2xl">
      <img :src="page.section.images.mobile" :alt="page.section.title"
        class="block lg:hidden 2xl:block 2xl:w-full 2xl:max-w-2xl">
      <StarsBg />
    </UPageSection>
    <USeparator :ui="{ border: 'border-primary/30' }" />
    <div class="w-full md:w-2/3 mx-auto p-2 text-center">
      <p>{{ page.section.postscriptum }} </p>
    </div>
    <USeparator :ui="{ border: 'border-primary/30' }" />

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection id="services" :description="page.features.description" :features="page.features.features" :ui="{
      title: 'text-left @container relative flex',
      description: 'text-left'
    }" class="relative overflow-hidden">
      <div class="absolute rounded-full -left-10 top-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px]" />
      <div class="absolute rounded-full -right-10 -bottom-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px]" />
      <template #title>
        <MDC :value="page.features.title" class="*:leading-9" />
        <div class="hidden @min-[1020px]:block">
          <UColorModeImage light="/images/light/line-2.svg" dark="/images/dark/line-2.svg"
            class="absolute top-0 right-0 size-full transform scale-95 translate-x-[70%]" />
        </div>
      </template>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection id="steps" :description="page.steps.description" class="relative overflow-hidden">
      <template #headline>
        <UColorModeImage light="/images/light/line-3.svg" dark="/images/dark/line-3.svg"
          class="absolute -top-10 sm:top-0 right-1/2 h-24" />
      </template>
      <template #title>
        <MDC :value="page.steps.title" />
      </template>

      <template #features>
        <UPageCard v-for="(step, index) in page.steps.items" :key="index" class="group"
          :ui="{ container: 'p-4 sm:p-4', title: 'flex items-start gap-1' }">
          <template #header>
            <img v-if="step.image" :src="step.image?.dark" :alt="step.title" class="lg:block left-0 w-full max-w-2xl" />
          </template>
          <template #title>
            <span class="text-lg font-semibold">
              {{ step.title }}
            </span>
          </template>
          <template #description>
            <span class="text-sm text-muted">
              {{ step.description }}
            </span>
          </template>
        </UPageCard>
      </template>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection id="calc" description="Know the real cost — no surprises. Place your order now!" :ui="{
      title: 'text-left @container relative flex',
      description: 'text-left'
    }" class="relative overflow-hidden">
      <div class="absolute rounded-full -left-10 top-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px]" />
      <div class="absolute rounded-full -right-10 -bottom-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px]" />
      <template #title>
        <MDC value="Estimate [the cost]{.text-primary}" class="*:leading-9" />
        <div class="hidden @min-[1020px]:block">
          <UColorModeImage light="/images/light/line-2.svg" dark="/images/dark/line-2.svg"
            class="absolute top-0 right-0 size-full transform scale-95 translate-x-[70%]" />
        </div>
      </template>
      <Calculate />
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <USeparator />
    <UPageSection id="whywe" :ui="{ title: 'text-left @container relative', description: 'text-left' }"
      class="relative overflow-hidden" :features="page.whywe.features">
      <template #title>
        <MDC :value="page.whywe.title" />
      </template>
    </UPageSection>
  </div>
</template>
