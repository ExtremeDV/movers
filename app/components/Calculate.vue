<script setup lang="ts">
import type { Toast } from '@nuxt/ui/runtime/composables/useToast.js';

const { data: price } = await useAsyncData('price', () => queryCollection('price').first());
const type = ref<{ label: string; description?: string; price: number } | undefined>(undefined);
const upstairs = ref(0);
const downstairs = ref(0);
const miles = ref(0);
const email = ref('');
const phone = ref('');

const toast = useToast();

function showToast(props) {
  toast.add(props);
}

const total = computed(() => {
  const baseCost = type.value?.price || 0;
  const distanceCost = miles.value * (price.value?.mile ?? 0);
  const stepUpCost = upstairs.value * (price.value?.stepUp ?? 0);
  const stepDownCost = downstairs.value * (price.value?.stepDown ?? 0);

  return baseCost > 0 ? baseCost + distanceCost + stepUpCost + stepDownCost : 0;
});

const resetForm = () => {
  type.value = undefined;
  upstairs.value = 0;
  downstairs.value = 0;
  miles.value = 0;
  email.value = '';
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
  return phoneRegex.test(phone);
};

const submitForm = async () => {
  if (!validateEmail(email.value)) {
    showToast({
      title: 'Invalid Email',
      description: 'Please enter a valid email address.',
      color: 'error',
      icon: 'warning',
    });
    return;
  }

  if (!validatePhone(phone.value)) {
    showToast({
      title: 'Invalid Phone Number',
      description: 'Please enter a valid phone number.',
      color: 'error',
      icon: 'warning',
    });
    return;
  }

  try {
    const { data } = await useFetch('/api/send-form', {
      method: 'POST',
      body: {
        email: email.value,
        phone: phone.value,
        message: {
          type: type.value?.label,
          distance: miles.value,
          stairsUp: upstairs.value,
          stairsDown: downstairs.value,
          baseCost: type.value?.price || 0,
          distanceCost: miles.value * (price.value?.mile ?? 0),
          stepUpCost: upstairs.value * (price.value?.stepUp ?? 0),
          stepDownCost: downstairs.value * (price.value?.stepDown ?? 0),
          total: total.value,

        },
      },
    });

    if (data.value?.success) {
      showToast({
        title: 'Form Submitted',
        description: 'FORM SUBMITTED. WE WILL CONTACT YOU SHORTLY',
        color: 'success',
        icon: 'check',
      });
      resetForm();
    } else {
      showToast({
        title: 'Submission Failed',
        description: 'There was an error submitting the form.',
        color: 'error',
        icon: 'warning',
      });
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    showToast({
      title: 'Submission Error',
      description: 'An unexpected error occurred.',
      color: 'error',
      icon: 'warning',
    });
  }
};
</script>

<template>
  <UContainer>
    <UForm :state="{ valid: true }">
      <div class="w-full flex flex-wrap justify-center">
        <div class="lg:w-1/2 w-full p-2">
          <UFormField label="Enter your email" class="mb-2">
            <UInput v-model="email" type="email" class="w-full" />
          </UFormField>
          <UFormField label="Enter your phone number" class="mb-2">
            <UInput v-model="phone" type="tel" class="w-full" />
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
              <li><span>Base cost:</span> $ {{ type?.price || "No change item" }}</li>
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
            <UButton variant="outline" color="primary" active-variant="solid" size="xl" class="mx-3 px-6 cursor-pointer" @click="submitForm">
              Submit
            </UButton>
            <UButton variant="outline" color="secondary" active-variant="solid" size="xl"
              class="mx-3 px-6 cursor-pointer" @click="resetForm">
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