<script setup lang="ts">
  const { data: price } = await useAsyncData('price', () => queryCollection('price').first())
  const type = ref<{ label: string; description?: string; price: number } | undefined>(undefined)
  const upstairs = ref(0)
  const downstairs = ref(0)
  const miles = ref(0)
  const email = ref('')

  const total = computed(() => {
    const baseCost = type.value?.price || 0
    const distanceCost = miles.value * (price.value?.mile ?? 0)
    const stepUpCost = upstairs.value * (price.value?.stepUp ?? 0)
    const stepDownCost = downstairs.value * (price.value?.stepDown ?? 0)

    return baseCost > 0 ? baseCost + distanceCost + stepUpCost + stepDownCost : 0
  })
</script>

<template>
  <UContainer>
    <UForm :state="{ valid: true }">
      <div class="w-full flex flex-wrap justify-center">
        <div class="lg:w-1/2 w-full p-2">
          <UFormField label="Enter your email" class="mb-2">
            <UInput v-model="email" type="email" class="w-full" />
          </UFormField>
          <UFormField label="Select the item" class="mb-2">
            <USelectMenu v-model="type" :items="price?.types || ['No data']" class="w-full" />
          </UFormField>
          <UFormField label="Select the distance" class="mb-2">
            <UInput v-model="miles" type="number" class="w-full mb-3" />
            <USlider :min="0" :max="350" v-model="miles" />
          </UFormField>
          <UFormField label="Number of stairs up" class="mb-2">
            <UInput v-model="upstairs" type="number" class="w-full mb-3" />
            <USlider :min="0" :max="25" v-model="upstairs" />
          </UFormField>
          <UFormField label="Number of stair down" class="mb-2">
            <UInput v-model="downstairs" type="number" class="w-full mb-3" />
            <USlider :min="0" :max="25" v-model="downstairs" />
          </UFormField>
        </div>
        <div class="lg:w-1/2 w-full p-2">
          <div class="mx-auto">
            <ul>
              <p class="font-bold">Calculation details:</p>
              <li><span>Base cost:</span> $ {{ type?.price || "Не выбран груз" }}</li>
              <USeparator />
              <li><span>Distance:</span> $ {{ miles * (price?.mile ?? 0) }}</li>
              <USeparator />
              <li><span>Carrying items downstairs</span> $ {{ downstairs * (price?.stepDown ?? 0) }}</li>
              <USeparator />
              <li><span>Carrying items upstairs</span> $ {{ upstairs * (price?.stepUp ?? 0) }}</li>
              <USeparator />
              <p class="font-bold">Total:</p>
              <li><span></span> $ {{ total }}</li>
              <USeparator />
            </ul>
          </div>
          <p class="p-4 text-sm">The price may change if you provided inaccurate information.</p>
          <div class="w-full p-8 flex justify-center">
            <UButton variant="outline" color="primary" active-variant="solid" size="xl" class="mx-3 px-6 cursor-pointer">
              Submit
            </UButton>
            <UButton variant="outline" color="secondary" active-variant="solid" size="xl" class="mx-3 px-6 cursor-pointer">
              Reset
            </UButton>
            
          </div>
        </div>
      </div>
    </UForm>
  </UContainer>
</template>

<style scoped>
ul {
  width: 100%;
}

li {
  width: 80%;
  margin: 5px auto;
  display: flex;
  justify-content: space-between;
}
</style>