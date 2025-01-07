<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'

const props = defineProps<{
  onClose?: VoidFunction
}>()
const firstStepData = ref<null | FormData>(null)
const secondStepData = ref<null | FormData>(null)
const step = ref(1)
const wrapper = useTemplateRef('wrapper')
const firstStepForm = useTemplateRef('first-step-form')
const secondStepForm = useTemplateRef('second-step-form')
const thirdStepForm = useTemplateRef('third-step-form')
const result = computed(() => ({
  ...(firstStepData.value ? Object.fromEntries(firstStepData.value.entries()) : {}),
  ...(secondStepData.value ? Object.fromEntries(secondStepData.value.entries()) : {}),
}))

const handleSubmitFirstStep = (e: Event) => {
  e.preventDefault()
  firstStepData.value = new FormData(e.target as HTMLFormElement)
  step.value += 1
}
const handleSubmitSecondStep = (e: Event) => {
  e.preventDefault()
  secondStepData.value = new FormData(e.target as HTMLFormElement)
  step.value += 1
}
const handleAdaptHeight = (value?: number) => {
  const element = {
    1: firstStepForm,
    2: secondStepForm,
    3: thirdStepForm,
  }[value ?? step.value]
  if (wrapper.value && element?.value) {
    const rect = element.value.getBoundingClientRect()
    wrapper.value.style.width = `${rect.width}px`
    wrapper.value.style.height = `${rect.height}px`
  }
}

watch(step, () => {
  setTimeout(handleAdaptHeight)
});

onMounted(() => {
  handleAdaptHeight();
})
</script>

<template>
  <!-- This form is using different forms for each step -->
  <div class="register-form-wrapper" ref="wrapper">
    <Transition name="transition-form" :duration="200">
      <form
        ref="first-step-form"
        v-if="step === 1"
        name="register-first-step"
        class="transition-form"
        @submit="handleSubmitFirstStep"
      >
        <label>
          <div>email</div>
          <input name="email" type="email" />
        </label>
        <label>
          <div>password</div>
          <input name="password" type="password" />
        </label>
        <label>
          <div>password confirmation</div>
          <input name="password-confirmation" type="password" />
        </label>
        <divider />
        <div class="buttons">
          <button type="reset">Reset</button>
          <button type="submit">Next</button>
        </div>
      </form>
      <form
        ref="second-step-form"
        v-else-if="step === 2"
        name="register-second-step"
        class="transition-form"
        @submit="handleSubmitSecondStep"
      >
        <label>
          <div>sms code</div>
          <input name="sms-code" type="text" />
        </label>
        <div class="buttons">
          <button type="button" @click="() => (step -= 1)">Back</button>
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div ref="third-step-form" v-else-if="step === 3" class="transition-form">
        <span class="json">
          {{ JSON.stringify(result, undefined, 2) }}
        </span>
        <div class="buttons">
          <button type="button" @click="() => (step -= 1)">Back</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
form {
  display: grid;
}
label {
  margin-bottom: 8px;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.buttons > button {
  padding: 0 8px;
}
.json {
  white-space: pre;
  margin-bottom: 8px;
}

.register-form-wrapper {
  position: relative;
  transition: height 200ms ease, width 200ms ease;
  overflow: hidden;
}

.transition-form {
  position: absolute;
  left: 0;
  top: 0;
  transition: transform 200ms ease;
}

.transition-form-enter-active,
.transition-form-leave-active {
  transform: translateX(0);
}
.transition-form-enter-from {
  transform: translateX(calc(100% + 8px));
}
.transition-form-leave-to {
  transform: translateX(calc(-100% - 8px));
}
</style>
